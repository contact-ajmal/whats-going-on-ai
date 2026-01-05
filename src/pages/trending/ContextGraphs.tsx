import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, Database, Zap,
    ExternalLink, GitBranch, Network, Brain,
    Layers, Search, History, Users, Building2,
    Workflow, FileSearch, MessageSquare, CheckCircle,
    AlertTriangle, Target, TrendingUp, Lightbulb,
    RefreshCw, Eye, EyeOff, Slack, Mail, Phone,
    DollarSign, Award, ArrowDown, ChevronRight
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';

// --- Reusable Components ---

const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-purple-500 inline-block pb-2">
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

// --- Interactive Demo: Decision Trace Flow ---

const DecisionTraceDemo = () => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Agent Receives Request",
            desc: "Renewal agent asked: 'Should we give Customer X a 20% discount?'",
            systems: ["CRM", "PagerDuty", "Zendesk"],
            color: "blue"
        },
        {
            title: "Cross-System Context Gathered",
            desc: "Agent pulls: 3 SEV-1 incidents, open escalation, prior renewal thread",
            systems: ["CRM ✓", "PagerDuty ✓", "Zendesk ✓"],
            color: "purple"
        },
        {
            title: "Policy Evaluated",
            desc: "Policy caps at 10%. Agent finds precedent: VP exception last quarter",
            systems: ["Policy Engine", "Precedent Search"],
            color: "orange"
        },
        {
            title: "Decision Trace Captured",
            desc: "Full context persisted: inputs, policy, exception, approver, rationale",
            systems: ["Context Graph ✓"],
            color: "green"
        }
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-purple-400" />
                How a Decision Trace is Captured
            </h3>

            <div className="flex gap-2 mb-8 justify-center flex-wrap">
                {steps.map((s, idx) => (
                    <button
                        key={idx}
                        onClick={() => setStep(idx)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${step === idx
                            ? 'bg-purple-500/20 border-2 border-purple-500 text-purple-300'
                            : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                            }`}
                    >
                        Step {idx + 1}
                    </button>
                ))}
            </div>

            <div className="bg-black/40 p-6 rounded-lg border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full bg-${steps[step].color}-500/20`}>
                        <Target className={`w-5 h-5 text-${steps[step].color}-400`} />
                    </div>
                    <h4 className="text-lg font-bold text-white">{steps[step].title}</h4>
                </div>
                <p className="text-slate-300 mb-4">{steps[step].desc}</p>
                <div className="flex flex-wrap gap-2">
                    {steps[step].systems.map((sys, idx) => (
                        <Badge key={idx} variant="outline" className="border-purple-500/30 text-purple-300">
                            {sys}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(Math.max(0, step - 1))}
                    disabled={step === 0}
                    className="text-slate-400"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Previous
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                    disabled={step === steps.length - 1}
                    className="text-slate-400"
                >
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    );
};

// --- Context Graph Visualization ---

const ContextGraphViz = () => {
    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-400" />
                The Context Graph Structure
            </h3>

            <div className="relative">
                {/* Central Node */}
                <div className="flex justify-center mb-8">
                    <div className="bg-purple-500/20 border-2 border-purple-500 rounded-full p-4 text-center">
                        <Database className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <span className="text-sm font-bold text-white">Decision Event</span>
                    </div>
                </div>

                {/* Connected Nodes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                        <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <span className="text-xs font-medium text-white">Accounts</span>
                        <p className="text-[10px] text-slate-500 mt-1">Customer entities</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                        <FileSearch className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <span className="text-xs font-medium text-white">Policies</span>
                        <p className="text-[10px] text-slate-500 mt-1">Rules applied</p>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 text-center">
                        <History className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                        <span className="text-xs font-medium text-white">Precedents</span>
                        <p className="text-[10px] text-slate-500 mt-1">Past decisions</p>
                    </div>
                    <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4 text-center">
                        <MessageSquare className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                        <span className="text-xs font-medium text-white">Approvals</span>
                        <p className="text-[10px] text-slate-500 mt-1">Who authorized</p>
                    </div>
                </div>

                {/* Connection Lines (simplified) */}
                <div className="absolute top-[72px] left-1/2 w-px h-8 bg-gradient-to-b from-purple-500 to-transparent -translate-x-1/2" />
            </div>

            <p className="text-sm text-slate-400 text-center mt-6">
                Each decision event links to entities, policies, precedents, and approvals—creating a queryable record of <strong className="text-white">how</strong> and <strong className="text-white">why</strong> things happened.
            </p>
        </div>
    );
};

// --- NEW: Tribal Knowledge Visualization ---

const TribalKnowledgeViz = () => {
    const [showHidden, setShowHidden] = useState(false);

    const knowledgeSources = [
        { icon: Slack, label: "Slack threads", color: "purple", hidden: true },
        { icon: Phone, label: "Zoom calls", color: "blue", hidden: true },
        { icon: Brain, label: "People's heads", color: "pink", hidden: true },
        { icon: Mail, label: "Email chains", color: "orange", hidden: true },
    ];

    const capturedSources = [
        { icon: Database, label: "CRM", color: "green", hidden: false },
        { icon: FileSearch, label: "ERP", color: "cyan", hidden: false },
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <EyeOff className="w-5 h-5 text-red-400" />
                    Where Decision Knowledge Lives Today
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHidden(!showHidden)}
                    className="text-xs border-purple-500/30 text-purple-400"
                >
                    {showHidden ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                    {showHidden ? "Show Captured" : "Reveal Hidden"}
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Captured sources */}
                {!showHidden && capturedSources.map((source, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-4 rounded-lg border border-${source.color}-500/30 bg-${source.color}-500/10 text-center`}
                    >
                        <source.icon className={`w-8 h-8 text-${source.color}-400 mx-auto mb-2`} />
                        <span className="text-sm text-white font-medium">{source.label}</span>
                        <Badge className="mt-2 bg-green-500/20 text-green-400 text-[10px]">Captured</Badge>
                    </motion.div>
                ))}

                {/* Hidden sources */}
                {showHidden && knowledgeSources.map((source, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-4 rounded-lg border-2 border-dashed border-red-500/50 bg-red-500/5 text-center relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.05)_10px,rgba(239,68,68,0.05)_20px)]" />
                        <source.icon className={`w-8 h-8 text-${source.color}-400 mx-auto mb-2 relative z-10`} />
                        <span className="text-sm text-white font-medium relative z-10">{source.label}</span>
                        <Badge className="mt-2 bg-red-500/20 text-red-400 text-[10px] relative z-10">Never Captured</Badge>
                    </motion.div>
                ))}
            </div>

            <p className="text-sm text-slate-500 text-center mt-6">
                {showHidden
                    ? "👆 This tribal knowledge disappears after every decision. Context graphs capture it."
                    : "Click \"Reveal Hidden\" to see where 80% of decision context actually lives."
                }
            </p>
        </div>
    );
};

// --- NEW: Compound Learning Loop ---

const CompoundLoopViz = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { label: "Capture", desc: "Agent records decision trace", icon: Database, color: "purple" },
        { label: "Search", desc: "Find similar past decisions", icon: Search, color: "blue" },
        { label: "Automate", desc: "Apply precedent automatically", icon: Zap, color: "green" },
        { label: "Grow", desc: "More traces = smarter system", icon: TrendingUp, color: "orange" },
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
                The Compound Learning Flywheel
            </h3>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                {steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <motion.div
                            animate={{
                                scale: activeStep === idx ? 1.15 : 1,
                                opacity: activeStep === idx ? 1 : 0.5,
                            }}
                            className={`flex flex-col items-center p-4 rounded-xl transition-all ${activeStep === idx
                                ? `bg-${step.color}-500/20 border-2 border-${step.color}-500 shadow-lg shadow-${step.color}-500/20`
                                : 'bg-slate-800/50 border border-slate-700'
                                }`}
                        >
                            <step.icon className={`w-8 h-8 text-${step.color}-400 mb-2`} />
                            <span className="font-bold text-white text-sm">{step.label}</span>
                            <span className="text-[10px] text-slate-500 text-center mt-1 max-w-[80px]">{step.desc}</span>
                        </motion.div>
                        {idx < steps.length - 1 && (
                            <ChevronRight className={`w-5 h-5 ${activeStep === idx ? 'text-white' : 'text-slate-600'}`} />
                        )}
                    </React.Fragment>
                ))}
                <ChevronRight className={`w-5 h-5 ${activeStep === steps.length - 1 ? 'text-white' : 'text-slate-600'} rotate-180`} />
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-sm text-slate-300 text-center">
                    <strong className="text-green-400">The Moat:</strong> Every decision makes the next one smarter.
                    Incumbents can't catch up because they're not in the execution path.
                </p>
            </div>
        </div>
    );
};

// --- NEW: Before/After Comparison ---

const BeforeAfterComparison = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Before: CRM View */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <EyeOff className="w-5 h-5 text-red-400" />
                    <h4 className="font-bold text-red-400">What CRM Shows</h4>
                </div>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                    <div className="text-slate-500 mb-2">// Opportunity Record</div>
                    <div><span className="text-blue-400">Deal:</span> <span className="text-white">Acme Corp Renewal</span></div>
                    <div><span className="text-blue-400">Discount:</span> <span className="text-green-400">20%</span></div>
                    <div><span className="text-blue-400">Status:</span> <span className="text-yellow-400">Closed Won</span></div>
                    <div className="mt-4 text-slate-600 italic">// That's it. Just the final state.</div>
                </div>
                <p className="text-xs text-slate-500 mt-4">No trace of why 20% was approved when policy caps at 10%.</p>
            </div>

            {/* After: Context Graph View */}
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Eye className="w-5 h-5 text-green-400" />
                    <h4 className="font-bold text-green-400">What Context Graph Shows</h4>
                </div>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs space-y-2">
                    <div className="text-slate-500">// Decision Trace #4521</div>
                    <div><span className="text-purple-400">context.crm:</span> ARR $2.1M, 3yr customer</div>
                    <div><span className="text-purple-400">context.pagerduty:</span> 3 SEV-1 incidents</div>
                    <div><span className="text-purple-400">context.zendesk:</span> Open escalation</div>
                    <div><span className="text-purple-400">policy:</span> Max 10% unless exception</div>
                    <div><span className="text-purple-400">precedent:</span> VP approved similar Q3</div>
                    <div><span className="text-purple-400">approver:</span> @jsmith (Finance)</div>
                    <div><span className="text-purple-400">rationale:</span> "Churn risk + history"</div>
                </div>
                <p className="text-xs text-slate-500 mt-4">Full audit trail. Searchable. Replayable.</p>
            </div>
        </div>
    );
};

// --- NEW: Two Clocks Visualization ---

const TwoClocksViz = () => {
    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                The Two Clocks Problem
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                {/* State Clock */}
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Database className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-blue-400">State Clock</h4>
                            <p className="text-xs text-slate-500">What's true now</p>
                        </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 font-mono text-xs mb-3">
                        <div className="text-slate-500">// Current config</div>
                        <div><span className="text-blue-400">timeout</span> = <span className="text-green-400">30s</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500/20 text-blue-400 text-[10px]">$100T+ Infrastructure</Badge>
                    </div>
                </div>

                {/* Event Clock */}
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <History className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-400">Event Clock</h4>
                            <p className="text-xs text-slate-500">What happened & why</p>
                        </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 font-mono text-xs mb-3 space-y-1">
                        <div className="text-slate-500">// Decision trace</div>
                        <div><span className="text-purple-400">was</span>: 5s → <span className="text-purple-400">now</span>: 30s</div>
                        <div><span className="text-purple-400">who</span>: @sarah</div>
                        <div><span className="text-purple-400">why</span>: "SEV-1 timeout cascade"</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-red-500/20 text-red-400 text-[10px]">Barely Exists</Badge>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-sm text-slate-300 text-center">
                    <strong className="text-cyan-400">"The git blame shows who. The reasoning is gone."</strong>
                    <span className="text-slate-500 block mt-1">— The config file says timeout=30s. It used to say timeout=5s. Someone tripled it. Why?</span>
                </p>
            </div>
        </div>
    );
};

// --- NEW: Three Layers Model ---

const ThreeLayersViz = () => {
    const [activeLayer, setActiveLayer] = useState<'content' | 'entities' | 'facts'>('content');

    const layers = {
        content: {
            title: "Content Layer",
            subtitle: "The State Clock",
            desc: "Immutable source documents. Never edited, merged, or deleted. The canonical evidence trail.",
            icon: FileSearch,
            color: "blue",
            example: '"Paula works at Microsoft as Principal Engineer" — Email from March 15, 2024'
        },
        entities: {
            title: "Entity Layer",
            subtitle: "Identity Resolution",
            desc: "Who and what content mentions. 'Sarah Chen', 'S. Chen', and '@sarah' are the same person.",
            icon: Users,
            color: "orange",
            example: 'Paula Chen → Person | Microsoft → Organization | Principal Engineer → Role'
        },
        facts: {
            title: "Facts Layer",
            subtitle: "The Event Clock",
            desc: "Temporal claims about the world. Not just 'Paula works at X' but 'Paula started at X on March 15th'.",
            icon: Database,
            color: "purple",
            example: 'validAt: 2024-03-15 | invalidAt: null | status: Canonical'
        }
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-400" />
                Three Layers, Not Two
            </h3>

            {/* Layer Selector */}
            <div className="flex gap-2 mb-6 justify-center">
                {(['content', 'entities', 'facts'] as const).map((layer) => (
                    <button
                        key={layer}
                        onClick={() => setActiveLayer(layer)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeLayer === layer
                            ? `bg-${layers[layer].color}-500/20 border-2 border-${layers[layer].color}-500 text-${layers[layer].color}-300`
                            : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                            }`}
                    >
                        {layers[layer].title}
                    </button>
                ))}
            </div>

            {/* Active Layer Detail */}
            <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-${layers[activeLayer].color}-500/5 border border-${layers[activeLayer].color}-500/20 rounded-xl p-6`}
            >
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-${layers[activeLayer].color}-500/20`}>
                        {React.createElement(layers[activeLayer].icon, {
                            className: `w-8 h-8 text-${layers[activeLayer].color}-400`
                        })}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h4 className={`text-xl font-bold text-${layers[activeLayer].color}-400`}>
                                {layers[activeLayer].title}
                            </h4>
                            <Badge variant="outline" className={`border-${layers[activeLayer].color}-500/30 text-${layers[activeLayer].color}-300 text-xs`}>
                                {layers[activeLayer].subtitle}
                            </Badge>
                        </div>
                        <p className="text-slate-400 mb-4">{layers[activeLayer].desc}</p>
                        <div className="bg-black/30 rounded-lg p-3 font-mono text-xs text-slate-300">
                            {layers[activeLayer].example}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Progression Arrow */}
            <div className="flex items-center justify-center gap-2 mt-6 text-slate-500">
                <span className="text-xs">Raw Evidence</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs">+ Identity</span>
                <ArrowRight className="w-4 h-4" />
                <span className="text-xs">+ Temporality</span>
            </div>
        </div>
    );
};

