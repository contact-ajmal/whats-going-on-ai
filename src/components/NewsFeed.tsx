import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";

interface Article {
    id: number;
    title: string;
    description: string;
    url: string;
    cover_image: string | null;
    tag_list: string[];
    published_at: string;
    user: {
        name: string;
        profile_image: string;
    };
}

export const NewsFeed = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetch top AI/Machine Learning articles
                const response = await fetch('https://dev.to/api/articles?tag=ai&top=7&per_page=4');
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    AI News
                </h2>
                <span className="text-xs text-muted-foreground">Powered by Dev.to</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((article) => (
                    <Card key={article.id} className="group overflow-hidden border-primary/20 bg-black/40 backdrop-blur hover:bg-black/60 transition-colors">
                        {article.cover_image && (
                            <div className="h-32 w-full overflow-hidden">
                                <img
                                    src={article.cover_image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        )}
                        <CardHeader className="space-y-2">
                            <div className="flex gap-2 flex-wrap">
                                {article.tag_list.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    {article.title}
                                </a>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                {article.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={article.user.profile_image} alt={article.user.name} className="w-6 h-6 rounded-full" />
                                    <span className="text-xs text-muted-foreground">{article.user.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" asChild className="h-8">
                                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                                        Read <ExternalLink className="w-3 h-3 ml-2" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
