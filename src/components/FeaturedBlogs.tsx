import { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Loader2, Tag } from "lucide-react";
import { Link } from 'react-router-dom';
import { loadBlogPosts, formatDate } from '@/lib/config';
import { BlogPostMeta } from '@/types/config';

export function FeaturedBlogs() {
    const [posts, setPosts] = useState<BlogPostMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBlogPosts()
            .then(allPosts => {
                // Take only the first 3 posts
                setPosts(allPosts.slice(0, 3));
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (posts.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
                <Card key={post.slug} className="group overflow-hidden border-white/10 bg-card/30 backdrop-blur-md hover:border-primary/50 hover:shadow-2xl transition-all duration-300 flex flex-col h-full rounded-xl">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date)}
                        </div>
                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors leading-snug">
                            <Link to={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                        </CardTitle>
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {post.tags.slice(0, 2).map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </CardHeader>

                    <CardContent className="pb-3 flex-grow">
                        <p className="text-muted-foreground text-sm line-clamp-3">
                            {post.description}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-3 border-t border-white/5 mt-auto">
                        <Button variant="ghost" size="sm" className="w-full gap-2 text-primary/80 hover:text-primary group/btn" asChild>
                            <Link to={`/blog/${post.slug}`}>
                                Read Article <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
