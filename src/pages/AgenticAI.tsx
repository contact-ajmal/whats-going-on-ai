import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock, ArrowUpRight, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { AGENTIC_TOPICS } from '@/data/agenticData';

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

                {/* Topics Grid */}
                <div className="max-w-6xl mx-auto">
                    {AGENTIC_TOPICS.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {AGENTIC_TOPICS.map((topic, idx) => (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link to={topic.link} className="group block h-full">
                                        <div className="h-full p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1">
                                            {/* Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-2 rounded-lg bg-gradient-to-br ${topic.color} bg-opacity-20`}>
                                                    <Zap className="w-5 h-5 text-white" />
                                                </div>
                                                {topic.isBreaking && (
                                                    <Badge variant="outline" className="text-orange-400 border-orange-400/30 text-xs">
                                                        🔥 HOT
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                                                {topic.title}
                                            </h3>
                                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                                {topic.shortDescription}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center justify-between text-xs text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{topic.readTime}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-violet-400 group-hover:gap-2 transition-all">
                                                    <span>Read</span>
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </div>
                                            </div>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1 mt-4">
                                                {topic.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-slate-400">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
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
                                    We're curating the best resources on agentic AI. Stay tuned!
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Back Link */}
                <div className="text-center mt-12">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                    >
                        Back to Home
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AgenticAI;
