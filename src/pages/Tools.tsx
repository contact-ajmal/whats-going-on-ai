import { useState } from 'react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ToolsDirectory } from '@/components/ToolsDirectory';
import { MCPFeed } from '@/components/MCPFeed';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer } from 'lucide-react';

export default function ToolsPage() {
    const [activeTab, setActiveTab] = useState<'directory' | 'feed'>('directory');

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

                <div className="w-full max-w-7xl mx-auto mb-8">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab('directory')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'directory' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-white'}`}
                            >
                                Tool Directory
                            </button>
                            <button
                                onClick={() => setActiveTab('feed')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === 'feed' ? 'bg-blue-600 text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
                            >
                                MCP News Feed
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'directory' ? (
                            <motion.div
                                key="directory"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ToolsDirectory />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="feed"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MCPFeed />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
}
