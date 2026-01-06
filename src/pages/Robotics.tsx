import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ROBOTICS_TOPICS, RoboticsTopic } from '@/data/roboticsData';

const TopicCard = ({ topic }: { topic: RoboticsTopic }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="group"
    >
        <Link to={topic.link}>
            <div className="relative p-6 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-teal-500/50 transition-all duration-300 h-full">
                {topic.isBreaking && (
                    <div className="absolute -top-2 -right-2">
                        <Badge className="bg-teal-500 text-white text-xs animate-pulse">
                            NEW
                        </Badge>
                    </div>
                )}

                <div className={`p-3 rounded-xl bg-gradient-to-br ${topic.color} w-fit mb-4`}>
                    <Bot className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {topic.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {topic.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {topic.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-slate-400 border-slate-700">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{topic.readTime}</span>
                    <span className="text-teal-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    </motion.div>
);

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
                        🤖 Physical AI
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
                        AI Robotics
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        The convergence of AI and physical systems. Humanoids, autonomous machines, and the future of work.
                    </p>
                </motion.div>

                {/* Topics Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ROBOTICS_TOPICS.map((topic) => (
                            <TopicCard key={topic.id} topic={topic} />
                        ))}
                    </div>

                    {/* Coming Soon Placeholder */}
                    {ROBOTICS_TOPICS.length < 3 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-12 text-center"
                        >
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400">
                                <Sparkles className="w-4 h-4" />
                                More robotics content coming soon
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Robotics;
