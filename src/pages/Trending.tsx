import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Clock, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TRENDING_TOPICS } from '@/data/trendingTech';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const Trending = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <Navigation />
            <NeuralBackground />

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-4"
                >
                    <Badge variant="outline" className="mb-4 text-orange-400 border-orange-400/20 backdrop-blur-md">
                        <Flame className="w-3 h-3 mr-1" />
                        Hot Topics
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-orange-400 via-red-400 to-orange-600">
                        Trending AI Tech
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
                        Breaking developments in AI. New capabilities, features, and tools explained as they emerge.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {TRENDING_TOPICS.map((topic) => (
                        <motion.div key={topic.id} variants={item}>
                            <Link to={topic.link} className="block h-full group">
                                <Card className="h-full bg-black/40 border-white/10 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5 group-hover:-translate-y-1 overflow-hidden relative">
                                    {/* Gradient Glow */}
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${topic.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                                    {/* Breaking Badge */}
                                    {topic.isBreaking && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse">
                                                <Flame className="w-3 h-3 mr-1" />
                                                BREAKING
                                            </Badge>
                                        </div>
                                    )}

                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                                {topic.icon}
                                            </div>
                                            <Badge variant="secondary" className="bg-white/5 border-white/10">
                                                {topic.difficulty}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-2xl font-bold group-hover:text-orange-400 transition-colors">
                                            {topic.title}
                                        </CardTitle>
                                        <CardDescription className="text-base font-medium text-white/80">
                                            {topic.shortDescription}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {topic.fullDescription}
                                        </p>

                                        <div className="pt-4 flex flex-wrap gap-2">
                                            {topic.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs border-orange-500/20 bg-orange-500/5 text-orange-300">
                                                    #{tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="pt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 mt-auto">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {topic.readTime} read
                                            </div>
                                            <div className="flex items-center gap-1 group-hover:text-orange-400 transition-colors">
                                                Explore <ExternalLink className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Coming Soon Placeholder */}
                {TRENDING_TOPICS.length < 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-muted-foreground/50 text-sm">
                            More trending topics coming soon...
                        </p>
                    </motion.div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Trending;
