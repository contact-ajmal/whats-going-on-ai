import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, User, Loader2 } from "lucide-react";
import { extractImageFromContent } from "@/lib/utils";

interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
    cover_image: string | null;
    social_image: string | null;
    published_at: string;
    tag_list: string[];
    user: {
        name: string;
        profile_image: string;
    };
    body_markdown?: string; // Sometimes available depending on API params
}

export function NewsFeed() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetch AI related articles from Dev.to
                // We use 'ai' tag and request 'fresh' articles
                const response = await fetch('https://dev.to/api/articles?tag=ai&per_page=9&state=fresh');

                if (!response.ok) {
                    throw new Error('Failed to fetch updates');
                }

                const data = await response.json();
                setArticles(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Could not load the latest updates. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-destructive font-medium">{error}</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <Card key={article.id} className="group overflow-hidden border-primary/20 bg-black/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden bg-muted/20">
                        {article.cover_image || article.social_image ? (
                            <img
                                src={article.cover_image || article.social_image || ''}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            // Fallback gradient if no image
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                <span className="text-4xl">🤖</span>
                            </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Badge variant="secondary" className="bg-black/60 hover:bg-black/80 backdrop-blur-md border-primary/20">
                                {new Date(article.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </Badge>
                        </div>
                    </div>

                    <CardHeader className="pb-3">
                        <div className="flex gap-2 flex-wrap mb-2">
                            {article.tag_list.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="outline" className="text-[10px] py-0 h-5 border-primary/30 text-primary/80">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                {article.title}
                            </a>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pb-3">
                        <p className="text-muted-foreground text-sm line-clamp-3">
                            {article.description}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-0 flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 mt-auto p-4">
                        <div className="flex items-center gap-2">
                            {article.user.profile_image && (
                                <img src={article.user.profile_image} alt={article.user.name} className="w-5 h-5 rounded-full ring-1 ring-primary/30" />
                            )}
                            <span>{article.user.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary/80 hover:text-primary" asChild>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                Read <ExternalLink className="h-3 w-3" />
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
