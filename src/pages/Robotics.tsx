import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { Bot, Cpu, Cog, Rocket, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';

const Robotics = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <SEO
                title="AI Robotics | WhatsGoingOnAI"
                description="Explore the latest in AI-powered robotics: humanoids, autonomous systems, industrial automation, and the future of physical AI."
                url="/robotics"
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
                    <Badge variant="outline" className="mb-4 text-teal-400 border-teal-400/20 backdrop-blur-md">
                        Physical AI
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                        AI Robotics
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        The convergence of AI and physical systems. Humanoids, autonomous machines, and the future of work.
                    </p>
                </motion.div>

                {/* Coming Soon */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-teal-500/10 border border-teal-500/30 rounded-2xl p-12 text-center">
                        <div className="p-4 bg-teal-500/10 rounded-full w-fit mx-auto mb-6">
                            <Bot className="w-12 h-12 text-teal-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            We're building a comprehensive hub for AI robotics news, research, and developments. Check back soon!
                        </p>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
                            <Clock className="w-4 h-4" />
                            <span>Content launching soon</span>
                        </div>

                        {/* Preview Topics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                            {[
                                { icon: Bot, label: 'Humanoids' },
                                { icon: Cpu, label: 'Embodied AI' },
                                { icon: Cog, label: 'Industrial' },
                                { icon: Rocket, label: 'Space Robots' },
                            ].map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="p-3 bg-black/30 rounded-lg border border-white/5">
                                        <Icon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                                        <span className="text-xs text-slate-400">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors"
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

export default Robotics;
