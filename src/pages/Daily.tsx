import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Share2, Loader2, ArrowLeft, Globe, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SECTION_LABELS, ContentSource } from '@/lib/newsletterUtils';
import { toast } from 'sonner';

interface DailyItem {
    id: string;
    title: string;
    description: string;
    url: string;
    source: ContentSource;
    date: string;
    // ... other fields
}

interface DailyData {
    lastUpdated: string;
    header: string;
    sectionLabels: Record<string, string>;
    items: DailyItem[];
}

export default function Daily() {
    const [data, setData] = useState<DailyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                // Try fetching from file (production/deployed)
                const res = await fetch('/data/daily_curated.json');
                if (res.ok) {
                    const jsonData = await res.json();
                    setData(jsonData);
                    return;
                }
                throw new Error("File not found");
            } catch (err) {
                // Fallback to localStorage (local development/preview)
                console.log("Remote file not found, checking local preview cache...");
                const localData = localStorage.getItem('daily_preview_data');
                if (localData) {
                    setData(JSON.parse(localData));
                    toast.info("Showing local preview version");
                } else {
                    setError('No daily brief published yet.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.share({
                title: data?.header || 'Daily AI Updates',
                text: 'Check out the latest AI news curations',
                url
            });
        } catch (e) {
            await navigator.clipboard.writeText(url);
            toast.success('Link copied to clipboard');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !data || data.items.length === 0) {
        return (
            <div className="min-h-screen pt-24 container mx-auto px-4 text-center">
                <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>
                <div className="max-w-md mx-auto mt-12">
                    <h1 className="text-2xl font-bold mb-4">No Updates Found</h1>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        );
    }

    // Group items by section
    const grouped = data.items.reduce((acc, item) => {
        if (!acc[item.source]) acc[item.source] = [];
        acc[item.source].push(item);
        return acc;
    }, {} as Record<string, DailyItem[]>);

    const orderedSections = Object.keys(SECTION_LABELS).filter(k => grouped[k]) as ContentSource[];

    return (
        <div className="min-h-screen pt-24 pb-12 bg-background">
            <Helmet>
                <title>{data.header} | WhatsGoingOnAI</title>
                <meta name="description" content={`Daily AI updates: ${data.items.length} stories curated for you.`} />
            </Helmet>

            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors font-medium text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-border/40 pb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-primary border-primary/30">Daily Brief</Badge>
                                <span className="text-sm text-muted-foreground flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(data.lastUpdated).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                {data.header}
                            </h1>
                        </div>
                        <Button onClick={handleShare} variant="outline" className="shrink-0">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Brief
                        </Button>
                    </div>
                </div>

                {/* Content */}
                {/* Content */}
                <div className="space-y-12">
                    {orderedSections.map((source, sectionIdx) => (
                        <motion.section
                            key={source}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIdx * 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-2xl font-bold text-primary/90">
                                    {SECTION_LABELS[source]}
                                </h2>
                                <div className="h-px flex-grow bg-gradient-to-r from-primary/20 to-transparent" />
                            </div>

                            <div className="grid gap-4">
                                {grouped[source].map((item, idx) => (
                                    <Card key={idx} className="group p-5 border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                        <div className="flex gap-4 items-start justify-between">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                                                        {item.title}
                                                    </a>
                                                </h3>
                                                {item.description && (
                                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-background rounded-full"
                                                title="Open Link"
                                            >
                                                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                            </a>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Internal Promos - Assessment Lures */}
                            {sectionIdx === 0 && (
                                <Link to="/updates" className="block mt-8 group">
                                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-purple-100">Want more headlines?</h4>
                                                <p className="text-xs text-muted-foreground">Check our live 24/7 AI News Feed</p>
                                            </div>
                                        </div>
                                        <ArrowLeft className="w-4 h-4 text-purple-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            )}

                            {sectionIdx === 1 && (
                                <Link to="/tools" className="block mt-8 group">
                                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                                <Wrench className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-emerald-100">Explore the Toolbox</h4>
                                                <p className="text-xs text-muted-foreground">Discover 500+ AI tools & MCP servers</p>
                                            </div>
                                        </div>
                                        <ArrowLeft className="w-4 h-4 text-emerald-400 rotate-180 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            )}
                        </motion.section>
                    ))}
                </div>

                {/* Bottom Funnel CTA */}
                <div className="mt-20 p-8 rounded-2xl bg-gradient-to-b from-primary/5 to-primary/10 border border-primary/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Dive Deeper into AI</h2>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                        This was just a glimpse. Visit our main platform for full research papers, job listings, interactive timelines, and detailed agentic skills analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-12 text-base px-8" asChild>
                            <Link to="/">
                                Explore Full Platform
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 text-base px-8" asChild>
                            <Link to="/jobs">
                                Browse AI Jobs
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
