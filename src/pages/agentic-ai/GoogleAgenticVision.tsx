import React from 'react';
import { motion } from 'framer-motion';
import {
    Eye, Cpu, MousePointerClick, Layers, ArrowLeft,
    Sparkles, Square, ZoomIn, Calculator, Zap,
    Terminal, Lock, Globe, Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all duration-300"
    >
        <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
            <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

const StepCard = ({ number, title, description, icon: Icon }: { number: string, title: string, description: string, icon: any }) => (
    <div className="relative p-6 rounded-xl bg-slate-900/50 border border-white/10 z-10">
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm">
            {number}
        </div>
        <div className="mb-4 text-blue-400">
            <Icon className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
    </div>
);

const GoogleAgenticVision = () => {
    return (
        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-blue-500/30">
            <SEO
                title="Google Agentic Vision | Gemini 3 Flash"
                description="Explore Google's Agentic Vision: A new capability in Gemini 3 Flash that uses a Think, Act, Observe loop for active image understanding."
                url="/agentic-ai/google-agentic-vision"
            />
            <Navigation />
            <NeuralBackground />

            <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Hero Section */}
                <div className="max-w-5xl mx-auto text-center relative z-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-400 px-4 py-1.5 text-sm backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 mr-2" />
                            New in Gemini 3 Flash
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                            Agentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Vision</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Transforming computer vision from a static analysis into an active, agentic process of thinking, acting, and observing.
                        </p>
                    </motion.div>
                </div>

                {/* The Loop Section */}
                <div className="max-w-6xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">The Agentic Loop</h2>
                        <p className="text-slate-400">How Gemini 3 Flash actively understands images</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent -translate-y-1/2 z-0" />

                        <StepCard
                            number="1"
                            title="Think"
                            description="The model analyzes the initial image and user query, formulating a multi-step plan to gather more information."
                            icon={Cpu}
                        />
                        <StepCard
                            number="2"
                            title="Act"
                            description="It generates and executes Python code to manipulate the image (crop, zoom) or analyze it (count, measure)."
                            icon={Terminal}
                        />
                        <StepCard
                            number="3"
                            title="Observe"
                            description="The new data (transformed image or calculation) is added to the context. The model inspects this to refine its answer."
                            icon={Eye}
                        />
                    </div>
                </div>

                {/* Key Capabilities */}
                <div className="max-w-6xl mx-auto mb-24">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">New Capabilities</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={ZoomIn}
                            title="Implicit Zooming"
                            description="Detects fine-grained details by automatically cropping and inspecting high-resolution patches, like verifying building plan codes."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={Square}
                            title="Visual Annotation"
                            description="Uses a 'visual scratchpad' to draw bounding boxes and labels on the image (e.g., counting fingers) to ensure pixel-perfect accuracy."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Calculator}
                            title="Visual Math"
                            description="Parses dense tables and plots data using Python libraries like Matplotlib, replacing probabilistic guessing with deterministic execution."
                            delay={0.3}
                        />
                    </div>
                </div>

                {/* Deep Dive / Technical Section */}
                <div className="max-w-4xl mx-auto bg-slate-900/30 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-indigo-500/10 rounded-xl">
                            <Layers className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Under the Hood</h2>
                            <p className="text-slate-400 text-sm">Powered by Google's Code Execution Tool</p>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-300 leading-relaxed">
                        <p>
                            Traditional multimodal models process an image in a single pass. If details are too small or the task requires counting complex objects, they often hallucinate.
                        </p>
                        <p>
                            <span className="text-white font-medium">Agentic Vision</span> changes this by giving the model
                            access to a Python sandbox. When it needs to see better, it writes code to crop the image.
                            When it needs to count, it writes code to draw on the image. This "grounding" in code execution
                            make the results verifiable and significantly more accurate.
                        </p>

                        <div className="mt-8 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs md:text-sm text-green-400 overflow-x-auto">
                            <div className="text-slate-500 mb-2"># Example: Model thinking process</div>
                            <div className="mb-1"><span className="text-blue-400">PLAN:</span> I need to count the apples. I will detect them and draw boxes.</div>
                            <div className="mb-1"><span className="text-blue-400">ACT:</span> <span className="text-yellow-400">execute_python</span>(detect_and_draw(image))</div>
                            <div className="mb-1"><span className="text-blue-400">OBSERVE:</span> [Detailed image with 5 marked boxes returned]</div>
                            <div><span className="text-blue-400">ANSWER:</span> There are exactly 5 apples in the image.</div>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-20 text-center">
                    <Link
                        to="/agentic-ai"
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Agentic AI
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GoogleAgenticVision;
