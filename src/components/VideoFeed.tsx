import { useEffect, useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Calendar, ExternalLink, Loader2, Youtube, Activity, Search, ChevronDown, Bookmark } from "lucide-react";
import { extractImageFromContent } from "@/lib/utils";
import { LinkedinShareButton } from './LinkedinShareButton';
import { useBookmarks } from '@/hooks/useBookmarks';

interface Video {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    publishedAt: Date;
    channelTitle: string;
}

const CHANNELS = [
    { id: 'UCg_p-Fp_b5Dq_09w6a4YwGA', name: 'Wes Roth', color: 'bg-orange-600 border-orange-400' },
    { id: 'UCMi8qg-eB1d7kS_c7F3g_Cg', name: 'Matthew Berman', color: 'bg-blue-500 border-blue-300' },
    { id: 'UC4QZ_LsYcvcq7qOsOhpAX4A', name: 'ColdFusion', color: 'bg-slate-600 border-slate-400' },
    { id: 'UCXy2m-1m4jC-2uFvA5s3bBA', name: 'The AI Grid', color: 'bg-yellow-600 border-yellow-400' },
    { id: 'UCGCz0fBqj2N_Jg7o-T-b99Q', name: 'Microsoft Mechanics', color: 'bg-blue-700 border-blue-500' },
    { id: 'UCbfYPyITQ-7l4upoX8nvctg', name: 'Two Minute Papers', color: 'bg-blue-600 border-blue-400' },
    { id: 'UCnAtMWn98fQ07kYy6_9v-w', name: 'Matt Wolfe', color: 'bg-green-600 border-green-400' },
    { id: 'UCNJ1Ymd5yFuUPtn21xtRbbw', name: 'AI Explained', color: 'bg-purple-600 border-purple-400' },
    { id: 'UCP7jMXSY2xbc3KCAE0MHQ-A', name: 'Google DeepMind', color: 'bg-cyan-600 border-cyan-400' },
    { id: 'UC3X8J1_5Y7M47_7Q573573', name: 'ByCloud', color: 'bg-emerald-600 border-emerald-400' },
    { id: 'UCOoKqA10yd_1FZ4B5F4qLg', name: 'NVIDIA', color: 'bg-green-500 border-green-300' },
    { id: 'UC7c8mE90Kk42C2X4C7k1Pgg', name: 'IBM Technology', color: 'bg-blue-800 border-blue-600' }
];

