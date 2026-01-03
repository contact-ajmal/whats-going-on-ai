import { Share2, Link as LinkIcon, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const url = window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    };

    const shareTwitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    const shareLinkedin = () => {
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank'
        );
    };

    const handleNativeShare = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            }).catch(console.error);
        } else {
            handleCopy();
        }
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2 font-medium">Share:</span>

            {/* Mobile / Native Share */}
            <Button variant="outline" size="icon" className="h-8 w-8 md:hidden" onClick={handleNativeShare}>
                <Share2 className="h-4 w-4" />
            </Button>

            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-black hover:text-white transition-colors" onClick={shareTwitter} title="Post to X">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 hover:text-blue-600" onClick={shareLinkedin} title="Share on LinkedIn">
                    <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleCopy} title="Copy Link">
                    <LinkIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
