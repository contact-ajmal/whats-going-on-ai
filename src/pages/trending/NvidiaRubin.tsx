import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, ExternalLink, Cpu,
    Layers, Zap, BarChart3, Server, Gauge,
    Thermometer, CircuitBoard, HardDrive, Network,
    TrendingUp, CheckCircle, XCircle, Play,
    Box, Database, Activity, Sparkles, BookOpen
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ShareButtons from '@/components/ShareButtons';
import { SEO } from '@/components/SEO';

// --- Reusable Components ---

const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-green-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
    <div className={`p-6 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-${color}-500/50 transition-all duration-300 hover:-translate-y-1`}>
        <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-400 w-fit mb-4`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
);

// --- Blackwell vs Rubin Comparison ---

const ArchitectureComparison = () => {
    const specs = [
        {
            category: 'Memory Type',
            blackwell: 'HBM3e',
            rubin: 'HBM4',
            improvement: 'Next-gen',
            icon: HardDrive
        },
        {
            category: 'Memory Capacity',
            blackwell: '192 GB',
            rubin: '288 GB',
            improvement: '+50%',
            icon: Database
        },
        {
            category: 'Memory Bandwidth',
            blackwell: '~8 TB/s',
            rubin: '22 TB/s',
            improvement: '2.8x',
            icon: Activity
        },
        {
            category: 'NVLink Generation',
            blackwell: 'NVLink 5',
            rubin: 'NVLink 6',
            improvement: '2x faster',
            icon: Network
        },
        {
            category: 'NVLink Bandwidth',
            blackwell: '1.8 TB/s',
            rubin: '3.6 TB/s',
            improvement: '2x',
            icon: Gauge
        },
        {
            category: 'AI Inference (NVFP4)',
            blackwell: '10 PFLOPS',
            rubin: '50 PFLOPS',
            improvement: '5x',
            icon: Zap
        },
        {
            category: 'AI Training',
            blackwell: '10 PFLOPS',
            rubin: '35 PFLOPS',
            improvement: '3.5x',
            icon: TrendingUp
        },
        {
            category: 'Process Node',
            blackwell: 'TSMC 4nm',
            rubin: 'TSMC 3nm',
            improvement: 'Smaller',
            icon: CircuitBoard
        },
        {
            category: 'Cooling',
            blackwell: 'Hybrid Air/Liquid',
            rubin: 'Direct Liquid',
            improvement: 'Efficient',
            icon: Thermometer
        },
        {
            category: 'CPU Partner',
            blackwell: 'x86 Host CPUs',
            rubin: 'Vera CPU (Arm)',
            improvement: 'Custom',
            icon: Cpu
        }
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4 text-slate-400 font-medium">Specification</th>
                        <th className="text-center py-4 px-4 text-amber-400 font-bold">Blackwell (2025)</th>
                        <th className="text-center py-4 px-4 text-green-400 font-bold">Rubin (2026)</th>
                        <th className="text-center py-4 px-4 text-slate-400 font-medium">Improvement</th>
                    </tr>
                </thead>
                <tbody>
                    {specs.map((spec, idx) => {
                        const Icon = spec.icon;
                        return (
                            <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4 text-slate-500" />
                                        <span className="text-white font-medium">{spec.category}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center text-amber-400/80 font-mono">{spec.blackwell}</td>
                                <td className="py-3 px-4 text-center text-green-400 font-mono font-bold">{spec.rubin}</td>
                                <td className="py-3 px-4 text-center">
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                        {spec.improvement}
                                    </Badge>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

// --- Vera CPU Details ---

const VeraCPUSection = () => (
    <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-green-400" />
                Vera CPU Specifications
            </h3>
            <div className="space-y-3">
                {[
                    { label: 'Architecture', value: 'Custom Arm (Olympus cores)' },
                    { label: 'Core Count', value: '88 cores' },
                    { label: 'ISA', value: 'Armv9.2 compatible' },
                    { label: 'System Memory', value: '1.5 TB LPDDR5X' },
                    { label: 'Memory Type', value: 'SOCAMM LPDDR5X' },
                    { label: 'Memory Bandwidth', value: '1.2 TB/s' },
                ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white font-mono">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                Designed For Agentic AI
            </h3>
            <p className="text-slate-400 mb-4">
                The Vera CPU is specifically optimized for <strong className="text-white">agentic reasoning</strong> workloads, enabling tight cache coherency with Rubin GPUs.
            </p>
            <div className="space-y-2">
                {[
                    'High-bandwidth CPU-GPU links',
                    'Optimized data movement for agents',
                    'Full cache coherency with Rubin',
                    'Built for MoE model routing'
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-slate-300">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- HBM4 Memory Deep Dive ---

const HBM4Section = () => (
    <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <HardDrive className="w-7 h-7 text-green-400" />
            HBM4 Memory Revolution
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-black/30 rounded-xl">
                <div className="text-4xl font-bold text-green-400 mb-2">288 GB</div>
                <div className="text-sm text-slate-400">Per GPU</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-xl">
                <div className="text-4xl font-bold text-green-400 mb-2">22 TB/s</div>
                <div className="text-sm text-slate-400">Bandwidth</div>
            </div>
            <div className="text-center p-4 bg-black/30 rounded-xl">
                <div className="text-4xl font-bold text-green-400 mb-2">20.7 TB</div>
                <div className="text-sm text-slate-400">Per NVL72 Rack</div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
                <h4 className="font-bold text-white mb-2">Interface Upgrade</h4>
                <p className="text-sm text-slate-400">
                    HBM4 doubles the channel count per stack to <strong className="text-green-400">2048 bits</strong>,
                    running at 6.4 Gbps/pin for massive bandwidth gains.
                </p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
                <h4 className="font-bold text-white mb-2">16-High Stacks</h4>
                <p className="text-sm text-slate-400">
                    Each 16-High HBM4 stack provides <strong className="text-green-400">64 GB</strong> capacity,
                    enabling denser memory configurations.
                </p>
            </div>
        </div>
    </div>
);

// --- Rack Scale System ---

const RackScaleViz = () => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-green-400" />
            Vera Rubin NVL72 Rack-Scale System
        </h3>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
            {[
                { value: '72', label: 'Rubin GPUs', color: 'green' },
                { value: '260 TB/s', label: 'NVLink Bandwidth', color: 'blue' },
                { value: '1.6 PB/s', label: 'HBM4 Bandwidth', color: 'violet' },
                { value: '20.7 TB', label: 'Total HBM4', color: 'amber' },
            ].map((stat, idx) => (
                <div key={idx} className={`text-center p-4 bg-${stat.color}-500/10 border border-${stat.color}-500/30 rounded-xl`}>
                    <div className={`text-2xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
            ))}
        </div>

        <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <p className="text-sm text-slate-300">
                <strong className="text-green-400">First rack-scale Confidential Computing:</strong> The Vera Rubin NVL72
                offers NVIDIA Confidential Computing across CPU, GPU, and NVLink domains—ensuring data security at
                unprecedented scale.
            </p>
        </div>
    </div>
);

