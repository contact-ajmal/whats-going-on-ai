import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkedinShareButtonProps {
    url: string;
    title?: string;
}

export function LinkedinShareButton({ url }: LinkedinShareButtonProps) {
    const handleShare = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8 text-muted-foreground hover:text-[#0077b5] transition-colors"
            onClick={handleShare}
            title="Share on LinkedIn"
        >
            <Linkedin className="h-4 w-4" />
        </Button>
    );
}
