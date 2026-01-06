import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Workflow, Zap, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';

const AgenticAI = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <SEO
                title="Agentic AI | WhatsGoingOnAI"
                description="Discover the world of autonomous AI agents: reasoning models, tool use, multi-agent systems, and the future of AI that can act."
                url="/agentic-ai"
            />
            <Navigation />
            <NeuralBackground />

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-4"
                >
                    <Badge variant="outline" className="mb-4 text-violet-400 border-violet-400/20 backdrop-blur-md">
                        Autonomous Systems
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        Agentic AI
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        AI that thinks, plans, and acts. From reasoning models to multi-agent systems.
                    </p>
                </motion.div>

                {/* Coming Soon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-violet-500/10 border border-violet-500/30 rounded-2xl p-12 text-center">
                        <div className="p-4 bg-violet-500/10 rounded-full w-fit mx-auto mb-6">
                            <Sparkles className="w-12 h-12 text-violet-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            We're curating the best resources on agentic AI: frameworks, research papers, and real-world applications. Stay tuned!
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
                            <Clock className="w-4 h-4" />
                            <span>Content launching soon</span>
                        </div>

                        {/* Preview Topics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                            {[
                                { icon: Brain, label: 'Reasoning' },
                                { icon: Workflow, label: 'Workflows' },
                                { icon: Zap, label: 'Tool Use' },
                                { icon: Sparkles, label: 'Multi-Agent' },
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="p-3 bg-black/30 rounded-lg border border-white/5">
                                        <Icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                                        <span className="text-xs text-slate-400">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            Back to Home
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default AgenticAI;
