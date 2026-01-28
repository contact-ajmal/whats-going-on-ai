import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Eye, Cpu, Terminal, ArrowLeft, Sparkles,
    ZoomIn, Calculator, Layers, Play,
    ArrowRight, CheckCircle2, ScanEye, Code2, MousePointerClick
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Official Google Video URLs
const VIDEOS = {
    zoom: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/1_ZoomInspect_V5_1.mp4",
    annotate: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/2_Image_Annotation_V4.mp4",
    plot: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/3_Visual_MathPlotting_V3.mp4"
};

const FeatureCard = ({ icon: Icon, title, description, videoUrl, delay }: { icon: any, title: string, description: string, videoUrl: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="group relative rounded-2xl bg-slate-900/40 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300"
    >
        <div className="aspect-video relative bg-black/50 overflow-hidden">
            <video
                src={videoUrl}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-md">
                        <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
            </div>
        </div>
        <div className="p-6 pt-2">
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const StepCard = ({ number, title, description, icon: Icon, isActive = false }: any) => (
    <div className={`relative p-6 rounded-xl border transition-all duration-300 ${isActive ? 'bg-blue-500/10 border-blue-500/50' : 'bg-slate-900/50 border-white/10'}`}>
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-blue-500/20">
            {number}
        </div>
        <div className={`mb-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
            <Icon className="w-8 h-8" />
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
    </div>
);

const GoogleAgenticVision = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-blue-500/30">
            <SEO
                title="Google Agentic Vision Deep Dive | Gemini 3 Flash"
                description="Analysis of Gemini 3 Flash's Agentic Vision capability. See the Think-Act-Observe loop in action with real backend logs and video demos."
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Gemini 3 Flash Capability</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                            Agentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Vision</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            Moving beyond static analysis. Gemini now <span className="text-white">Thinks</span>, <span className="text-white">Acts</span> via code, and <span className="text-white">Observes</span> results to solve complex visual tasks with
                            <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-base font-bold border border-green-500/20">
                                <ArrowRight className="w-3 h-3 mr-1" />
                                10% Higher Accuracy
                            </span>
                        </p>
                    </motion.div>
                </div>

                {/* The Agentic Loop Viz */}
                <div className="max-w-7xl mx-auto mb-32">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">The Agentic Loop</h2>
                        <p className="text-slate-400">How Gemini 3 Flash actively understands images by writing code.</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Diagram */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 rounded-3xl p-2 border border-white/10 backdrop-blur-sm"
                        >
                            <img
                                src="/images/google-agentic/loop-diagram.png"
                                alt="Agentic Loop Diagram: Think, Act, Observe"
                                className="w-full rounded-2xl shadow-2xl"
                            />
                        </motion.div>

                        {/* Right: Steps */}
                        <div className="space-y-6">
                            <StepCard
                                number="1"
                                title="Think (Planning)"
                                description="The model doesn't just guess. It analyzes the user query and image to formulate a multi-step plan. 'I need to count the apples, so I should write code to detect objects.'"
                                icon={Cpu}
                                isActive={true}
                            />
                            <StepCard
                                number="2"
                                title="Act (Code Execution)"
                                description="It generates and executes Python code in a secure sandbox. This can be cropping to zoom in, using OpenCV to count, or Matplotlib to plot data."
                                icon={Terminal}
                            />
                            <StepCard
                                number="3"
                                title="Observe (Refinement)"
                                description="The output (a cropped image, a count, or a graph) is fed back into the context. The model 'sees' this new evidence to ground its final answer."
                                icon={Eye}
                            />
                        </div>
                    </div>
                </div>

                {/* Video Showcase */}
                <div className="max-w-7xl mx-auto mb-32">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-bold text-white">Capabilities in Action</h2>
                        <Badge variant="outline" className="text-blue-400 border-blue-400/20">Official Demos</Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={ZoomIn}
                            title="Implicit Zooming"
                            description="Automatically detects when details are too small (like building codes) and writes code to crop and 'zoom in' for better resolution."
                            videoUrl={VIDEOS.zoom}
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={MousePointerClick}
                            title="Visual Annotation"
                            description="Uses a 'visual scratchpad' to verify its work. It draws bounding boxes on objects (like fingers) to ensure counting accuracy."
                            videoUrl={VIDEOS.annotate}
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Calculator}
                            title="Visual Math"
                            description="Extracts raw data from charts or tables and uses Python libraries to plot verified, deterministic graphs."
                            videoUrl={VIDEOS.plot}
                            delay={0.3}
                        />
                    </div>
                </div>

                {/* Technical Deep Dive: Visual Math */}
                <div className="max-w-6xl mx-auto mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-indigo-500/10 rounded-xl">
                            <Layers className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Deep Dive: Visual Math</h2>
                            <p className="text-slate-400 text-sm">A look inside the model's "Thinking Process"</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/30 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Process Logs */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <Terminal className="w-5 h-5 text-blue-400" />
                                        Step 1: The Plan & Execution
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Here we see the model explicitly planning to "normalize prior SOTA to 1.0" and then generating the Python code to perform the calculation.
                                    </p>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="relative group cursor-pointer border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all">
                                                <img
                                                    src="/images/google-agentic/reasoning-logs.png"
                                                    alt="Model Reasoning Logs"
                                                    className="w-full opacity-90 group-hover:opacity-100 transition-opacity"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                                    <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
                                                        <ZoomIn className="w-4 h-4" /> View Logs
                                                    </span>
                                                </div>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl bg-slate-900 border-white/10">
                                            <img src="/images/google-agentic/reasoning-logs.png" alt="Full Reasoning Logs" className="w-full rounded-lg" />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>

                            {/* Final Output */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <ScanEye className="w-5 h-5 text-green-400" />
                                        Step 2: The Observed Output
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-4">
                                        The final Matplotlib chart generated by the code. This isn't a hallucinated image; it's a deterministically rendered plot based on the data.
                                    </p>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="relative group cursor-pointer border border-white/10 rounded-xl overflow-hidden hover:border-green-500/30 transition-all">
                                                <img
                                                    src="/images/google-agentic/plotting-output.png"
                                                    alt="Final Matplotlib Output"
                                                    className="w-full opacity-90 group-hover:opacity-100 transition-opacity"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                                    <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20">
                                                        <ZoomIn className="w-4 h-4" /> View Chart
                                                    </span>
                                                </div>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl bg-slate-900 border-white/10">
                                            <img src="/images/google-agentic/plotting-output.png" alt="Full Chart Output" className="w-full rounded-lg" />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-20 text-center">
                    <Link
                        to="/agentic-ai"
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Agentic AI
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GoogleAgenticVision;
