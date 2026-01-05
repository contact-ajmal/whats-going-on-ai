import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ExternalLink, Brain,
    Layers, CheckCircle, Target, Lightbulb,
    Cpu, BookOpen, Zap, Activity, BarChart3,
    Waves, GitBranch, Shield, Eye, Sparkles,
    TrendingUp, AlertTriangle, Binary, Grid3X3
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
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-cyan-500 inline-block pb-2">
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

// --- Spectral Metrics Visualization ---

const SpectralMetricsViz = () => {
    const [activeMetric, setActiveMetric] = useState<number>(0);

    const metrics = [
        {
            id: 'fiedler',
            name: 'Fiedler Value',
            fullName: 'Algebraic Connectivity',
            icon: GitBranch,
            color: 'cyan',
            description: 'Measures how connected the attention graph is. Higher values indicate more coherent reasoning with stronger token relationships.',
            interpretation: 'Valid proofs show higher connectivity'
        },
        {
            id: 'hfer',
            name: 'HFER',
            fullName: 'High-Frequency Energy Ratio',
            icon: Waves,
            color: 'violet',
            description: 'Captures rapid oscillations in attention patterns. Invalid reasoning shows more chaotic, high-frequency signals.',
            interpretation: 'Lower HFER = more structured reasoning'
        },
        {
            id: 'smoothness',
            name: 'Smoothness',
            fullName: 'Graph Signal Smoothness',
            icon: Activity,
            color: 'emerald',
            description: 'Measures how gradually attention values change between connected tokens. Smooth signals indicate logical flow.',
            interpretation: 'Key metric for Sliding Window Attention'
        },
        {
            id: 'entropy',
            name: 'Spectral Entropy',
            fullName: 'Eigenvalue Distribution Entropy',
            icon: Grid3X3,
            color: 'amber',
            description: 'Quantifies the complexity of the attention structure. Balanced entropy suggests organized reasoning patterns.',
            interpretation: 'Distinguishes reasoning complexity'
        }
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                The Four Spectral Diagnostics
            </h3>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    const isActive = activeMetric === index;
                    return (
                        <motion.button
                            key={metric.id}
                            onClick={() => setActiveMetric(index)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${isActive
                                ? `bg-${metric.color}-500/20 border-${metric.color}-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]`
                                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? `text-${metric.color}-400` : 'text-slate-400'}`} />
                            <span className={`text-xs font-bold text-center ${isActive ? `text-${metric.color}-400` : 'text-slate-500'}`}>
                                {metric.name}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Detail Box */}
            <motion.div
                key={activeMetric}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-black/40 p-6 rounded-lg border border-${metrics[activeMetric].color}-500/30`}
            >
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-${metrics[activeMetric].color}-500/20`}>
                        {React.createElement(metrics[activeMetric].icon, {
                            className: `w-6 h-6 text-${metrics[activeMetric].color}-400`
                        })}
                    </div>
                    <div className="flex-1">
                        <h4 className={`text-xl font-bold text-${metrics[activeMetric].color}-400 mb-1`}>
                            {metrics[activeMetric].fullName}
                        </h4>
                        <p className="text-slate-300 mb-3">{metrics[activeMetric].description}</p>
                        <div className="flex items-center gap-2 text-sm">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400/80">{metrics[activeMetric].interpretation}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- Attention as Graph Visualization ---

const AttentionGraphViz = () => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-400" />
            Attention Matrices as Dynamic Graphs
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
            {/* Left: Attention Matrix */}
            <div className="text-center">
                <div className="bg-black/40 p-4 rounded-lg border border-slate-700 mb-3">
                    <div className="grid grid-cols-5 gap-1 max-w-[200px] mx-auto">
                        {[...Array(25)].map((_, i) => {
                            const intensity = Math.random();
                            return (
                                <div
                                    key={i}
                                    className="aspect-square rounded-sm"
                                    style={{
                                        backgroundColor: `rgba(6, 182, 212, ${intensity * 0.8 + 0.1})`
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
                <p className="text-sm text-slate-400">Attention Matrix</p>
                <p className="text-xs text-slate-500">Token × Token weights</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Spectral Analysis</span>
                </div>
            </div>
        </div>

        <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
            <p className="text-sm text-slate-300">
                <strong className="text-cyan-400">Key Insight:</strong> Treating attention matrices as adjacency matrices of graphs reveals geometric structure. The eigenvalues of the graph Laplacian encode information about reasoning validity that's invisible to traditional methods.
            </p>
        </div>
    </div>
);

// --- Model Performance Grid ---

const ModelPerformance = () => {
    const models = [
        { name: 'Llama 3.1 8B', family: 'Meta', accuracy: '95.6%', effectSize: 'd = 3.30' },
        { name: 'Qwen 2.5 7B', family: 'Alibaba', accuracy: '93.2%', effectSize: 'd = 2.85' },
        { name: 'Phi-3 Mini', family: 'Microsoft', accuracy: '91.4%', effectSize: 'd = 2.41' },
        { name: 'Mistral 7B', family: 'Mistral AI', accuracy: '85.0%', effectSize: 'd = 2.09' },
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Cross-Architecture Performance
            </h3>
            <div className="space-y-3">
                {models.map((model, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/5">
                        <div>
                            <span className="font-bold text-white">{model.name}</span>
                            <span className="text-xs text-slate-500 ml-2">({model.family})</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-cyan-400 font-mono font-bold">{model.accuracy}</span>
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                {model.effectSize}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 text-center">
                Effect sizes (Cohen's d) show strong separation between valid and invalid proofs
            </p>
        </div>
    );
};

// --- Safety Applications ---

const SafetyApplications = () => {
    const apps = [
        {
            icon: AlertTriangle,
            title: 'Hallucination Detection',
            description: 'Identify when models generate plausible-sounding but logically invalid reasoning.',
            color: 'amber'
        },
        {
            icon: Shield,
            title: 'AI Safety Monitoring',
            description: 'Real-time verification of reasoning validity without expensive test-time compute.',
            color: 'emerald'
        },
        {
            icon: Binary,
            title: 'Proof Verification',
            description: 'Detect mathematically valid proofs even when formal verifiers reject them due to technical issues.',
            color: 'violet'
        }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {apps.map((app, idx) => {
                const Icon = app.icon;
                return (
                    <div key={idx} className={`p-5 rounded-xl border border-${app.color}-500/30 bg-${app.color}-500/5`}>
                        <Icon className={`w-6 h-6 text-${app.color}-400 mb-3`} />
                        <h4 className="font-bold text-white mb-2">{app.title}</h4>
                        <p className="text-sm text-slate-400">{app.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

// --- Main Component ---

export default function GeometryOfReason() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="Geometry of Reason: Spectral Signatures of Valid Mathematical Reasoning"
                description="A training-free method to detect valid mathematical reasoning through spectral analysis of attention patterns. 85-95% accuracy using graph-theoretic metrics."
                url="/trending/geometry-of-reason"
                type="article"
            />
            <Navigation />
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Waves size={400} className="text-cyan-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <Link to="/trending" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-cyan-400 border-cyan-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            📐 arXiv:2601.00791 • Interpretability
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
                                Geometry of Reason
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            Detecting valid mathematical reasoning through <strong className="text-white">spectral analysis</strong> of attention patterns—no training required.
                        </p>
                        <div className="flex justify-center">
                            <ShareButtons title="Geometry of Reason: Spectral Signatures of Valid Mathematical Reasoning" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 pb-24 relative z-20">

                {/* Intro Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid md:grid-cols-3 gap-6 mb-16"
                >
                    <FeatureCard
                        icon={Zap}
                        title="Training-Free"
                        description="No fine-tuning, no classifiers. A single threshold on a spectral metric achieves 85-95% accuracy."
                        color="cyan"
                    />
                    <FeatureCard
                        icon={BarChart3}
                        title="4 Spectral Metrics"
                        description="Fiedler value, HFER, smoothness, and spectral entropy reveal reasoning validity geometrically."
                        color="violet"
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Safety Applications"
                        description="Immediate use for hallucination detection and AI safety monitoring in production systems."
                        color="emerald"
                    />
                </motion.div>

                {/* Section 1: The Insight */}
                <Section title="1. The Core Insight">
                    <div className="space-y-6 text-lg text-slate-400">
                        <p>
                            What if we could <strong className="text-white">see</strong> whether an LLM is reasoning correctly—just by looking at its attention patterns?
                        </p>

                        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-400" />
                                Key Discovery
                            </h4>
                            <p className="text-sm">
                                By treating attention matrices as <strong className="text-cyan-400">adjacency matrices of graphs</strong>, we can extract spectral features that show statistically significant differences between valid and invalid mathematical proofs—with effect sizes up to <strong className="text-white">Cohen's d = 3.30</strong>.
                            </p>
                        </div>

                        <AttentionGraphViz />
                    </div>
                </Section>

                {/* Section 2: The Metrics */}
                <Section title="2. The Spectral Diagnostics">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Four interpretable metrics capture the geometric structure of valid reasoning:
                        </p>
                        <SpectralMetricsViz />
                    </div>
                </Section>

                {/* Section 3: Results */}
                <Section title="3. Cross-Architecture Results">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            The method works across <strong className="text-white">seven models from four independent architectural families</strong>, demonstrating that spectral signatures of reasoning are universal.
                        </p>
                        <ModelPerformance />

                        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-violet-400" />
                                Architectural Insight
                            </h4>
                            <p className="text-sm text-slate-300">
                                <strong className="text-violet-400">Mistral-7B's Sliding Window Attention</strong> shifts the discriminative signal from HFER to late-layer Smoothness. This reveals that attention mechanism design affects which spectral features capture reasoning validity.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 4: Beyond Compilers */}
                <Section title="4. Detecting Logical Coherence, Not Compiler Acceptance">
                    <div className="space-y-6 text-lg text-slate-400">
                        <p>
                            A surprising finding: the spectral method identifies <strong className="text-white">mathematically valid proofs that formal verifiers reject</strong> due to technical failures.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Binary className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-bold text-red-400">Formal Verifier</span>
                                </div>
                                <p className="text-xs text-slate-400">Rejects valid proofs with syntax/import errors</p>
                            </div>
                            <div className="p-4 border border-cyan-500/30 rounded-lg bg-cyan-500/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Waves className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm font-bold text-cyan-400">Spectral Analysis</span>
                                </div>
                                <p className="text-xs text-slate-400">Detects underlying logical coherence</p>
                            </div>
                        </div>

                        <p>
                            This makes spectral analysis a <strong className="text-cyan-400">complementary tool</strong> to formal verification, catching valid reasoning that pure syntax checking misses.
                        </p>
                    </div>
                </Section>

                {/* Section 5: Applications */}
                <Section title="5. Immediate Applications">
                    <p className="text-lg text-slate-400 mb-6">
                        The training-free nature and interpretability make this method ready for production:
                    </p>
                    <SafetyApplications />
                </Section>

                {/* Section 6: Resources */}
                <Section title="6. Resources">
                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://arxiv.org/abs/2601.00791"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <BookOpen className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">Read the Paper</h4>
                                <p className="text-xs text-slate-500">arXiv:2601.00791v1</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-cyan-400" />
                        </a>
                        <a
                            href="https://arxiv.org/pdf/2601.00791"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-violet-500/50 transition-all group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg">
                                <Layers className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-violet-400 transition-colors">Download PDF</h4>
                                <p className="text-xs text-slate-500">Full paper with proofs</p>
                            </div>
                            <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-violet-400" />
                        </a>
                    </div>
                </Section>

                {/* Key Takeaway */}
                <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center mt-12">
                    <h3 className="text-2xl font-bold text-white mb-4">The Bottom Line</h3>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Valid mathematical reasoning leaves a <strong className="text-cyan-400">geometric fingerprint</strong> in attention patterns. Spectral analysis can detect it without training—opening new doors for interpretability, safety monitoring, and hallucination detection.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center pt-12 border-t border-white/10 mt-12">
                    <Link to="/trending">
                        <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
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