// --- NEW: Facts as First-Class Data ---

const FactsDataViz = () => {
    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-400" />
                Facts as First-Class Data
            </h3>

            <div className="bg-black/30 rounded-xl p-5 font-mono text-sm mb-6">
                <div className="text-slate-500 mb-3">// Fact Object Structure</div>
                <div className="space-y-2">
                    <div><span className="text-purple-400">text:</span> <span className="text-green-300">"Paula works at Microsoft as Principal Engineer"</span></div>
                    <div><span className="text-purple-400">validAt:</span> <span className="text-cyan-300">2024-03-15</span></div>
                    <div><span className="text-purple-400">invalidAt:</span> <span className="text-slate-500">null</span> <span className="text-slate-600">// still current</span></div>
                    <div><span className="text-purple-400">status:</span> <span className="text-yellow-300">"Canonical"</span></div>
                    <div><span className="text-purple-400">mentions:</span> [<span className="text-orange-300">Paula→Person</span>, <span className="text-orange-300">Microsoft→Org</span>]</div>
                    <div><span className="text-purple-400">source:</span> <span className="text-blue-300">email_2024_03_15.eml</span></div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-bold text-green-400 mb-2 text-sm">Query: Current Employer</h4>
                    <code className="text-xs text-slate-400 block">WHERE invalidAt IS NULL</code>
                    <p className="text-xs text-slate-500 mt-2">No LLM guesswork. Just data.</p>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-bold text-blue-400 mb-2 text-sm">Query: Employer in 2022</h4>
                    <code className="text-xs text-slate-400 block">WHERE validAt &lt;= 2022 AND invalidAt &gt; 2022</code>
                    <p className="text-xs text-slate-500 mt-2">Time-travel queries on the event clock.</p>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function ContextGraphsDeepDive() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
            <SEO
                title="Context Graphs: AI's Trillion-Dollar Opportunity"
                description="The missing layer that captures WHY decisions were made. From Foundation Capital's viral thesis on decision traces, the event clock, and building the next generation of enterprise AI."
                url="/trending/context-graphs"
                type="article"
            />
            <Navigation />
            <NeuralBackground />

            {/* Hero Header */}
            <header className="pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Network size={400} className="text-purple-500" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Breadcrumb */}
                    <Link to="/trending" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>

                    <div className="text-center">
                        <Badge variant="outline" className="mb-6 text-purple-400 border-purple-400/30 py-1.5 px-4 text-sm backdrop-blur-md animate-pulse">
                            🔥 Viral on X • Foundation Capital
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600">
                                Context Graphs
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
                            The missing layer that captures <strong className="text-white">why</strong> decisions were made—not just what happened.
                            This is AI's <strong className="text-purple-400">trillion-dollar opportunity</strong>.
                        </p>

                        {/* Viral Quote */}
                        <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                            <p className="text-lg italic text-slate-300 mb-4">
                                "The last generation built trillion-dollar platforms by owning <span className="text-white font-semibold">what happened</span>.
                                The next generation will own <span className="text-purple-400 font-semibold">why it happened</span>."
                            </p>
                            <p className="text-sm text-slate-500">— Jaya Gupta & Ashu Garg, Foundation Capital</p>
                        </div>

                        {/* Stats Banner */}
                        <div className="flex flex-wrap justify-center gap-8 mt-10">
                            <div className="text-center">
                                <div className="text-4xl font-black text-white">$100T+</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Built on "What"</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-purple-400">$0</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Built on "Why"</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-black text-green-400">∞</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">Opportunity</div>
                            </div>
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
                        icon={GitBranch}
                        title="Decision Traces"
                        description="Capture the full context at decision time: inputs, policies, exceptions, and approvals."
                        color="purple"
                    />
                    <FeatureCard
                        icon={Search}
                        title="Searchable Precedent"
                        description="Turn past decisions into queryable knowledge. Never re-learn the same edge case."
                        color="blue"
                    />
                    <FeatureCard
                        icon={TrendingUp}
                        title="Compound Learning"
                        description="Each automated decision adds to the graph, making future automation smarter."
                        color="green"
                    />
                </motion.div>

                {/* Section 1: The Problem */}
                <Section title="1. What Systems of Record Don't Capture">
                    <div className="space-y-6 text-lg text-slate-400">
                        <p>
                            The last generation of enterprise software became trillion-dollar platforms by owning <strong className="text-white">canonical data</strong>:
                            Salesforce for customers, Workday for employees, SAP for operations. Own the data, own the workflow, own the lock-in.
                        </p>

                        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
                            <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                The Missing Layer
                            </h4>
                            <p className="text-sm">
                                These systems capture <em>what</em> happened, but not <em>why</em>. The reasoning that connects data to action—
                                the exceptions, overrides, precedents, and cross-system context—lives in Slack threads,
                                deal desk conversations, and people's heads.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-8">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-3">What's Never Captured:</h4>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>• <strong className="text-orange-300">Exception logic</strong> in people's heads</li>
                                    <li>• <strong className="text-orange-300">Precedent</strong> from past decisions</li>
                                    <li>• <strong className="text-orange-300">Cross-system synthesis</strong> done mentally</li>
                                    <li>• <strong className="text-orange-300">Approval chains</strong> in Slack/Zoom</li>
                                </ul>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                <h4 className="font-bold text-white mb-3">The Distinction:</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                        <strong className="text-blue-300">Rules</strong>
                                        <p className="text-slate-500">What should happen in general</p>
                                    </div>
                                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                                        <strong className="text-purple-300">Decision Traces</strong>
                                        <p className="text-slate-500">What happened in this specific case</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NEW: Tribal Knowledge Visualization */}
                        <div className="mt-10">
                            <TribalKnowledgeViz />
                        </div>
                    </div>
                </Section>

                {/* Section 2: What is a Context Graph */}
                <Section title="2. What is a Context Graph?">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            A <strong className="text-white">context graph</strong> is a living record of decision traces, stitched across entities and time.
                            It's not the model's chain-of-thought—it's a structured, replayable history of how context turned into action.
                        </p>

                        <ContextGraphViz />

                        <div className="bg-slate-900 p-6 rounded-xl border border-white/10 mt-8">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-400" />
                                Why This Matters
                            </h4>
                            <ul className="text-sm text-slate-400 space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                    <span><strong className="text-white">Audit & Debug:</strong> Replay exactly what the agent saw and did</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                    <span><strong className="text-white">Precedent Search:</strong> Find how similar cases were handled before</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                    <span><strong className="text-white">Progressive Automation:</strong> More traces = more automated decisions</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* Section 3: The Two Clocks Problem */}
                <Section title="3. The Two Clocks Problem">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Every system has a <strong className="text-blue-400">state clock</strong>—what's true now—and an
                            <strong className="text-purple-400"> event clock</strong>—what happened, in what order, with what reasoning.
                            We've built $100T+ infrastructure for the state clock. The event clock barely exists.
                        </p>
                        <TwoClocksViz />

                        <div className="bg-slate-900 p-6 rounded-xl border border-white/10 mt-8">
                            <h4 className="font-bold text-white mb-4">This Pattern is Everywhere:</h4>
                            <ul className="text-sm text-slate-400 space-y-3">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span>The CRM says <strong className="text-white">"closed lost"</strong> but doesn't say you were the second choice</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span>The treatment plan says <strong className="text-white">"switched to Drug B"</strong> but doesn't say Drug A was working until insurance stopped covering it</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-400">•</span>
                                    <span>The contract says <strong className="text-white">60-day termination</strong> but doesn't say the client pushed for 30 and you traded it for the liability cap</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Section>

                {/* Section 4: Three Layers Architecture */}
                <Section title="4. Three Layers Architecture">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            The two-clock model is right, but implementation requires <strong className="text-white">three distinct layers</strong>:
                            Content for evidence, Entities for identity, and Facts for temporality.
                        </p>
                        <ThreeLayersViz />
                        <FactsDataViz />

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 mt-6">
                            <h4 className="font-bold text-green-400 mb-3">💡 World Models Without Continual Learning</h4>
                            <p className="text-sm text-slate-400">
                                The model doesn't need to update its weights to "learn" that Paula now works at Microsoft.
                                The <strong className="text-white">world model—the accumulated, resolved facts—captures that knowledge</strong>.
                                At inference time, the model reasons over current facts, not stale training data.
                                This is how you give agents <strong className="text-white">memory that actually works</strong>.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 5: Decision Trace Demo */}
                <Section title="5. How Decision Traces Work">
                    <p className="text-lg text-slate-400 mb-8">
                        When an AI agent makes a decision, it can capture the full context—turning ephemeral reasoning into durable artifacts.
                        Here's an example of a renewal agent deciding on a discount:
                    </p>
                    <DecisionTraceDemo />

                    {/* NEW: Before/After Comparison */}
                    <div className="mt-10">
                        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <ArrowRight className="w-5 h-5 text-purple-400" />
                            See the Difference
                        </h4>
                        <BeforeAfterComparison />
                    </div>
                </Section>

                {/* Section 6: The Compound Learning Flywheel */}
                <Section title="6. The Compound Learning Flywheel">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Context graphs don't just store decisions—they <strong className="text-white">compound</strong>.
                            Every captured trace becomes searchable precedent for future decisions.
                        </p>
                        <CompoundLoopViz />
                        <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-6 mt-6">
                            <h4 className="font-bold text-purple-400 mb-3">💡 The Power of Progressive Automation</h4>
                            <p className="text-sm text-slate-400">
                                It starts with <strong className="text-white">human-in-the-loop</strong>: the agent proposes, gathers context, routes approvals, and records the trace.
                                Over time, as similar cases repeat, more of the path can be automated because the system has a <strong className="text-white">structured library of prior decisions</strong>.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 7: Why Incumbents Can't Build This */}
                <Section title="7. Why This is Hard for Incumbents">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Salesforce, Workday, and even data warehouses like Snowflake have fundamental limitations:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl">
                                <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                                    <Database className="w-5 h-5" />
                                    Systems of Record
                                </h4>
                                <p className="text-sm text-slate-400 mb-3">
                                    Salesforce, ServiceNow, Workday
                                </p>
                                <ul className="text-xs text-slate-500 space-y-1">
                                    <li>• Store current state only</li>
                                    <li>• Don't capture decision context</li>
                                    <li>• Can't see cross-system synthesis</li>
                                </ul>
                            </div>
                            <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-xl">
                                <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                                    <Layers className="w-5 h-5" />
                                    Data Warehouses
                                </h4>
                                <p className="text-sm text-slate-400 mb-3">
                                    Snowflake, Databricks
                                </p>
                                <ul className="text-xs text-slate-500 space-y-1">
                                    <li>• Receive data via ETL after decisions</li>
                                    <li>• By the time data lands, context is gone</li>
                                    <li>• In the read path, not the write path</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 mt-6">
                            <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                                <Workflow className="w-5 h-5" />
                                The Startup Advantage
                            </h4>
                            <p className="text-sm text-slate-400">
                                <strong className="text-white">AI agent startups sit in the orchestration path.</strong> They see the full picture at decision time:
                                what inputs were gathered, what policies applied, what exceptions were granted.
                                Because they're executing the workflow, they can capture context as a first-class record.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 8: Three Paths for Startups */}
                <Section title="8. Three Paths for Startups">
                    <div className="space-y-6">
                        <div className="grid gap-6">
                            <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-blue-500/10">
                                        <Building2 className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-2">Replace Systems of Record</h4>
                                        <p className="text-sm text-slate-400 mb-3">
                                            Build CRM/ERP from scratch with event-sourced state and decision capture native to the architecture.
                                        </p>
                                        <Badge variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                                            Example: Regie (AI-native sales platform)
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-purple-500/10">
                                        <Layers className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-2">Replace Modules</h4>
                                        <p className="text-sm text-slate-400 mb-3">
                                            Target specific sub-workflows where exceptions concentrate. Sync final state back to incumbents.
                                        </p>
                                        <Badge variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                                            Example: Maximor (finance workflows without replacing GL)
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-green-500/10">
                                        <Network className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-2">Create New Systems of Record</h4>
                                        <p className="text-sm text-slate-400 mb-3">
                                            Start as orchestration layer, persist decision traces. Become the place businesses go to answer "why did we do that?"
                                        </p>
                                        <Badge variant="outline" className="border-green-500/30 text-green-300 text-xs">
                                            Example: PlayerZero (production engineering context graph)
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 9: Key Signals */}
                <Section title="9. Where to Look for Opportunities">
                    <div className="space-y-6">
                        <p className="text-lg text-slate-400">
                            Two key signals point to context graph opportunities:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-6 rounded-xl border border-purple-500/20">
                                <h4 className="text-xl font-bold text-purple-400 mb-3">🧑‍🤝‍🧑 High Headcount</h4>
                                <p className="text-sm text-slate-400">
                                    50+ people doing a workflow manually (routing, triaging, reconciling).
                                    The labor exists because decision logic is too complex for traditional automation.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-6 rounded-xl border border-orange-500/20">
                                <h4 className="text-xl font-bold text-orange-400 mb-3">⚡ Exception-Heavy</h4>
                                <p className="text-sm text-slate-400">
                                    Workflows where "it depends" is the honest answer. Deal desks, underwriting,
                                    compliance reviews, escalation management.
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-white/10 mt-6">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-pink-400" />
                                The "Glue Function" Signal
                            </h4>
                            <p className="text-sm text-slate-400 mb-4">
                                <strong className="text-white">RevOps, DevOps, SecOps</strong>—these roles exist because no single system owns the cross-functional workflow.
                                An agent that automates these roles doesn't just run steps faster; it can persist the decisions and precedents
                                the role was created to produce.
                            </p>
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center">
                                    <span className="text-sm font-bold text-pink-400">RevOps</span>
                                    <p className="text-[10px] text-slate-500 mt-1">Sales + Finance + CS</p>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                                    <span className="text-sm font-bold text-blue-400">DevOps</span>
                                    <p className="text-[10px] text-slate-500 mt-1">Dev + IT + Support</p>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                                    <span className="text-sm font-bold text-green-400">SecOps</span>
                                    <p className="text-[10px] text-slate-500 mt-1">IT + Eng + Compliance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 10: Resources */}
                <Section title="10. Learn More">
                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://foundationcapital.com/context-graphs-ais-trillion-dollar-opportunity/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group"
                        >
                            <div className="p-3 bg-purple-500/10 rounded-lg">
                                <ExternalLink className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">Original Article</h4>
                                <p className="text-xs text-slate-500">Foundation Capital's deep dive</p>
                            </div>
                        </a>
                        <a
                            href="https://cloudedjudgement.substack.com/p/clouded-judgement-121225-long-live"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group"
                        >
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <Brain className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">Long Live Systems of Record</h4>
                                <p className="text-xs text-slate-500">Jamin Ball's counterpoint</p>
                            </div>
                        </a>
                        <a
                            href="https://playerzero.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group"
                        >
                            <div className="p-3 bg-green-500/10 rounded-lg">
                                <Network className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">PlayerZero</h4>
                                <p className="text-xs text-slate-500">Context graph for production engineering</p>
                            </div>
                        </a>
                        <a
                            href="https://arize.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group"
                        >
                            <div className="p-3 bg-orange-500/10 rounded-lg">
                                <Zap className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">Arize</h4>
                                <p className="text-xs text-slate-500">Observability for AI agents</p>
                            </div>
                        </a>
                        <a
                            href="https://graphlit.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all group"
                        >
                            <div className="p-3 bg-cyan-500/10 rounded-lg">
                                <Database className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">Graphlit</h4>
                                <p className="text-xs text-slate-500">Building the Event Clock infrastructure</p>
                            </div>
                        </a>
                    </div>
                </Section>

                {/* Key Takeaway */}
                <div className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">The Bottom Line</h3>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        The next trillion-dollar platforms won't be built by adding AI to existing data.
                        They'll be built by <strong className="text-purple-400">capturing the decision traces</strong> that make data actionable.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center pt-12 border-t border-white/10 mt-12">
                    <Link to="/trending">
                        <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
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
