import { useState } from 'react';
import { Share2, X, Twitter, Link as LinkIcon, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export function SharePlatformFab() {
    const [isOpen, setIsOpen] = useState(false);

    // Get current page URL fresh on each call
    const getCurrentUrl = () => window.location.href;

    // Get page title fresh on each call
    const getPageTitle = () => {
        const h1 = document.querySelector('h1');
        if (h1?.textContent) {
            return `${h1.textContent} | WhatsGoingOnAI`;
        }
        return document.title || "Check out WhatsGoingOnAI";
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = getCurrentUrl();
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        setIsOpen(false);
    };

    const shareTwitter = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = getCurrentUrl();
        const title = getPageTitle();
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

        // Use window.open with specific dimensions to avoid popup blockers
        const popup = window.open(shareUrl, 'twitter-share', 'width=600,height=400,resizable=yes,scrollbars=yes');
        if (!popup) {
            // Fallback: redirect in same window if popup blocked
            window.location.href = shareUrl;
        }
        setIsOpen(false);
    };

    const shareLinkedin = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = getCurrentUrl();
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

        // Use window.open with specific dimensions to avoid popup blockers
        const popup = window.open(shareUrl, 'linkedin-share', 'width=600,height=600,resizable=yes,scrollbars=yes');
        if (!popup) {
            // Fallback: redirect in same window if popup blocked
            window.location.href = shareUrl;
        }
        setIsOpen(false);
    };

    const buttonClass = "flex items-center justify-start gap-2 w-full px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer";

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 flex flex-col gap-1 mb-2 bg-black/90 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-xl min-w-[160px]"
                    >
                        <button type="button" className={buttonClass} onClick={shareTwitter}>
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Post to X
                        </button>
                        <button type="button" className={buttonClass} onClick={shareLinkedin}>
                            <Linkedin className="w-4 h-4 text-blue-400" />
                            LinkedIn
                        </button>
                        <button type="button" className={buttonClass} onClick={handleCopy}>
                            <LinkIcon className="w-4 h-4 text-emerald-400" />
                            Copy Link
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-primary hover:bg-primary/90'
                    }`}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <Share2 className="w-5 h-5 text-primary-foreground" />}
            </motion.button>
        </div>
    );
}

