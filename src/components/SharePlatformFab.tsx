import { useState } from 'react';
import { Share2, X, Twitter, Link as LinkIcon, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
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

    const handleCopy = () => {
        const url = getCurrentUrl();
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        setIsOpen(false);
    };

    const shareTwitter = () => {
        const url = getCurrentUrl();
        const title = getPageTitle();
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            '_blank'
        );
        setIsOpen(false);
    };

    const shareLinkedin = () => {
        const url = getCurrentUrl();
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            '_blank'
        );
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 flex flex-col gap-2 mb-2 bg-black/80 backdrop-blur-md p-2 rounded-xl border border-white/10 shadow-xl min-w-[160px]"
                    >
                        <Button variant="ghost" className="justify-start gap-2 text-white hover:bg-white/10 w-full" onClick={shareTwitter}>
                            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Post to X
                        </Button>
                        <Button variant="ghost" className="justify-start gap-2 text-white hover:bg-white/10 w-full" onClick={shareLinkedin}>
                            <Linkedin className="w-4 h-4 text-blue-600" />
                            LinkedIn
                        </Button>
                        <Button variant="ghost" className="justify-start gap-2 text-white hover:bg-white/10 w-full" onClick={handleCopy}>
                            <LinkIcon className="w-4 h-4 text-emerald-400" />
                            Copy Link
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
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
