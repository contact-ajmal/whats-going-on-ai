import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Activity, MapPin, Signal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';

interface GeoData {
    city?: string;
    country_name?: string;
    country_code?: string;
}

interface RegionStats {
    country: string;
    code: string;
    count: number;
}

export function VisitorHUD() {
    const [geo, setGeo] = useState<GeoData | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [totalVisits, setTotalVisits] = useState<number>(0);
    const [regions, setRegions] = useState<RegionStats[]>([]);

    useEffect(() => {
        async function initSession() {
            try {
                // 1. Get User Location
                const res = await fetch('https://ipapi.co/json/');
                const data = await res.json();
                setGeo(data);

                if (!supabase) {
                    console.error("VisitorHUD: Supabase client is NULL. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
                    return;
                }

                console.log("VisitorHUD: Attempting to log visit...");

                // 2. Log Visit to Supabase
                const { error: insertError } = await supabase.from('analytics_visits').insert({
                    country: data.country_name,
                    city: data.city,
                    country_code: data.country_code,
                    path: window.location.pathname,
                    user_agent: navigator.userAgent
                });

                if (insertError) {
                    console.error("VisitorHUD: Insert FAILED", insertError);
                } else {
                    console.log("VisitorHUD: Insert SUCCESS");
                }

                // 3. Fetch Aggregate Stats
                // Total Count
                const { count, error: countError } = await supabase.from('analytics_visits').select('*', { count: 'exact', head: true });

                if (countError) {
                    console.error("VisitorHUD: Count Read FAILED", countError);
                } else {
                    console.log("VisitorHUD: Count Read SUCCESS. Count:", count);
                    setTotalVisits(count || 0);
                }

                // Regions (This would ideally be a clear RPC or view, but for now we fetch recent 100 and aggregate client side for simplicity/speed without custom SQL functions)
                const { data: recentVisits } = await supabase
                    .from('analytics_visits')
                    .select('country, country_code')
                    .order('created_at', { ascending: false })
                    .limit(500);

                if (recentVisits) {
                    const stats: Record<string, { count: number, code: string }> = {};
                    recentVisits.forEach(v => {
                        if (!v.country) return;
                        if (!stats[v.country]) stats[v.country] = { count: 0, code: v.country_code };
                        stats[v.country].count++;
                    });

                    const sortedRegions = Object.entries(stats)
                        .map(([country, data]) => ({ country, code: data.code, count: data.count }))
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5);

                    setRegions(sortedRegions);
                }

            } catch (err) {
                console.error("Analytics Error:", err);
            }
        }

        initSession();
    }, []);

    return (
        <div className="relative z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-primary/20 backdrop-blur-md cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-all shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Status Indicator */}
                <div className="relative flex items-center justify-center w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
                </div>

                <span className="text-xs font-mono font-bold text-primary tracking-tight">
                    LIVE
                </span>

                {totalVisits > 0 && (
                    <>
                        <div className="w-px h-3 bg-white/10 mx-1" />
                        <span className="text-xs font-mono font-medium text-white/90">
                            {totalVisits.toLocaleString()}
                        </span>
                    </>
                )}

                {geo?.country_code && (
                    <div className="ml-1 w-4 h-3 rounded-[1px] overflow-hidden opacity-80">
                        <img
                            src={`https://flagcdn.com/w20/${geo.country_code.toLowerCase()}.png`}
                            alt={geo.country_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-3 w-80"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <Card className="p-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">Site Traffic Intelligence</span>
                                </div>
                                <Badge variant="outline" className="text-[10px] h-5 bg-green-500/10 text-green-400 border-green-500/30 font-mono">
                                    MONITORING
                                </Badge>
                            </div>

                            <div className="p-4 space-y-6">
                                {/* Main Stat */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Visitors</p>
                                        <h3 className="text-3xl font-black text-white font-mono tracking-tighter">
                                            {totalVisits.toLocaleString()}
                                        </h3>
                                    </div>
                                    <Globe className="w-8 h-8 text-white/5" />
                                </div>

                                {/* Active Regions */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
                                        <span>Active Zones</span>
                                        <span>Traffic</span>
                                    </div>

                                    <div className="space-y-2">
                                        {regions.map((region, idx) => (
                                            <div key={region.code} className="group flex items-center gap-3">
                                                <span className="text-[10px] font-mono text-muted-foreground w-4">0{idx + 1}</span>
                                                <div className="w-5 h-3.5 rounded-[1px] overflow-hidden grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                                    <img
                                                        src={`https://flagcdn.com/w20/${region.code.toLowerCase()}.png`}
                                                        alt={region.country}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-medium text-white/80">{region.country}</span>
                                                        {idx === 0 && <Signal className="w-3 h-3 text-primary animate-pulse" />}
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(region.count / (regions[0]?.count || 1)) * 100}%` }}
                                                            className="h-full bg-primary/60 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {regions.length === 0 && (
                                            <div className="py-4 text-center text-xs text-muted-foreground">
                                                Gathering intelligence...
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Current Location */}
                                {geo && (
                                    <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-muted-foreground/60">
                                        <MapPin className="w-3 h-3" />
                                        <span>Local Uplink: <span className="text-white/40">{geo.city}</span></span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
