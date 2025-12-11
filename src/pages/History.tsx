import { motion } from 'framer-motion';
import { timelineData } from '@/data/timelineData';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { Clock, HelpCircle, Brain, Sparkles, Zap } from 'lucide-react';

export function History() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

            <main className="container mx-auto px-4 py-24 flex-grow relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4"
                    >
                        <Clock className="w-4 h-4" />
                        AI Time Travel
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
                    >
                        Evolution of Intelligence
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

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

                    <div className="space-y-12">
                        {timelineData.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={event.year}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 md:left-1/2 w-10 h-10 -ml-[2px] md:-ml-5 flex items-center justify-center shrink-0 z-10">
                                        <div className="w-4 h-4 rounded-full bg-background border-2 border-primary ring-4 ring-background shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                                    </div>

                                    {/* Content Card Side */}
                                    <div className="ml-12 md:ml-0 md:w-[45%] group cursor-default">
                                        <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-md border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
                                            {/* Top Decor */}
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-4xl font-bold text-primary/10 md:text-5xl absolute -right-2 -top-4 select-none group-hover:text-primary/20 transition-colors">
                                                    {event.year}
                                                </span>
                                                <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                                                    {event.category}
                                                </Badge>
                                                <span className="text-xl font-bold font-mono text-primary">
                                                    {event.year}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {event.description}
                                            </p>

                                            {/* Optional Icon based on category */}
                                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity transform scale-150">
                                                {getCategoryIcon(event.category)}
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
