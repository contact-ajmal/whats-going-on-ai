import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, Link as LinkIcon, Rss, Calendar, Search, ChevronDown, Activity } from "lucide-react";
import { extractImageFromContent } from "@/lib/utils";
import { BookmarkButton } from "@/components/BookmarkButton";
import ShareButtons from './ShareButtons';

interface UnifiedArticle {
    id: string;
    title: string;
    description: string;
    url: string;
    image: string | null;
    publishedAt: Date;
    source: {
        name: string;
        color: string;
        icon?: string;
    };
    tags: string[];
}

export function NewsFeed() {
    const [articles, setArticles] = useState<UnifiedArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSource, setSelectedSource] = useState<string | null>(null); // New state for filtering
    const [visibleCount, setVisibleCount] = useState(12);

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                // Fetch higher limits for "infinite" feel
                const results = await Promise.allSettled([
                    // 1. Dev.to (Direct API)
                    fetch('https://dev.to/api/articles?tag=ai&per_page=15&state=fresh').then(res => res.json()),

                    // 2. Techmeme (via rss2json)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.techmeme.com/feed.xml').then(res => res.json()),

                    // 3. Hacker News AI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://hnrss.org/newest?q=AI').then(res => res.json()),

                    // 4. OpenAI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://openai.com/news/rss.xml').then(res => res.json()),

                    // 5. Google DeepMind / Research Blog
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://blog.research.google/atom.xml').then(res => res.json()),

                    // 6. The Verge AI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/ai-artificial-intelligence/index.xml').then(res => res.json()),

                    // 7. Anthropic News
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.anthropic.com/news/rss.xml').then(res => res.json())
                ]);

                const newArticles: UnifiedArticle[] = [];

                // Helper to process RSS-to-JSON results
                const processRSS = (result: PromiseSettledResult<any>, sourceName: string, color: string) => {
                    if (result.status === 'fulfilled' && result.value?.items) {
                        result.value.items.forEach((item: any) => {
                            newArticles.push({
                                id: `${sourceName.toLowerCase().replace(/\s/g, '')}-${item.guid || item.link}`,
                                title: item.title,
                                description: item.description?.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...' || '',
                                url: item.link,
                                image: extractImageFromContent(item.content || item.description || '') || item.thumbnail,
                                publishedAt: new Date(item.pubDate),
                                source: { name: sourceName, color },
                                tags: ['ai']
                            });
                        });
                    }
                };

                // 1. Dev.to Processing
                if (results[0].status === 'fulfilled' && Array.isArray(results[0].value)) {
                    results[0].value.forEach((item: any) => {
                        newArticles.push({
                            id: `devto-${item.id}`,
                            title: item.title,
                            description: item.description,
                            url: item.url,
                            image: item.cover_image || item.social_image,
                            publishedAt: new Date(item.published_at),
                            source: { name: 'Dev.to', color: 'bg-zinc-800 border-zinc-600' },
                            tags: item.tag_list || []
                        });
                    });
                }

                // Process others
                // Note: Index matches the order in Promise.allSettled
                processRSS(results[1], 'Techmeme', 'bg-blue-900/40 border-blue-500/30');
                processRSS(results[2], 'Hacker News', 'bg-orange-900/40 border-orange-500/30');
                processRSS(results[3], 'OpenAI', 'bg-emerald-900/40 border-emerald-500/30');
                processRSS(results[4], 'Google Research', 'bg-cyan-600 border-cyan-400');
                processRSS(results[5], 'The Verge', 'bg-violet-600 border-violet-400');
                processRSS(results[6], 'Anthropic', 'bg-amber-900/40 border-amber-500/30');

                // Sort by date (descending)
                newArticles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

                // Remove duplicates by URL
                const uniqueArticles = Array.from(new Map(newArticles.map(item => [item.url, item])).values());

                setArticles(uniqueArticles);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Errors occurred while loading updates, but some content may be visible.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllNews();
    }, []);

    // Extract Unique Sources
    const uniqueSources = useMemo(() => {
        const sources = new Map();
        articles.forEach(article => {
            if (!sources.has(article.source.name)) {
                sources.set(article.source.name, article.source);
            }
        });
        return Array.from(sources.values());
    }, [articles]);

    // The Pulse: Calculate Trending Keywords
    const trendingTopics = useMemo(() => {
        if (articles.length === 0) return [];

        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'ai', 'artificial', 'intelligence', 'learning', 'machine', 'models', 'new', 'how', 'why', 'what', 'top', 'best', 'guide', 'review', 'vs', 'from', 'via']);

        const wordCounts = new Map<string, number>();

        articles.forEach(article => {
            // Combine title and tags for analysis
            const text = `${article.title} ${article.tags.join(' ')}`;
            // Remove special chars and split
            const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

            words.forEach(word => {
                if (word.length > 3 && !stopWords.has(word) && !/^\d+$/.test(word)) {
                    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
                }
            });
        });

        // Convert to array and sort
        return Array.from(wordCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 7) // Top 7 topics
            .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
    }, [articles]);

    // Filter Logic
    const filteredArticles = useMemo(() => {
        let filtered = articles;

        // Source Filter
        if (selectedSource) {
            filtered = filtered.filter(article => article.source.name === selectedSource);
        }

        // Search Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(lowerTerm) ||
                article.description.toLowerCase().includes(lowerTerm) ||
                article.source.name.toLowerCase().includes(lowerTerm)
            );
        }
        return filtered;
    }, [articles, searchTerm, selectedSource]);

    const displayArticles = filteredArticles.slice(0, visibleCount);
    const hasMore = visibleCount < filteredArticles.length;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (articles.length === 0 && error) {
        return (
            <div className="text-center py-20 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-destructive font-medium">Failed to load any news feeds.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    // Get latest update time
    const latestUpdate = articles.length > 0 ? articles[0].publishedAt : new Date();

    return (
        <div className="space-y-8">
            {/* Live Ticker */}
            {articles.length > 0 && (
                <div className="w-full bg-black/40 border-y border-white/10 overflow-hidden relative h-12 flex items-center">
                    {/* Fixed Label */}
                    <div className="absolute left-0 z-20 bg-background/95 backdrop-blur px-4 h-full flex items-center border-r border-white/10 text-xs font-bold text-primary shrink-0 uppercase tracking-wider shadow-[10px_0_20px_-5px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/5 transition-colors"
                        onClick={() => setSelectedSource(null)}
                        title="Show All"
                    >
                        <div className={`w-2 h-2 rounded-full mr-3 shadow-[0_0_10px_currentColor] transition-all ${selectedSource ? 'bg-muted-foreground' : 'bg-red-500 animate-pulse'}`}></div>
                        {selectedSource ? 'Show All' : 'Live Updates'}
                        <span className="hidden sm:inline ml-3 text-muted-foreground normal-case font-normal border-l border-white/10 pl-3">
                            Last: {latestUpdate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {latestUpdate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    {/* Scrolling Sources */}
                    <div className="flex animate-marquee items-center hover:[animation-play-state:paused]">
                        {[...uniqueSources, ...uniqueSources, ...uniqueSources, ...uniqueSources].map((source, i) => (
                            <div
                                key={`${source.name}-${i}`}
                                onClick={() => setSelectedSource(source.name === selectedSource ? null : source.name)}
                                className={`inline-flex items-center mx-6 group cursor-pointer px-4 py-1.5 rounded-full border transition-all duration-300
                                    ${selectedSource === source.name
                                        ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                                        : `${source.color} bg-opacity-30 hover:bg-opacity-50 hover:scale-105 border-white/10 text-white font-semibold tracking-wide shadow-sm`
                                    }
                                `}
                            >
                                <span className="text-xs uppercase whitespace-nowrap">
                                    {source.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Fade overlay on right */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                </div>
            )}



            {/* The Pulse (Trending Topics) */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-wrap justify-center gap-2 animate-in fade-in zoom-in duration-500">
                    <span className="flex items-center text-sm font-semibold text-primary mr-2">
                        <Activity className="w-4 h-4 mr-2 animate-pulse" />
                        The Pulse:
                    </span>
                    {trendingTopics.map((topic) => (
                        <Badge
                            key={topic}
                            variant={searchTerm.toLowerCase().includes(topic.toLowerCase()) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors border-primary/20"
                            onClick={() => setSearchTerm(topic)}
                        >
                            #{topic}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search updates (e.g. 'OpenAI', 'Google', 'LLM')..."
                    className="pl-10 bg-background/50 border-primary/20 focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setVisibleCount(12); // Reset valid count on search
                    }}
                />
            </div>

            {/* Empty State for Search */}
            {
                filteredArticles.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No updates found for "{searchTerm}"</p>
                        <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary">
                            Clear Search
                        </Button>
                    </div>
                )
            }

            {/* Horizontal List View */}
            <div className="flex flex-col gap-4">
                {displayArticles.map((article) => (
                    <Card key={article.id} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-32 rounded-lg items-stretch">

                        {/* Image Thumbnail (Left on Desktop, Top on Mobile) */}
                        <div className="w-full sm:w-48 h-40 sm:h-auto shrink-0 relative overflow-hidden bg-muted/20 border-b sm:border-b-0 sm:border-r border-white/5">
                            {article.image ? (
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                            ) : null}

                            <div className={`w-full h-full absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center ${article.image ? 'hidden' : ''}`}>
                                <Rss className="w-8 h-8 text-primary/20" />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col justify-between p-4 min-w-0">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 h-5 backdrop-blur-md border ${article.source.color} text-white`}>
                                            {article.source.name}
                                        </Badge>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {article.publishedAt.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-1">
                                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                                            {article.title}
                                        </a>
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {article.description}
                                    </p>
                                </div>

                                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 text-muted-foreground hover:text-primary" asChild>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                                <ShareButtons title={article.title} />
                                <BookmarkButton
                                    item={{
                                        id: article.id,
                                        title: article.title,
                                        url: article.url,
                                        source: article.source.name,
                                        type: 'news',
                                        publishedAt: article.publishedAt.toISOString()
                                    }}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Load More Button */}
            {
                hasMore && (
                    <div className="flex justify-center pt-8">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="gap-2 min-w-[200px]"
                            onClick={() => setVisibleCount(prev => prev + 12)}
                        >
                            Load More Articles <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                )
            }
        </div >
    );
}
