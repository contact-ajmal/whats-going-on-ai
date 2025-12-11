import { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Link as LinkIcon, Rss } from "lucide-react";
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
                    fetch('https://dev.to/api/articles?tag=ai&per_page=6&state=fresh').then(res => res.json()),
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.techmeme.com/feed.xml').then(res => res.json()),
                    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=Artificial+Intelligence+when:3d&hl=en-US&gl=US&ceid=US:en').then(res => res.json())
                ]);

                const [devToResult, techmemeResult, googleResult] = results;

                const articles: UnifiedArticle[] = [];

                // 1. Dev.to
                if (devToResult.status === 'fulfilled' && Array.isArray(devToResult.value)) {
                    devToResult.value.forEach((item: any) => {
                        articles.push({
                            id: `devto-${item.id}`,
                            title: item.title,
                            description: item.description,
                            url: item.url,
                            image: item.cover_image || item.social_image,
                            publishedAt: new Date(item.published_at),
                            source: { name: 'Dev.to', color: 'bg-black border-white/20' },
                            tags: item.tag_list || []
                        });
                    });
                }

                // 2. Techmeme
                if (techmemeResult.status === 'fulfilled' && techmemeResult.value?.items) {
                    techmemeResult.value.items.slice(0, 6).forEach((item: any) => {
                        articles.push({
                            id: `techmeme-${item.guid}`,
                            title: item.title,
                            description: item.description?.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...',
                            url: item.link,
                            image: extractImageFromContent(item.content || item.description),
                            publishedAt: new Date(item.pubDate),
                            source: { name: 'Techmeme', color: 'bg-blue-900/50 border-blue-500/30' },
                            tags: ['tech', 'news']
                        });
                    });
                }

                // 3. Google News
                if (googleResult.status === 'fulfilled' && googleResult.value?.items) {
                    googleResult.value.items.slice(0, 6).forEach((item: any) => {
                        articles.push({
                            id: `google-${item.guid}`,
                            title: item.title,
                            description: item.description?.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...',
                            url: item.link,
                            image: null,
                            publishedAt: new Date(item.pubDate),
                            source: { name: 'Google News', color: 'bg-red-900/50 border-red-500/30' },
                            tags: ['ai', 'google']
                        });
                    });
                }

                // Sort by date (descending)
                articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

                setArticles(articles);
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
                            <Badge variant="secondary" className={`backdrop-blur-md border ${article.source.color}`}>
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
