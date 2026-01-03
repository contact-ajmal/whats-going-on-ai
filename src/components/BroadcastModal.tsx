import { motion, AnimatePresence } from 'framer-motion';
import { X, Twitter, Linkedin, Copy, Check, Radio, Share2, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BroadcastModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BroadcastModal({ isOpen, onClose }: BroadcastModalProps) {
    const [copied, setCopied] = useState(false);
    const [signalStrength, setSignalStrength] = useState(0);

    useEffect(() => {
        // Simulate "Signal Strength" based on shares (stored in local storage)
        const stored = localStorage.getItem('broadcast_signal_strength');
        if (stored) setSignalStrength(parseInt(stored));
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        incrementSignal();
    };

    const incrementSignal = () => {
        const newStrength = signalStrength + 1;
        setSignalStrength(newStrength);
        localStorage.setItem('broadcast_signal_strength', newStrength.toString());
    };

    const shareText = "I just found the ultimate AI intelligence hub. @WhatsGoingOnAI is mapping the future. 📡 #ArtificialIntelligence #Tech";
    const shareUrl = window.location.origin;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-black border border-indigo-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.2)]"
                    >
                        {/* Sci-fi Header */}
                        <div className="relative h-32 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center overflow-hidden border-b border-white/10">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                            <div className="text-center z-10">
                                <div className="flex justify-center mb-3">
                                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                                        <Radio className="w-6 h-6 text-indigo-400 animate-pulse" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">Broadcast Signal</h2>
                                <p className="text-indigo-300/80 text-sm">Share the knowledge network</p>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">

                            {/* Visual Stats */}
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg border border-white/5">
                                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Signal Strength</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={cn(
                                                "w-1 h-3 rounded-full transition-all duration-500",
                                                i <= Math.min((signalStrength % 5) + 1, 5) ? "bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]" : "bg-white/10"
                                            )} />
                                        ))}
                                    </div>
                                    <span className="text-indigo-400 font-mono text-sm">{signalStrength > 0 ? `Lvl ${Math.floor(signalStrength / 5) + 1}` : 'Standby'}</span>
                                </div>
                            </div>

                            {/* Share Actions */}
                            <div className="grid gap-3">
                                <Button
                                    onClick={() => { window.open(twitterUrl, '_blank'); incrementSignal(); }}
                                    className="w-full bg-black/40 hover:bg-black/60 text-white border border-white/10 h-12 text-base font-medium justify-between group transition-all"
                                >
                                    <span className="flex items-center gap-3">
                                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                        Share on X
                                    </span>
                                    <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                </Button>

                                <Button
                                    onClick={() => { window.open(linkedinUrl, '_blank'); incrementSignal(); }}
                                    className="w-full bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/20 h-12 text-base font-medium justify-between group"
                                >
                                    <span className="flex items-center gap-3">
                                        <Linkedin className="w-5 h-5" /> Share on LinkedIn
                                    </span>
                                    <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </div>

                            {/* Copy Link Section */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Share2 className="w-4 h-4 text-slate-500" />
                                </div>
                                <input
                                    readOnly
                                    value={shareUrl}
                                    className="w-full bg-black border border-white/10 rounded-xl py-3 pl-10 pr-24 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50 transition-colors"
                                />
                                <Button
                                    size="sm"
                                    onClick={handleCopy}
                                    className={cn(
                                        "absolute right-1 top-1 bottom-1 px-4 transition-all duration-300",
                                        copied ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-white/10 hover:bg-white/20 text-white"
                                    )}
                                >
                                    {copied ? (
                                        <span className="flex items-center gap-2"><Check size={14} /> Copied</span>
                                    ) : (
                                        <span className="flex items-center gap-2"><Copy size={14} /> Copy</span>
                                    )}
                                </Button>
                            </div>

                            {/* Mobile QR */}
                            <div className="pt-4 border-t border-white/10 flex items-center gap-6">
                                <div className="p-2 bg-white rounded-lg shrink-0">
                                    {/* Using QR Server API for dependency-free QR code */}
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(shareUrl)}&bgcolor=ffffff&color=000000&margin=0`}
                                        alt="Scan to share"
                                        className="w-16 h-16"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium flex items-center gap-2 mb-1">
                                        <Smartphone size={16} className="text-indigo-400" /> Mobile Uplink
                                    </h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        Scan to open on your mobile device instantly.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