export function VideoFeed() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(12);
    const { toggleBookmark, isBookmarked } = useBookmarks();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const results = await Promise.allSettled(
                    CHANNELS.map(channel =>
                        fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`)
                            .then(res => res.json())
                            .then(data => ({ ...data, channelName: channel.name, channelColor: channel.color }))
                    )
                );

                const allVideos: Video[] = [];

                results.forEach((result) => {
                    if (result.status === 'fulfilled' && result.value?.items) {
                        result.value.items.forEach((item: any) => {
                            const videoId = item.link.split('v=')[1] || item.guid.split('video:')[1];
                            allVideos.push({
                                id: videoId,
                                title: item.title,
                                description: item.description || '',
                                url: item.link,
                                thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                                publishedAt: new Date(item.pubDate),
                                channelTitle: result.value.channelName
                            });
                        });
                    }
                });

                allVideos.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
                setVideos(allVideos);
            } catch (err) {
                console.error("Failed to fetch videos", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Trending Keywords Logic (The Pulse)
    const trendingTopics = useMemo(() => {
        if (videos.length === 0) return [];
        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'ai', 'artificial', 'intelligence', 'learning', 'machine', 'models', 'new', 'how', 'why', 'what', 'top', 'best', 'guide', 'review', 'vs', 'from', 'via', 'video', 'part', 'episode']);
        const wordCounts = new Map<string, number>();

        videos.forEach(video => {
            const text = `${video.title}`;
            const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
            words.forEach(word => {
                if (word.length > 3 && !stopWords.has(word) && !/^\d+$/.test(word)) {
                    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
                }
            });
        });

        return Array.from(wordCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 7)
            .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
    }, [videos]);

    // Filtering Logic
    const filteredVideos = videos.filter(video => {
        const matchesChannel = selectedChannel ? video.channelTitle === selectedChannel : true;
        const matchesSearch = searchTerm
            ? (video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                video.channelTitle.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;
        return matchesChannel && matchesSearch;
    });

    const displayVideos = filteredVideos.slice(0, visibleCount);
    const hasMore = visibleCount < filteredVideos.length;
    const latestUpdate = videos.length > 0 ? videos[0].publishedAt : new Date();

    // Active channels logic
    const activeChannelNames = new Set(videos.map(v => v.channelTitle));
    const activeChannels = CHANNELS.filter(c => activeChannelNames.has(c.name));

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse">Loading AI Videos...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Controls Section */}
            <div className="space-y-6">
                {/* Search Bar */}
                <div className="relative max-w-2xl mx-auto group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-focus-within:text-red-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search videos (e.g., 'Gemini', 'Sora', 'Reasoning')..."
                            className="w-full pl-10 pr-4 py-3 bg-card/80 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 text-foreground placeholder:text-muted-foreground/70 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* The Pulse (Trending Keywords) */}
                {trendingTopics.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <div className="flex items-center text-xs font-semibold text-red-400 uppercase tracking-widest mr-2">
                            <Activity className="w-3 h-3 mr-1 animate-pulse" />
                            Pulse
                        </div>
                        {trendingTopics.map((topic, i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className="cursor-pointer hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all text-xs"
                                onClick={() => setSearchTerm(topic)}
                            >
                                #{topic}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Ticker */}
            <div className="w-full bg-black/40 border-y border-white/10 overflow-hidden relative h-12 flex items-center mb-8">
                {/* Fixed Label */}
                <div className="absolute left-0 z-20 bg-background/95 backdrop-blur px-4 h-full flex items-center border-r border-white/10 text-xs font-bold text-primary shrink-0 uppercase tracking-wider shadow-[10px_0_20px_-5px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => setSelectedChannel(null)}
                    title="Show All"
                >
                    <div className={`w-2 h-2 rounded-full mr-3 shadow-[0_0_10px_currentColor] transition-all ${selectedChannel ? 'bg-muted-foreground' : 'bg-red-500 animate-pulse'}`}></div>
                    {selectedChannel ? 'Show All' : 'Active Channels'}
                    <span className="hidden sm:inline ml-3 text-muted-foreground normal-case font-normal border-l border-white/10 pl-3">
                        Updated: {latestUpdate.toLocaleDateString()}
                    </span>
                </div>

                {/* Scrolling Channels */}
                <div className="flex animate-marquee items-center hover:[animation-play-state:paused] ml-[140px] md:ml-48">
                    {[...activeChannels, ...activeChannels].map((channel, i) => (
                        <div
                            key={`${channel.name}-${i}`}
                            onClick={() => setSelectedChannel(channel.name === selectedChannel ? null : channel.name)}
                            className={`inline-flex items-center mx-6 group cursor-pointer px-4 py-1.5 rounded-full border transition-all duration-300
                                ${selectedChannel === channel.name
                                    ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                                    : `${channel.color.split(' ')[0]} bg-opacity-20 hover:bg-opacity-40 hover:scale-105 border-white/10 text-white font-medium tracking-wide shadow-sm`
                                }
                            `}
                        >
                            <span className="text-xs uppercase whitespace-nowrap">
                                {channel.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayVideos.map((video) => (
                    <Card key={video.id} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-2xl transition-all duration-300 flex flex-col">

                        {/* Video Player / Thumbnail Area */}
                        <div className="aspect-video relative bg-black overflow-hidden border-b border-white/5">
                            {activeVideo === video.id ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                                    title={video.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div
                                    className="w-full h-full relative cursor-pointer"
                                    onClick={() => setActiveVideo(video.id)}
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] group-hover:scale-110 transition-transform">
                                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-mono rounded">
                                        YouTube
                                    </div>
                                </div>
                            )}

                            {/* Bookmark Button (Absolute Positioned) */}
                            <Button
                                size="icon"
                                variant="secondary"
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/80 text-white border-none shadow-sm z-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark({
                                        id: video.id,
                                        title: video.title,
                                        url: video.url,
                                        source: video.channelTitle,
                                        type: 'video',
                                        publishedAt: video.publishedAt
                                    });
                                }}
                            >
                                <Bookmark className={`h-4 w-4 ${isBookmarked(video.id) ? "fill-primary text-primary" : "text-white"}`} />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant="secondary" className="bg-red-950/30 text-red-200 border-red-500/20 hover:bg-red-900/50">
                                    <Youtube className="w-3 h-3 mr-1" />
                                    {video.channelTitle}
                                </Badge>
                                <span className="flex items-center text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {video.publishedAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                <a href={video.url} target="_blank" rel="noopener noreferrer">
                                    {video.title}
                                </a>
                            </h3>

                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-red-400">
                                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                                        Open on YouTube <ExternalLink className="w-3 h-3 ml-2" />
                                    </a>
                                </Button>
                                <LinkedinShareButton url={video.url} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center pt-8">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="group text-muted-foreground hover:text-foreground border border-white/5 hover:border-white/20 bg-black/20 hover:bg-black/40"
                        onClick={() => setVisibleCount(prev => prev + 12)}
                    >
                        Load More Videos
                        <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                    </Button>
                </div>
            )}
        </div>
    );
}
