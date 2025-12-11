import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, ExternalLink, Trash2, BookOpen, FileText } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function LibraryDrawer() {
    const { bookmarks, removeBookmark } = useBookmarks();
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group">
                    <Bookmark className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    {bookmarks.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] text-primary-foreground flex items-center justify-center rounded-full font-bold animate-in zoom-in">
                            {bookmarks.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md border-l border-white/10 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                        <Bookmark className="w-6 h-6 text-primary fill-primary/20" />
                        My Library
                    </SheetTitle>
                    <SheetDescription>
                        Your saved research papers and articles.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
                    {bookmarks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground space-y-4">
                            <div className="p-4 rounded-full bg-muted/50">
                                <Bookmark className="w-8 h-8 opacity-50" />
                            </div>
                            <p>Your library is empty.<br />Time to discover something new!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookmarks.map((item) => (
                                <div key={item.id} className="group relative p-4 rounded-xl border border-white/5 bg-card/30 hover:bg-card/50 transition-all hover:border-primary/20">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="space-y-1.5 flex-1">
                                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                                                <Badge variant="outline" className="border-primary/20 text-primary h-5 px-1.5 rounded-sm">
                                                    {item.type}
                                                </Badge>
                                                <span>{item.source}</span>
                                                <span className="text-muted-foreground/50">•</span>
                                                <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                                            </div>
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="block font-medium hover:text-primary transition-colors line-clamp-2">
                                                {item.title}
                                            </a>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeBookmark(item.id)}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                                            title="Remove"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                                            Read now <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
                <div className="absolute bottom-6 left-6 right-6">
                    {/* Footer content if needed */}
                </div>
            </SheetContent>
        </Sheet>
    );
}
