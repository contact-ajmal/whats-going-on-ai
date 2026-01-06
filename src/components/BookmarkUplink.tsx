import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Command, X, Wifi, Smartphone, Monitor, Share, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DeviceType = 'mac' | 'windows' | 'ios' | 'android' | 'other';

function detectDevice(): DeviceType {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || '';

    // Check for iOS (iPhone, iPad, iPod)
    if (/iphone|ipad|ipod/.test(userAgent) || (platform === 'macintel' && navigator.maxTouchPoints > 1)) {
        return 'ios';
    }
    // Check for Android
    if (/android/.test(userAgent)) {
        return 'android';
    }
    // Check for Mac
    if (/mac/.test(platform)) {
        return 'mac';
    }
    // Check for Windows
    if (/win/.test(platform)) {
        return 'windows';
    }
    return 'other';
}

interface InstructionStep {
    icon: React.ReactNode;
    text: string;
}

function getInstructions(device: DeviceType): { title: string; steps: InstructionStep[]; shortcut?: string } {
    switch (device) {
        case 'ios':
            return {
                title: 'Add to Home Screen',
                steps: [
                    { icon: <Share className="w-4 h-4" />, text: 'Tap the Share button in Safari' },
                    { icon: <Plus className="w-4 h-4" />, text: 'Scroll down and tap "Add to Home Screen"' },
                    { icon: <Smartphone className="w-4 h-4" />, text: 'Tap "Add" to save to your home screen' },
                ],
            };
        case 'android':
            return {
                title: 'Add to Home Screen',
                steps: [
                    { icon: <Monitor className="w-4 h-4" />, text: 'Tap the menu (⋮) in Chrome' },
                    { icon: <Smartphone className="w-4 h-4" />, text: 'Tap "Add to Home screen"' },
                    { icon: <Plus className="w-4 h-4" />, text: 'Tap "Add" to confirm' },
                ],
            };
        case 'mac':
            return {
                title: 'Save to Bookmarks',
                steps: [],
                shortcut: '⌘ + D',
            };
        case 'windows':
            return {
                title: 'Save to Bookmarks',
                steps: [],
                shortcut: 'Ctrl + D',
            };
        default:
            return {
                title: 'Save to Bookmarks',
                steps: [],
                shortcut: 'Ctrl + D',
            };
    }
}

export function BookmarkUplink() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [device, setDevice] = useState<DeviceType>('other');

    useEffect(() => {
        setDevice(detectDevice());
    }, []);

    const instructions = getInstructions(device);
    const isMobile = device === 'ios' || device === 'android';

    return (
        <>
            {/* Uplink Trigger Button */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
            >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <Button
                    onClick={() => setShowPrompt(true)}
                    variant="outline"
                    className="relative px-6 py-6 bg-black/50 backdrop-blur-xl border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:bg-black/70 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Wifi className="w-5 h-5 animate-pulse" />
                            <span className="absolute inset-0 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping" />
                        </div>
                        <span className="font-mono tracking-wider uppercase text-xs">Bookmark Site</span>
                    </div>

                    {/* Scanning Line Effect */}
                    <div className="absolute inset-0 w-[5px] h-full bg-cyan-400/20 skew-x-12 animate-scan-fast opacity-0 group-hover:opacity-100" />
                </Button>
            </motion.div>

            {/* Holographic Prompt Overlay */}
            <AnimatePresence>
                {showPrompt && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowPrompt(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-sm w-full bg-black/90 border border-cyan-500/50 rounded-xl p-6 shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] overflow-hidden"
                        >
                            {/* Decorative Corner Brackets */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 rounded-tl-md" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 rounded-tr-md" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 rounded-bl-md" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 rounded-br-md" />

                            <button
                                onClick={() => setShowPrompt(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                                    {isMobile ? (
                                        <Smartphone className="w-8 h-8 text-cyan-400 animate-pulse" />
                                    ) : (
                                        <Radio className="w-8 h-8 text-cyan-400 animate-pulse" />
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white tracking-widest uppercase font-mono">
                                        {instructions.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {isMobile
                                            ? 'Follow these steps to save this app to your device.'
                                            : 'Press the key combination to save this site.'
                                        }
                                    </p>
                                </div>

                                {/* Desktop: Show keyboard shortcut */}
                                {instructions.shortcut && (
                                    <div className="flex items-center gap-3 py-3 px-6 bg-white/5 rounded-lg border border-white/10 w-full justify-center group cursor-default hover:border-cyan-500/30 transition-colors">
                                        <Command className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                        <span className="font-mono text-xl font-bold text-white tracking-widest">
                                            {instructions.shortcut}
                                        </span>
                                    </div>
                                )}

                                {/* Mobile: Show step-by-step instructions */}
                                {instructions.steps.length > 0 && (
                                    <div className="w-full space-y-3">
                                        {instructions.steps.map((step, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 py-2 px-4 bg-white/5 rounded-lg border border-white/10 text-left hover:border-cyan-500/30 transition-colors"
                                            >
                                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <span className="text-cyan-400">{step.icon}</span>
                                                    {step.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p className="text-xs text-muted-foreground font-mono">
                                    {isMobile
                                        ? `Detected: ${device === 'ios' ? 'iPhone/iPad' : 'Android'}`
                                        : 'Use this shortcut to add to your browser'
                                    }
                                </p>
                            </div>

                            {/* Background Grid Slices */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
