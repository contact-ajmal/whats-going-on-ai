import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AICompass } from '@/components/AICompass';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

export default function CompassPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <NeuralBackground />
            <Navigation />

            <main className="container mx-auto px-4 py-24 flex-grow relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
                <div className="text-center space-y-6 mb-12 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                        <Compass className="w-4 h-4" />
                        Archetype Quiz
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400"
                    >
                        The AI Compass
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground leading-relaxed"
                    >
                        Are you an Accelerationist or a Doomer? A Symbiote or a Pragmatist? <br className="hidden md:block" />
                        Answer 5 questions to find where you stand in the Age of AI.
                    </motion.p>
                </div>

                <AICompass />
            </main>

            <Footer />
        </div>
    );
}
