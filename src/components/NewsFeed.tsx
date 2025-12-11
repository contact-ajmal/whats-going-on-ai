import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, Link as LinkIcon, Rss, Calendar, Search, ChevronDown } from "lucide-react";
import { extractImageFromContent } from "@/lib/utils";

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

                    // 3. Google News AI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=Artificial+Intelligence+when:7d&hl=en-US&gl=US&ceid=US:en').then(res => res.json()),

                    // 4. OpenAI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://openai.com/news/rss.xml').then(res => res.json()),

                    // 5. MIT Technology Review
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.technologyreview.com/topic/artificial-intelligence/feed/').then(res => res.json()),

                    // 6. Hacker News AI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://hnrss.org/newest?q=AI').then(res => res.json()),

                    // 7. Google DeepMind
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://blog.research.google/atom.xml').then(res => res.json()),

                    // 8. The Verge AI
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/ai-artificial-intelligence/index.xml').then(res => res.json())
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
                processRSS(results[2], 'Google News', 'bg-red-900/40 border-red-500/30');
                processRSS(results[3], 'OpenAI', 'bg-emerald-900/40 border-emerald-500/30');
                processRSS(results[4], 'MIT Tech', 'bg-black border-white/20');
                processRSS(results[5], 'Hacker News', 'bg-orange-900/40 border-orange-500/30');
                processRSS(results[6], 'Google Research', 'bg-blue-600/20 border-blue-400/30');
                processRSS(results[7], 'The Verge', 'bg-purple-900/40 border-purple-500/30');

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

    // Filter Logic
    const filteredArticles = useMemo(() => {
        if (!searchTerm) return articles;
        const lowerTerm = searchTerm.toLowerCase();
        return articles.filter(article =>
            article.title.toLowerCase().includes(lowerTerm) ||
            article.description.toLowerCase().includes(lowerTerm) ||
            article.source.name.toLowerCase().includes(lowerTerm)
        );
    }, [articles, searchTerm]);

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

    return (
        <div className="space-y-8">
            {/* Live Ticker */}
            {articles.length > 0 && (
                <div className="w-full bg-black/40 border-y border-white/10 overflow-hidden relative h-12 flex items-center">
                    {/* Fixed Label */}
                    <div className="absolute left-0 z-20 bg-background/95 backdrop-blur px-4 h-full flex items-center border-r border-white/10 text-xs font-bold text-primary shrink-0 uppercase tracking-wider shadow-[10px_0_20px_-5px_rgba(0,0,0,0.5)]">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3 shadow-[0_0_10px_red]"></div>
                        Live Updates
                        <span className="hidden sm:inline ml-3 text-muted-foreground normal-case font-normal border-l border-white/10 pl-3">
                            Last avg: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    {/* Scrolling Content */}
                    <div className="flex animate-marquee items-center pl-40 sm:pl-64">
                        {articles.slice(0, 15).map((article, i) => (
                            <div key={`${article.id}-ticker`} className="inline-flex items-center mx-8 group cursor-pointer">
                                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded mr-3 border ${article.source.color} bg-background text-foreground/80`}>
                                    {article.source.name}
                                </span>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4">
                                    {article.title}
                                </a>
                                <span className="ml-8 text-white/10">•</span>
                            </div>
                        ))}
                    </div>

                    {/* Fade overlay on right */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                </div>
            )}

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
            {filteredArticles.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No updates found for "{searchTerm}"</p>
                    <Button variant="link" onClick={() => setSearchTerm("")} className="text-primary">
                        Clear Search
                    </Button>
                </div>
            )}

            {/* Horizontal List View */}
            <div className="flex flex-col gap-4">
                {displayArticles.map((article) => (
                    <Card key={article.id} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-row h-32 rounded-lg items-stretch">

                        {/* Image Thumbnail (Left, Fixed Width) */}
                        <div className="w-48 shrink-0 relative overflow-hidden bg-muted/20 border-r border-white/5">
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
                                            {article.publishedAt.toLocaleDateString()}
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
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
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
            )}
        </div>
    );
}
