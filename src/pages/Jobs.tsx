import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { JobFeed } from '@/components/JobFeed';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Jobs() {
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
                            <span className="text-primary">//</span> AI Jobs Board
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Find your next role in Artificial Intelligence. Curated from top labs and remote boards.
                        </p>
                    </motion.div>

                    {/* Jobs Feed */}
                    <div className="max-w-4xl mx-auto">
                        <ErrorBoundary>
                            <JobFeed />
                        </ErrorBoundary>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="container mx-auto px-6 mt-24">
                    <NewsletterSignup variant="default" />
                </div>
            </main >

            <Footer />
        </div >
    );
}
