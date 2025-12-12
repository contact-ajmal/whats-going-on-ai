import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ToolsDirectory } from '@/components/ToolsDirectory';
import { motion } from 'framer-motion';
import { Hammer } from 'lucide-react'; // Using Hammer as generic "Tool" icon if Wrench is too generic

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <NeuralBackground />
            <Navigation />

            <main className="container mx-auto px-4 py-24 flex-grow relative z-10 flex flex-col items-center min-h-[80vh]">
                <div className="text-center space-y-6 mb-16 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                        <Hammer className="w-4 h-4" />
                        AI Toolkit
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-400"
                    >
                        Tools & MCP Directory
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground leading-relaxed"
                    >
                        The ultimate library of AI applications, developer tools, and Model Context Protocol (MCP) servers. <br className="hidden md:block" />
                        Discover, learn, and build faster.
                    </motion.p>
                </div>

                <ToolsDirectory />
            </main>

            <Footer />
        </div>
    );
}
