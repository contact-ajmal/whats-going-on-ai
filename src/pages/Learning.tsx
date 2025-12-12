import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { LearningFeed } from '@/components/LearningFeed';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Learning() {
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
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            <span className="text-primary">//</span> AI Learning Hub
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Master Artificial Intelligence with curated courses, tutorials, and deep-dive videos from the world's best instructors.
                        </p>
                    </motion.div>

                    {/* Learning Feed */}
                    <div className="max-w-6xl mx-auto">
                        <ErrorBoundary>
                            <LearningFeed />
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
