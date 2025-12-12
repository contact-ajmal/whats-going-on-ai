import { useState } from 'react';
import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { LearningFeed } from '@/components/LearningFeed';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Search, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";

// Course Ticker Component
const CourseTicker = () => {
    const topics = [
        "Generative AI", "LLM Fine-tuning", "PyTorch Deep Dive", "Transformer Architecture",
        "Reinforcement Learning", "Computer Vision", "LangChain Agents", "Prompt Engineering",
        "Stable Diffusion", "AI Ethics", "MLOps", "RAG Systems"
    ];

    return (
        <div className="w-full overflow-hidden bg-white/5 border-y border-white/5 py-3 mb-12 relative group cursor-default">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
                {[...topics, ...topics].map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 mx-6 text-xs md:text-sm font-medium text-muted-foreground/80 tracking-wide">
                        <Sparkles className="w-3 h-3 text-primary/50" />
                        {topic}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Learning() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <NeuralBackground />
            <Navigation />

            <main className="relative pt-24 pb-16">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            <span className="text-primary">//</span> AI Learning Hub
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                            Master Artificial Intelligence with curated courses, tutorials, and deep-dive videos from the world's best instructors.
                        </p>

                        {/* Hero Search Box */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search topic, instructor, or platform..."
                                    className="pl-12 h-14 text-lg bg-background/80 backdrop-blur-xl border-white/10 focus:border-primary/50 rounded-xl shadow-xl transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Ticker */}
                    <CourseTicker />

                    {/* Learning Feed */}
                    <div className="max-w-7xl mx-auto">
                        <ErrorBoundary>
                            <LearningFeed searchTerm={searchTerm} />
                        </ErrorBoundary>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="container mx-auto px-6 mt-24">
                    <NewsletterSignup variant="default" />
                </div>
            </main>

            <Footer />
        </div>
    );
}
