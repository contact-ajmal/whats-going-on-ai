import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { loadBlogPosts } from "@/lib/config";
import { BlogPostMeta } from "@/types/config";

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPostMeta[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (open) {
            loadBlogPosts().then(setPosts);
        }
    }, [open]);

    // Handle selection
    const handleSelect = (slug: string) => {
        navigate(`/blog/${slug}`);
        onOpenChange(false);
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="p-0 overflow-hidden max-w-xl">
                <div className="flex flex-col w-full h-[400px] bg-background">
                    <div className="flex items-center border-b border-border px-4 py-3">
                        <Search className="w-5 h-5 text-muted-foreground mr-2" />
                        <input
                            className="flex-1 bg-transparent border-0 outline-none text-base placeholder:text-muted-foreground"
                            placeholder="Search posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {filteredPosts.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                                No results found.
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {filteredPosts.map((post) => (
                                    <button
                                        key={post.slug}
                                        onClick={() => handleSelect(post.slug)}
                                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h4>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                                {post.date}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                                            {post.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-2 border-t border-border text-xs text-muted-foreground text-right bg-muted/20">
                        Unconventional Search
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