// --- Cost & Efficiency Benefits ---

const EfficiencySection = () => {
    const benefits = [
        {
            metric: '10x',
            description: 'Lower cost per inference token vs Blackwell',
            icon: TrendingUp,
            color: 'green'
        },
        {
            metric: '4x',
            description: 'Fewer GPUs needed for MoE training',
            icon: Server,
            color: 'blue'
        },
        {
            metric: '5x',
            description: 'Better performance per TCO dollar',
            icon: BarChart3,
            color: 'violet'
        },
        {
            metric: '5x',
            description: 'Power efficiency improvement',
            icon: Zap,
            color: 'amber'
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                    <div key={idx} className={`p-5 rounded-xl border border-${benefit.color}-500/30 bg-${benefit.color}-500/5 text-center`}>
                        <Icon className={`w-8 h-8 text-${benefit.color}-400 mx-auto mb-3`} />
                        <div className={`text-3xl font-bold text-${benefit.color}-400 mb-2`}>{benefit.metric}</div>
                        <p className="text-sm text-slate-400">{benefit.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

// --- YouTube Video Embed ---

const VideoSection = () => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-red-500" />
            Watch: NVIDIA GTC 2025 - Rubin Architecture Deep Dive
        </h3>
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/k9r19tJxVLU"
                title="NVIDIA GTC 2025 Keynote"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
        <p className="text-sm text-slate-500 mt-3 text-center">
            Jensen Huang's GTC 2025 Keynote covering Blackwell Ultra, Rubin, and the $50T AI future
        </p>
    </div>
);

// --- Main Component ---

export default function NvidiaRubin() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="NVIDIA Rubin Architecture: The 2026 AI Supercomputer Platform"
                description="Deep dive into NVIDIA's Rubin architecture (2026): HBM4 memory (288GB, 22TB/s), Vera CPU with 88 Olympus cores, NVLink 6, and 50 PFLOPS AI inference—compared to Blackwell."
                url="/trending/nvidia-rubin"
                type="article"
            />
            <Navigation />
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Cpu size={400} className="text-green-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <Link to="/trending" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-green-400 border-green-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            🚀 Coming H2 2026 • Next-Gen AI Platform
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500">
                                NVIDIA Rubin
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            The next-generation AI supercomputer platform with <strong className="text-white">HBM4 memory</strong>,
                            <strong className="text-white">Vera CPU</strong>, and <strong className="text-white">5x performance</strong> over Blackwell.
                        </p>
                        <div className="flex justify-center">
                            <ShareButtons title="NVIDIA Rubin Architecture: The 2026 AI Supercomputer Platform" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-3 gap-6 mb-16"
                >
                    <FeatureCard
                        icon={HardDrive}
                        title="HBM4 Memory"
                        description="288GB capacity per GPU with 22 TB/s bandwidth—2.8x faster than Blackwell's HBM3e."
                        color="green"
                    />
                    <FeatureCard
                        icon={Cpu}
                        title="Vera CPU"
                        description="88 custom Olympus cores with Arm architecture, designed for agentic AI reasoning."
                        color="violet"
                    />
                    <FeatureCard
                        icon={Zap}
                        title="50 PFLOPS"
                        description="NVFP4 inference performance—5x improvement over Blackwell for AI workloads."
                        color="amber"
                    />
                </motion.div>

                {/* Architecture Diagram */}
                <Section title="1. Architecture Overview">
                    <p className="text-lg text-slate-400 mb-6">
                        The user-provided diagram below illustrates the structural evolution from the Blackwell B200 system (2025)
                        to the future Rubin R-Series system (2026+):
                    </p>
                    <div className="rounded-xl overflow-hidden border border-white/10 mb-6">
                        <img
                            src="/rubin-vs-blackwell.jpg"
                            alt="NVIDIA Blackwell vs Rubin Architecture Comparison"
                            className="w-full"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                            <h4 className="font-bold text-amber-400 mb-2">Blackwell NVL72 (2025)</h4>
                            <ul className="text-sm text-slate-400 space-y-1">
                                <li>• B200 GPU Modules with HBM3e</li>
                                <li>• NVLink 5 Switch Trays</li>
                                <li>• x86 Host CPUs (Intel Xeon)</li>
                                <li>• PCIe Gen 6 interconnect</li>
                                <li>• Air + Liquid Assist Hybrid cooling</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <h4 className="font-bold text-green-400 mb-2">Rubin NVL72 (2026+)</h4>
                            <ul className="text-sm text-slate-400 space-y-1">
                                <li>• Vera Rubin Superchip Module</li>
                                <li>• HBM4 Memory (16-Hi, 22 TB/s)</li>
                                <li>• Vera CPU (Custom Arm)</li>
                                <li>• NVLink 6 Copper Spines</li>
                                <li>• Integrated Direct Liquid Cooling</li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* Video Section */}
                <Section title="2. Watch the Keynote">
                    <VideoSection />
                </Section>

                {/* Detailed Comparison Table */}
                <Section title="3. Blackwell vs Rubin: Full Comparison">
                    <p className="text-lg text-slate-400 mb-6">
                        A comprehensive specification comparison between the current Blackwell architecture and the upcoming Rubin platform:
                    </p>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
                        <ArchitectureComparison />
                    </div>
                </Section>

                {/* HBM4 Deep Dive */}
                <Section title="4. HBM4 Memory Deep Dive">
                    <HBM4Section />
                </Section>

                {/* Vera CPU */}
                <Section title="5. The Vera CPU">
                    <p className="text-lg text-slate-400 mb-6">
                        For the first time, NVIDIA is pairing its GPUs with a <strong className="text-white">custom-designed CPU</strong>—the Vera processor with 88 Olympus cores.
                    </p>
                    <VeraCPUSection />
                </Section>

                {/* Rack Scale */}
                <Section title="6. Rack-Scale Integration">
                    <RackScaleViz />
                </Section>

                {/* Efficiency */}
                <Section title="7. Cost & Efficiency Benefits">
                    <p className="text-lg text-slate-400 mb-6">
                        Rubin delivers massive improvements in <strong className="text-white">total cost of ownership</strong> and <strong className="text-white">power efficiency</strong>:
                    </p>
                    <EfficiencySection />
                </Section>

                {/* Availability */}
                <Section title="8. Availability">
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
                        <p className="text-lg text-slate-300 mb-4">
                            Rubin-based systems will be available from major cloud providers in <strong className="text-green-400">H2 2026</strong>:
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {['Microsoft Azure', 'Google Cloud', 'AWS', 'Oracle Cloud', 'CoreWeave'].map((provider, idx) => (
                                <Badge key={idx} variant="outline" className="text-slate-300 border-slate-600">
                                    {provider}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 mt-4">
                            <strong>Rubin Ultra</strong> (2027) is expected to double performance to 100 PFLOPS.
                        </p>
                    </div>
                </Section>

                {/* Resources */}
                <Section title="9. Resources">
                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://www.nvidia.com/en-us/data-center/vera-rubin/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-green-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <BookOpen className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-green-400 transition-colors">NVIDIA Official</h4>
                                <p className="text-xs text-slate-500">Vera Rubin Platform Page</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-green-400" />
                        </a>
                        <a
                            href="https://www.youtube.com/watch?v=k9r19tJxVLU"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-red-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <Play className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">GTC 2025 Keynote</h4>
                                <p className="text-xs text-slate-500">Full Jensen Huang presentation</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-red-400" />
                        </a>
                    </div>
                </Section>

                {/* Key Takeaway */}
                <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl p-8 text-center mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4">The Bottom Line</h3>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        <strong className="text-green-400">NVIDIA Rubin</strong> represents a generational leap: HBM4 memory, a custom Arm CPU,
                        and 5x performance gains—all designed from the ground up for <strong className="text-white">agentic AI</strong> and
                        <strong className="text-white">Mixture-of-Experts models</strong>.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center pt-12 border-t border-white/10 mt-12">
                    <Link to="/trending">
                        <Button variant="outline" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Trending AI Tech
                        </Button>
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}
