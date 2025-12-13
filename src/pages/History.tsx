
import { motion } from 'framer-motion';
import { timelineData } from '@/data/timelineData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { Clock, HelpCircle, Brain, Sparkles, Zap, ExternalLink, Play, History as HistoryIcon } from 'lucide-react';

export function History() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <Navigation />
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

            <main className="container mx-auto px-4 py-24 flex-grow relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6"
                    >
                        <HistoryIcon className="w-4 h-4" />
                        AI Timeline
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400 mb-6"
                    >
                        AI Timeline
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        From the Turing Test to Generative Agents.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

                    <div className="space-y-24">
                        {timelineData.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={event.year + event.title}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-center md:items-start md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 top-0 md:top-8 w-10 h-10 -ml-[2px] md:-ml-5 flex items-center justify-center shrink-0 z-10 transform -translate-y-1/2 md:translate-y-0">
                                        <div className="w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-background shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                                    </div>

                                    {/* Content Card Side */}
                                    <div className="ml-12 md:ml-0 md:w-[45%] w-[calc(100%-3rem)] group">
                                        <div className="rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 overflow-hidden hover:border-primary/40 hover:shadow-2xl transition-all duration-300">

                                            {/* Media Section (Image/Video) */}
                                            {event.media && (
                                                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-black/50">
                                                    {event.media.type === 'video' ? (
                                                        <iframe
                                                            src={event.media.url}
                                                            title={event.title}
                                                            className="w-full h-full"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    ) : (
                                                        <img
                                                            src={event.media.url}
                                                            alt={event.media.caption || event.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                        />
                                                    )}
                                                    {event.media.type === 'video' && (
                                                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 text-white text-[10px] uppercase font-bold tracking-wider rounded flex items-center">
                                                            <Play className="w-3 h-3 mr-1 fill-white" /> Video
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="p-6">
                                                {/* Header: Year + Category */}
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-3xl font-bold font-mono text-primary/80">
                                                        {event.year}
                                                    </span>
                                                    <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary h-6">
                                                        {event.category}
                                                    </Badge>
                                                </div>

                                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                                    {event.title}
                                                </h3>

                                                <p className="text-muted-foreground leading-relaxed mb-4">
                                                    {event.description}
                                                </p>

                                                {/* Tags */}
                                                {event.tags && event.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-6">
                                                        {event.tags.map(tag => (
                                                            <span key={tag} className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/5">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Action Links */}
                                                {event.links && event.links.length > 0 && (
                                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                                                        {event.links.map(link => (
                                                            <Button key={link.url} variant="outline" size="sm" asChild className="text-xs h-8 bg-transparent hover:bg-primary/10 border-white/20">
                                                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                                    {link.label} <ExternalLink className="w-3 h-3 ml-2" />
                                                                </a>
                                                            </Button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty Side (Desktop only) */}
                                    <div className="hidden md:block md:w-[45%]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

function getCategoryIcon(category: string) {
    switch (category) {
        case 'Foundations': return <HelpCircle className="w-12 h-12" />;
        case 'Neural Nets': return <Brain className="w-12 h-12" />;
        case 'Generative Age': return <Sparkles className="w-12 h-12" />;
        case 'Modern Era': return <Zap className="w-12 h-12" />;
        default: return <Brain className="w-12 h-12" />;
    }
}
