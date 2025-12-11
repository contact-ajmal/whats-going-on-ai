import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { VideoFeed } from '@/components/VideoFeed';
import { motion } from 'framer-motion';

export default function Videos() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <NeuralBackground />
            <Navigation />

            <main className="container mx-auto px-4 py-24 flex-grow relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <div className="text-center space-y-4 mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                            AI Video Feed
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Curated research summaries, demos, and discussions from the top AI channels.
                        </p>
                    </div>

                    <VideoFeed />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
