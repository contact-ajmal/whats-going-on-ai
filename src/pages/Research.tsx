import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { ResearchFeed } from '@/components/ResearchFeed';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Research() {
    return (
        <div className="min-h-screen bg-background">
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-primary">//</span> Latest Research
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Cutting-edge AI papers from ArXiv.
                        </p>
                    </motion.div>

                    {/* Research Feed */}
                    <div className="max-w-4xl mx-auto">
                        <ErrorBoundary>
                            <ResearchFeed />
                        </ErrorBoundary>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
