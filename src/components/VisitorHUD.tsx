import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, TrendingUp, MapPin, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface GeoData {
    city?: string;
    country_name?: string;
    country_code?: string;
}

export function VisitorHUD() {
    const [geo, setGeo] = useState<GeoData | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [liveCount, setLiveCount] = useState(128); // Initial active users

    useEffect(() => {
        // Fetch location data
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => setGeo(data))
            .catch(err => console.error("Geo fetch failed", err));

        // Simulate live ticker fluctuation
        const interval = setInterval(() => {
            setLiveCount(prev => prev + Math.floor(Math.random() * 5) - 2);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const stats = [
        { label: 'Daily Visits', value: '1.2k', icon: Users, color: 'text-blue-400' },
        { label: 'Monthly', value: '45.8k', icon: TrendingUp, color: 'text-green-400' },
        { label: 'Total', value: '540k+', icon: Globe, color: 'text-purple-400' },
    ];

    return (
        <div className="relative z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Live Indicator */}
                <div className="relative flex items-center justify-center w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>

                <span className="text-xs font-mono font-medium text-green-400">
                    {liveCount} Live
                </span>

                {geo?.country_code && (
                    <>
                        <div className="w-px h-3 bg-white/20 mx-1" />
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <img
                                src={`https://flagcdn.com/w20/${geo.country_code.toLowerCase()}.png`}
                                alt={geo.country_name}
                                className="w-4 h-auto rounded-[2px]"
                            />
                        </span>
                    </>
                )}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <Card className="p-4 bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl">
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <Activity className="w-4 h-4 text-green-400" />
                                        Traffic Insights
                                    </div>
                                    <Badge variant="outline" className="text-[10px] h-5 bg-green-500/10 text-green-400 border-green-500/30">
                                        Online
                                    </Badge>
                                </div>

                                {/* Location Info */}
                                {geo && (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-2 rounded-lg">
                                        <MapPin className="w-3 h-3 text-primary" />
                                        <span>
                                            Accessing from <span className="text-white font-medium">{geo.city}, {geo.country_name}</span>
                                        </span>
                                    </div>
                                )}

                                {/* Grid Stats */}
                                <div className="grid grid-cols-3 gap-2">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center">
                                            <stat.icon className={`w-4 h-4 ${stat.color} mb-1`} />
                                            <span className="text-xs font-bold text-white">{stat.value}</span>
                                            <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
