import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useBookmarks, BookmarkItem } from "@/hooks/useBookmarks";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookmarkButtonProps {
    item: BookmarkItem;
    className?: string;
}

export function BookmarkButton({ item, className }: BookmarkButtonProps) {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const active = isBookmarked(item.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(item);
        if (!active) {
            toast.success("Added to your library");
        } else {
            toast.info("Removed from library");
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("hover:bg-primary/20 hover:text-primary transition-colors", active ? "text-primary" : "text-muted-foreground", className)}
            onClick={handleClick}
            title={active ? "Remove from bookmarks" : "Save to bookmarks"}
        >
            <Bookmark className={cn("w-4 h-4 transition-all", active ? "fill-current scale-110" : "scale-100")} />
        </Button>
    );
}
