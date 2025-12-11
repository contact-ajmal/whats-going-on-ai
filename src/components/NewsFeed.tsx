import { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Link as LinkIcon, Rss, Calendar } from "lucide-react";
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

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                // Use allSettled to prevent one failure from breaking everything
                const results = await Promise.allSettled([
                    // 1. Dev.to (Direct API)
                    fetch('https://dev.to/api/articles?tag=ai&per_page=3&state=fresh').then(res => res.json()),

                    // 2. Techmeme (via rss2json)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.techmeme.com/feed.xml').then(res => res.json()),

                    // 3. Google News AI (via rss2json)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=Artificial+Intelligence+when:3d&hl=en-US&gl=US&ceid=US:en').then(res => res.json()),

                    // 4. OpenAI (via rss2json)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://openai.com/news/rss.xml').then(res => res.json()),

                    // 5. MIT Technology Review (via rss2json)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.technologyreview.com/topic/artificial-intelligence/feed/').then(res => res.json()),

                    // 6. Hacker News AI (via rss2json)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://hnrss.org/newest?q=AI').then(res => res.json()),

                    // 7. Google DeepMind (via rss2json) - using blog research URL as proxy often works better or official feed
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://blog.research.google/atom.xml').then(res => res.json()),

                    // 8. The Verge AI (via rss2json)
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.theverge.com/rss/ai-artificial-intelligence/index.xml').then(res => res.json())
                ]);

                const [
                    devToResult,
                    techmemeResult,
                    googleNewsResult,
                    openAiResult,
                    mitResult,
                    hnResult,
                    googleResearchResult,
                    vergeResult
                ] = results;

                const newArticles: UnifiedArticle[] = [];

                // Helper to process RSS-to-JSON results
                const processRSS = (result: PromiseSettledResult<any>, sourceName: string, color: string, limit = 2) => {
                    if (result.status === 'fulfilled' && result.value?.items) {
                        result.value.items.slice(0, limit).forEach((item: any) => {
                            newArticles.push({
                                id: `${sourceName.toLowerCase().replace(/\s/g, '')}-${item.guid || item.link}`,
                                title: item.title,
                                description: item.description?.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...' || '',
                                url: item.link,
                                image: extractImageFromContent(item.content || item.description || '') || item.thumbnail, // rss2json often passes thumbnail
                                publishedAt: new Date(item.pubDate),
                                source: { name: sourceName, color },
                                tags: ['ai']
                            });
                        });
                    }
                };

                // 1. Dev.to Processing
                if (devToResult.status === 'fulfilled' && Array.isArray(devToResult.value)) {
                    devToResult.value.forEach((item: any) => {
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
                processRSS(techmemeResult, 'Techmeme', 'bg-blue-900/40 border-blue-500/30');
                processRSS(googleNewsResult, 'Google News', 'bg-red-900/40 border-red-500/30');
                processRSS(openAiResult, 'OpenAI', 'bg-emerald-900/40 border-emerald-500/30', 4); // Higher priority
                processRSS(mitResult, 'MIT Tech', 'bg-black border-white/20');
                processRSS(hnResult, 'Hacker News', 'bg-orange-900/40 border-orange-500/30');
                processRSS(googleResearchResult, 'Google Research', 'bg-blue-600/20 border-blue-400/30');
                processRSS(vergeResult, 'The Verge', 'bg-purple-900/40 border-purple-500/30');

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

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    // Only show error if NO articles loaded at all
    if (articles.length === 0 && error) {
        return (
            <div className="text-center py-20 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-destructive font-medium">Failed to load any news feeds.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <Card key={article.id} className="group overflow-hidden border-primary/20 bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                    {/* Image Area */}
                    <div className="aspect-video relative overflow-hidden bg-muted/20 border-b border-white/5">
                        {article.image ? (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : null}

                        {/* Fallback / Overlay */}
                        <div className={`w-full h-full absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center ${article.image ? 'hidden' : ''}`}>
                            <Rss className="w-12 h-12 text-primary/20" />
                        </div>

                        {/* Badges */}
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Badge variant="secondary" className={`backdrop-blur-md border ${article.source.color} text-white`}>
                                {article.source.name}
                            </Badge>
                        </div>
                    </div>

                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {article.publishedAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors leading-snug">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.title}
                            </a>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pb-3 flex-grow">
                        <p className="text-muted-foreground text-sm line-clamp-3">
                            {article.description}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-3 border-t border-white/5 mt-auto">
                        <Button variant="ghost" size="sm" className="w-full gap-2 text-primary/80 hover:text-primary group/btn" asChild>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                Read Full Story <ExternalLink className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
