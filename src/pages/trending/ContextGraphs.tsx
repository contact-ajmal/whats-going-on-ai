import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ArrowRight, Database, Zap,
    ExternalLink, GitBranch, Network, Brain,
    Layers, Search, History, Users, Building2,
    Workflow, FileSearch, MessageSquare, CheckCircle,
    AlertTriangle, Target, TrendingUp, Lightbulb
} from 'lucide-react';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

// --- Main Component ---

export default function ContextGraphsDeepDive() {
    return (
        <div className="min-h-screen bg-black font-sans text-slate-200">
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
                        <Badge variant="outline" className="mb-6 text-purple-400 border-purple-400/30 py-1.5 px-4 text-sm backdrop-blur-md">
                            🕸️ Enterprise AI Infrastructure
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600">
                                Context Graphs
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            The missing layer that captures <strong className="text-white">why</strong> decisions were made—not just what happened.
                            This is AI's trillion-dollar opportunity.
                        </p>
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

                {/* Section 3: Decision Trace Demo */}
                <Section title="3. How Decision Traces Work">
                    <p className="text-lg text-slate-400 mb-8">
                        When an AI agent makes a decision, it can capture the full context—turning ephemeral reasoning into durable artifacts.
                        Here's an example of a renewal agent deciding on a discount:
                    </p>
                    <DecisionTraceDemo />
                </Section>

                {/* Section 4: Why Incumbents Can't Build This */}
                <Section title="4. Why This is Hard for Incumbents">
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

                {/* Section 5: Three Paths for Startups */}
                <Section title="5. Three Paths for Startups">
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

                {/* Section 6: Key Signals */}
                <Section title="6. Where to Look for Opportunities">
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
                            <p className="text-sm text-slate-400">
                                <strong className="text-white">RevOps, DevOps, SecOps</strong>—these roles exist because no single system owns the cross-functional workflow.
                                An agent that automates these roles doesn't just run steps faster; it can persist the decisions and precedents
                                the role was created to produce.
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Section 7: Resources */}
                <Section title="7. Learn More">
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
