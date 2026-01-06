import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car, Brain, ExternalLink, Sparkles, Database, Monitor, Users, Calendar, ChevronRight, MessageSquare, Lightbulb, Target, Shield, MapPin, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import ShareButtons from '@/components/ShareButtons';

const Section = ({ title, children, icon: Icon }: { title: string; children: React.ReactNode; icon?: any }) => (
    <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
    >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            {Icon && <Icon className="w-7 h-7 text-lime-400" />}
            {title}
        </h2>
        {children}
    </motion.section>
);

const FeatureCard = ({ icon: Icon, title, description, color = "lime" }: { icon: any; title: string; description: string; color?: string }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-5 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm"
    >
        <div className={`p-3 rounded-lg bg-${color}-500/20 w-fit mb-3`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <h4 className="font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
    </motion.div>
);

const AlpamayoModel = () => (
    <div className="relative p-6 rounded-2xl border border-lime-500/30 bg-gradient-to-br from-lime-500/5 to-green-500/5 overflow-hidden">
        {/* Chain of Thought Flow */}
        <div className="grid md:grid-cols-4 gap-4">
            {[
                { step: 1, title: 'Perceive', icon: Monitor, desc: 'Multi-sensor input processing' },
                { step: 2, title: 'Reason', icon: Brain, desc: 'Chain-of-thought analysis' },
                { step: 3, title: 'Decide', icon: Lightbulb, desc: 'Step-by-step decision logic' },
                { step: 4, title: 'Act', icon: Car, desc: 'Safe vehicle control' },
            ].map(({ step, title, icon: Icon, desc }) => (
                <div key={step} className="relative">
                    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-black/30 border border-white/10">
                        <div className="text-xs text-lime-400 font-mono mb-2">STEP {step}</div>
                        <div className="p-2 rounded-lg bg-lime-500/20 mb-2">
                            <Icon className="w-5 h-5 text-lime-400" />
                        </div>
                        <h4 className="font-bold text-white text-sm">{title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{desc}</p>
                    </div>
                    {step < 4 && (
                        <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lime-400/50" />
                    )}
                </div>
            ))}
        </div>

        {/* Model Specs */}
        <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="flex flex-wrap justify-center gap-6 text-center">
                <div>
                    <div className="text-2xl font-bold text-lime-400">10B</div>
                    <div className="text-xs text-slate-400">Parameters</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-green-400">VLA</div>
                    <div className="text-xs text-slate-400">Vision-Language-Action</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-emerald-400">CoT</div>
                    <div className="text-xs text-slate-400">Chain-of-Thought</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-teal-400">L4</div>
                    <div className="text-xs text-slate-400">Autonomy Level</div>
                </div>
            </div>
        </div>
    </div>
);

const NvidiaAlpamayo = () => {
    const [activeTab, setActiveTab] = useState<'model' | 'sim' | 'data'>('model');

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <SEO
                title="NVIDIA Alpamayo: World's First Thinking & Reasoning AI for Autonomous Driving"
                description="Explore NVIDIA's Alpamayo platform - a 10B parameter chain-of-thought model for Level 4 autonomous vehicles. Launching with Mercedes-Benz CLA in Q1 2026."
                url="/trending/nvidia-alpamayo"
            />
            <Navigation />
            <NeuralBackground />

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-4"
                >
                    <Link to="/trending" className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 mb-4 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Trending AI Tech
                    </Link>
                    <Badge variant="outline" className="mb-4 text-lime-400 border-lime-400/20 backdrop-blur-md">
                        🚗 Autonomous Driving • CES 2026
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500">
                        NVIDIA Alpamayo
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
                        The world's first <span className="text-lime-400 font-medium">thinking and reasoning AI</span> for autonomous driving.
                        Chain-of-thought decision-making for Level 4 autonomy.
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <ShareButtons title="NVIDIA Alpamayo: Thinking AI for Autonomous Vehicles" />
                    </div>
                </motion.div>

                {/* Jensen Quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl border border-lime-500/30 bg-gradient-to-r from-lime-500/10 via-green-500/10 to-lime-500/10"
                >
                    <div className="flex items-start gap-4">
                        <MessageSquare className="w-8 h-8 text-lime-400 flex-shrink-0" />
                        <div>
                            <p className="text-lg md:text-xl italic text-white/90 mb-3">
                                "Alpamayo is the world's first thinking and reasoning AI for autonomous driving.
                                It enables vehicles to perceive, reason, and act with human-like judgment."
                            </p>
                            <p className="text-sm text-lime-400 font-medium">— Jensen Huang, CEO of NVIDIA, CES 2026</p>
                        </div>
                    </div>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Platform Components Tabs */}
                    <Section title="The Alpamayo Platform" icon={Cpu}>
                        <p className="text-muted-foreground mb-6">
                            Alpamayo is an open-source platform designed to accelerate the development of safe, transparent,
                            and highly capable autonomous vehicles. It consists of three key components:
                        </p>

                        {/* Tab Buttons */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {[
                                { id: 'model', label: 'Alpamayo 1 Model', icon: Brain },
                                { id: 'sim', label: 'AlpaSim', icon: Monitor },
                                { id: 'data', label: 'Physical AI Datasets', icon: Database },
                            ].map(({ id, label, icon: Icon }) => (
                                <Button
                                    key={id}
                                    variant={activeTab === id ? 'default' : 'outline'}
                                    onClick={() => setActiveTab(id as any)}
                                    className={activeTab === id ? 'bg-lime-500 text-black hover:bg-lime-600' : 'border-lime-500/30 text-lime-400 hover:bg-lime-500/10'}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {label}
                                </Button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'model' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <AlpamayoModel />
                                <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-white mb-2">Why Chain-of-Thought Matters</h4>
                                    <p className="text-sm text-slate-400">
                                        Unlike traditional pattern-recognition systems, Alpamayo 1 reasons through complex and rare driving
                                        scenarios by generating step-by-step decision logic. This makes decisions <span className="text-lime-400">explainable</span> —
                                        crucial for safety validation and regulatory collaboration.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'sim' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
                                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Monitor className="w-5 h-5 text-green-400" />
                                        AlpaSim: Open-Source Simulation
                                    </h4>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <FeatureCard icon={Target} title="Realistic Sensors" description="High-fidelity sensor modeling for cameras, LiDAR, and radar" color="green" />
                                        <FeatureCard icon={Users} title="Configurable Traffic" description="Dynamic traffic agents with realistic behavior patterns" color="green" />
                                        <FeatureCard icon={Shield} title="Closed-Loop Testing" description="Scalable testing environments for safety validation" color="green" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'data' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                        <Database className="w-5 h-5 text-emerald-400" />
                                        Physical AI Datasets
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="p-4 bg-black/30 rounded-xl border border-white/10">
                                            <div className="text-4xl font-bold text-emerald-400 mb-2">1,700+</div>
                                            <div className="text-lg font-medium text-white">Hours of Driving Data</div>
                                            <p className="text-sm text-slate-400 mt-2">Diverse conditions across multiple geographies</p>
                                        </div>
                                        <div className="p-4 bg-black/30 rounded-xl border border-white/10">
                                            <div className="text-4xl font-bold text-teal-400 mb-2">Long-Tail</div>
                                            <div className="text-lg font-medium text-white">Edge Case Coverage</div>
                                            <p className="text-sm text-slate-400 mt-2">Rare scenarios crucial for safety validation</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </Section>

                    {/* Why It Matters */}
                    <Section title="Why This Changes Everything" icon={Sparkles}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FeatureCard
                                icon={MessageSquare}
                                title="Explainable Decisions"
                                description="Every autonomous decision can be traced through its reasoning chain, enabling safety validation and regulatory approval."
                            />
                            <FeatureCard
                                icon={Brain}
                                title="Human-Like Judgment"
                                description="Vehicles perceive, reason, and act like human drivers, handling complex scenarios that stump traditional AI."
                            />
                            <FeatureCard
                                icon={Shield}
                                title="Safety-First Design"
                                description="Chain-of-thought reasoning allows engineers to verify decision logic before deployment."
                            />
                            <FeatureCard
                                icon={MapPin}
                                title="Edge Case Handling"
                                description="1,700+ hours of diverse data including rare 'long-tail' scenarios that traditional systems miss."
                            />
                        </div>
                    </Section>

                    {/* Partners & Deployment */}
                    <Section title="Industry Adoption" icon={Users}>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { name: 'Mercedes-Benz', status: 'Launch Partner', note: 'CLA launching Q1 2026 (US), Q2 2026 (Europe)', highlight: true },
                                { name: 'JLR', status: 'Active Partner', note: 'Exploring Alpamayo integration', highlight: false },
                                { name: 'Lucid Motors', status: 'Active Partner', note: 'Evaluating for luxury EVs', highlight: false },
                                { name: 'Uber', status: 'Robotaxi Partner', note: 'L4 robotaxi service planned 2027', highlight: false },
                                { name: 'Research Labs', status: 'Open Source', note: 'Academic and enterprise access', highlight: false },
                                { name: 'More OEMs', status: 'Coming Soon', note: 'Larger Alpamayo models in development', highlight: false },
                            ].map((partner, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-xl border ${partner.highlight ? 'border-lime-500/50 bg-lime-500/10' : 'border-white/10 bg-slate-900/50'}`}
                                >
                                    <div className="text-lg font-bold text-white">{partner.name}</div>
                                    <Badge variant="outline" className={partner.highlight ? 'text-lime-400 border-lime-400/30' : 'text-slate-400 border-slate-600'}>
                                        {partner.status}
                                    </Badge>
                                    <p className="text-sm text-slate-400 mt-2">{partner.note}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Timeline */}
                    <Section title="Deployment Timeline" icon={Calendar}>
                        <div className="relative">
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-lime-500 via-green-500 to-emerald-500" />
                            <div className="space-y-8">
                                {[
                                    { date: 'Jan 2026', event: 'CES 2026 Announcement', status: 'complete', desc: 'Platform unveiled with open-source release' },
                                    { date: 'Q1 2026', event: 'Mercedes-Benz CLA (US)', status: 'upcoming', desc: 'First Alpamayo-powered consumer vehicle' },
                                    { date: 'Q2 2026', event: 'Mercedes-Benz CLA (Europe)', status: 'planned', desc: 'European market rollout' },
                                    { date: '2027', event: 'L4 Robotaxi Service', status: 'planned', desc: 'Uber partnership for autonomous ride-hailing' },
                                    { date: '2027+', event: 'Larger Alpamayo Models', status: 'future', desc: 'Enhanced reasoning for more use cases' },
                                ].map((item, idx) => (
                                    <div key={idx} className={`relative flex items-start gap-4 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-10 md:pl-0`}>
                                            <div className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
                                                <div className="text-lime-400 font-mono text-sm mb-1">{item.date}</div>
                                                <div className="font-bold text-white">{item.event}</div>
                                                <p className="text-sm text-slate-400">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="absolute left-4 md:static flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-lime-500 border-4 border-background" />
                                        <div className="flex-1 hidden md:block" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>

                    {/* Resources */}
                    <Section title="Learn More" icon={ExternalLink}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a
                                href="https://www.nvidia.com/en-us/self-driving-cars/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl border border-white/10 bg-slate-900/50 hover:border-lime-500/50 transition-all flex items-center gap-4 group"
                            >
                                <div className="p-3 rounded-lg bg-lime-500/20">
                                    <Car className="w-6 h-6 text-lime-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white group-hover:text-lime-400 transition-colors">NVIDIA DRIVE</div>
                                    <div className="text-sm text-slate-400">Autonomous vehicle platform</div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-500 ml-auto" />
                            </a>
                            <a
                                href="https://nvidianews.nvidia.com/news/alpamayo-autonomous-vehicle-development"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl border border-white/10 bg-slate-900/50 hover:border-lime-500/50 transition-all flex items-center gap-4 group"
                            >
                                <div className="p-3 rounded-lg bg-green-500/20">
                                    <Sparkles className="w-6 h-6 text-green-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-white group-hover:text-lime-400 transition-colors">Official Announcement</div>
                                    <div className="text-sm text-slate-400">NVIDIA Newsroom</div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-500 ml-auto" />
                            </a>
                        </div>
                    </Section>

                    {/* Key Takeaway */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-lime-500/20 via-green-500/20 to-emerald-500/20 border border-lime-500/30">
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-lime-400" />
                            Key Takeaway
                        </h3>
                        <p className="text-slate-300">
                            NVIDIA Alpamayo represents a paradigm shift from <span className="text-lime-400 font-medium">pattern-matching to reasoning</span> in autonomous driving.
                            By enabling vehicles to think through decisions step-by-step like humans, it addresses the explainability challenge
                            that has blocked regulatory approval for Level 4 autonomy. With Mercedes-Benz launching in Q1 2026 and robotaxi
                            services planned for 2027, this technology is moving from research to reality faster than expected.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-12 border-t border-white/10 mt-12">
                        <Link to="/trending">
                            <Button variant="outline" className="border-lime-500/30 text-lime-400 hover:bg-lime-500/10">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Trending AI Tech
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NvidiaAlpamayo;
