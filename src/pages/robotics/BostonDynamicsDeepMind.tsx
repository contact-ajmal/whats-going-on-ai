import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Bot, Cpu, Cog, Rocket, ArrowRight, Play, ExternalLink,
    Brain, Sparkles, Target, Zap, Eye, MessageSquare,
    Factory, Car, Users, Calendar, CheckCircle, ArrowLeft,
    Layers, Hand, Settings, Shield, Globe, TrendingUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';

// --- Reusable Components ---

const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
    <section className={`mb-16 ${className}`}>
        <h2 className="text-3xl font-bold text-slate-100 mb-6 border-b-4 border-teal-500 inline-block pb-2">
            {title}
        </h2>
        {children}
    </section>
);

const FeatureCard = ({ icon: Icon, title, description, color }: { icon: any; title: string; description: string; color: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`p-6 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-${color}-500/50 transition-all duration-300`}
    >
        <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-400 w-fit mb-4`}>
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

// --- Partnership Announcement Banner ---

const PartnershipBanner = () => (
    <div className="bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-blue-500/10 border border-teal-500/30 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-teal-500/20 rounded-xl">
                    <Bot className="w-12 h-12 text-teal-400" />
                </div>
                <span className="text-4xl font-bold text-slate-400">×</span>
                <div className="p-4 bg-blue-500/20 rounded-xl">
                    <Brain className="w-12 h-12 text-blue-400" />
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 mb-2">
                    CES 2026 Announcement
                </Badge>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Boston Dynamics × Google DeepMind
                </h2>
                <p className="text-slate-400">
                    A historic partnership bringing foundational AI to humanoid robots
                </p>
            </div>
        </div>
    </div>
);

// --- Gemini Robotics Features ---

const GeminiFeatures = () => {
    const features = [
        {
            icon: Eye,
            title: 'Perceive',
            description: 'Advanced computer vision to understand complex environments in real-time.',
            color: 'teal'
        },
        {
            icon: Brain,
            title: 'Reason',
            description: 'Visual-action joint reasoning to decompose tasks and plan actions.',
            color: 'blue'
        },
        {
            icon: Hand,
            title: 'Use Tools',
            description: 'Dexterous manipulation for industrial tasks and tool operation.',
            color: 'violet'
        },
        {
            icon: MessageSquare,
            title: 'Interact',
            description: 'Natural language understanding for human-robot collaboration.',
            color: 'amber'
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-5 rounded-xl border border-${feature.color}-500/30 bg-${feature.color}-500/5 text-center`}
                    >
                        <div className={`p-3 rounded-full bg-${feature.color}-500/20 w-fit mx-auto mb-3`}>
                            <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                        </div>
                        <h4 className={`font-bold text-${feature.color}-400 mb-2`}>{feature.title}</h4>
                        <p className="text-sm text-slate-400">{feature.description}</p>
                    </motion.div>
                );
            })}
        </div>
    );
};

// --- Atlas Robot Specifications ---

const AtlasSpecs = () => {
    const specs = [
        { label: 'Type', value: 'All-Electric Humanoid' },
        { label: 'Height', value: '~1.5m (5 ft)' },
        { label: 'Weight', value: '~89 kg (196 lbs)' },
        { label: 'Degrees of Freedom', value: '28+' },
        { label: 'Power', value: 'Electric Battery' },
        { label: 'AI Brain', value: 'Gemini Robotics' },
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-teal-400" />
                New Atlas Robot Specifications
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
                {specs.map((spec, idx) => (
                    <div key={idx} className="p-3 bg-black/30 rounded-lg border border-white/5">
                        <span className="text-xs text-slate-500 uppercase">{spec.label}</span>
                        <div className="text-lg font-bold text-white">{spec.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Timeline Section ---

const TimelineSection = () => {
    const milestones = [
        { date: 'Jan 2026', event: 'Partnership announced at CES 2026', status: 'done' },
        { date: 'Q1 2026', event: 'Atlas production begins', status: 'done' },
        { date: 'Mid 2026', event: 'Deployment to Hyundai RMAC & DeepMind', status: 'current' },
        { date: 'Late 2026', event: 'Joint research collaboration begins', status: 'upcoming' },
        { date: 'Early 2027', event: 'Additional customer deployments', status: 'upcoming' },
        { date: '2028', event: 'Hyundai factory-wide deployment', status: 'upcoming' },
    ];

    return (
        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-400" />
                Deployment Timeline
            </h3>
            <div className="space-y-4">
                {milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${milestone.status === 'done' ? 'bg-teal-500/20 text-teal-400' :
                            milestone.status === 'current' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-slate-700/50 text-slate-500'
                            }`}>
                            {milestone.status === 'done' ? <CheckCircle className="w-4 h-4" /> :
                                milestone.status === 'current' ? <Zap className="w-4 h-4" /> :
                                    <Calendar className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{milestone.date}</span>
                                {milestone.status === 'current' && (
                                    <Badge className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30">In Progress</Badge>
                                )}
                            </div>
                            <p className="text-sm text-slate-400">{milestone.event}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Video Section ---

const VideoSection = () => (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-red-500" />
            Watch: Boston Dynamics Atlas & DeepMind Partnership
        </h3>
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/29ECwExc-_M"
                title="Boston Dynamics Atlas Robot"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
        <p className="text-sm text-slate-500 mt-3 text-center">
            Boston Dynamics: All New Atlas Robot
        </p>
    </div>
);

// --- Industry Applications ---

const IndustryApplications = () => {
    const industries = [
        { icon: Car, name: 'Automotive', description: 'Assembly, inspection, and logistics', color: 'teal' },
        { icon: Factory, name: 'Manufacturing', description: 'Heavy lifting and material handling', color: 'blue' },
        { icon: Layers, name: 'Warehousing', description: 'Inventory management and picking', color: 'violet' },
        { icon: Shield, name: 'Safety', description: 'Hazardous environment operations', color: 'amber' },
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((industry, idx) => {
                const Icon = industry.icon;
                return (
                    <div key={idx} className={`p-5 rounded-xl border border-${industry.color}-500/30 bg-${industry.color}-500/5`}>
                        <Icon className={`w-8 h-8 text-${industry.color}-400 mb-3`} />
                        <h4 className="font-bold text-white mb-1">{industry.name}</h4>
                        <p className="text-xs text-slate-400">{industry.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

// --- Key Partners Section ---

const KeyPartners = () => (
    <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900/50 rounded-xl border border-white/10">
            <h4 className="font-bold text-teal-400 mb-2">Boston Dynamics</h4>
            <p className="text-sm text-slate-400">
                World leader in mobile robotics, bringing decades of experience in robotic athleticism,
                balance, and mobility. Creator of Spot, Atlas, and Stretch robots.
            </p>
        </div>
        <div className="p-6 bg-slate-900/50 rounded-xl border border-white/10">
            <h4 className="font-bold text-blue-400 mb-2">Google DeepMind</h4>
            <p className="text-sm text-slate-400">
                Pioneer in artificial intelligence research, developing Gemini foundation models
                and cutting-edge robotics AI for perception, reasoning, and action.
            </p>
        </div>
        <div className="p-6 bg-slate-900/50 rounded-xl border border-white/10">
            <h4 className="font-bold text-amber-400 mb-2">Hyundai Motor Group</h4>
            <p className="text-sm text-slate-400">
                Majority stakeholder in Boston Dynamics, planning factory-wide deployment of
                Atlas robots by 2028 through their Robotics Metaplant Application Center.
            </p>
        </div>
    </div>
);

// --- What Makes This Different ---

const WhyItMatters = () => {
    const points = [
        {
            icon: Brain,
            title: 'From Scripted to Autonomous',
            description: 'Atlas moves from pre-programmed routines to real-time decision-making that adapts to unexpected situations.'
        },
        {
            icon: MessageSquare,
            title: 'Natural Language Commands',
            description: 'Workers can communicate with Atlas using everyday language, not specialized programming interfaces.'
        },
        {
            icon: TrendingUp,
            title: 'Continuous Learning',
            description: 'Gemini enables Atlas to learn from environmental interaction, improving over time through experience.'
        },
        {
            icon: Globe,
            title: 'General-Purpose Intelligence',
            description: 'Unlike specialized industrial robots, Atlas can adapt to a wide variety of tasks across different domains.'
        },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {points.map((point, idx) => {
                const Icon = point.icon;
                return (
                    <div key={idx} className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-white/10">
                        <div className="p-3 bg-teal-500/10 rounded-lg h-fit">
                            <Icon className="w-5 h-5 text-teal-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-1">{point.title}</h4>
                            <p className="text-sm text-slate-400">{point.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// --- Main Component ---

const Robotics = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <SEO
                title="Boston Dynamics × DeepMind: Foundational AI for Humanoid Robots"
                description="Explore the historic Boston Dynamics and Google DeepMind partnership bringing Gemini Robotics AI to the new all-electric Atlas humanoid robot. Deployments in 2026."
                url="/robotics/boston-dynamics-deepmind"
            />
            <Navigation />
            <NeuralBackground />

            <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 space-y-4"
                >
                    <Link to="/robotics" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-4 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        AI Robotics
                    </Link>
                    <Badge variant="outline" className="mb-4 text-teal-400 border-teal-400/20 backdrop-blur-md">
                        🤖 Physical AI • CES 2026
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
                        AI Robotics
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
                        The convergence of AI and physical systems. <strong className="text-white">Boston Dynamics</strong> and
                        <strong className="text-white"> Google DeepMind</strong> unite to bring foundational intelligence to humanoid robots.
                    </p>
                    <div className="flex justify-center pt-4">
                        <ShareButtons title="AI Robotics: Boston Dynamics × Google DeepMind Partnership" />
                    </div>
                </motion.div>

                {/* Partnership Banner */}
                <PartnershipBanner />

                <div className="max-w-5xl mx-auto">
                    {/* The Announcement */}
                    <Section title="1. The Historic Partnership">
                        <div className="space-y-6 text-lg text-slate-400">
                            <p>
                                At <strong className="text-white">CES 2026</strong> in Las Vegas, Boston Dynamics and Google DeepMind
                                announced a groundbreaking partnership that marks a new era in robotics. This collaboration brings
                                together Boston Dynamics' legendary expertise in robotic mobility with DeepMind's cutting-edge
                                <strong className="text-teal-400"> Gemini Robotics</strong> AI foundation models.
                            </p>
                            <p>
                                The goal: to create humanoid robots that don't just follow pre-programmed routines, but can
                                <strong className="text-white"> perceive, reason, and act autonomously</strong> in real-world industrial environments.
                            </p>
                            <KeyPartners />
                        </div>
                    </Section>

                    {/* Video Section */}
                    <Section title="2. Watch the Announcement">
                        <VideoSection />
                    </Section>

                    {/* Gemini Robotics Integration */}
                    <Section title="3. Gemini Robotics: The AI Brain">
                        <div className="space-y-6">
                            <p className="text-lg text-slate-400">
                                Google DeepMind's <strong className="text-white">Gemini Robotics</strong> models are specifically
                                designed to enable robots to understand and interact with the physical world. Built on the
                                large-scale, multi-modal Gemini foundation, these models give Atlas four key capabilities:
                            </p>
                            <GeminiFeatures />
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mt-6">
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                    Key Capability: Visual-Action Joint Reasoning
                                </h4>
                                <p className="text-sm text-slate-300">
                                    Unlike traditional robots that separate perception and action, Gemini enables Atlas to
                                    simultaneously understand what it sees and plan what to do—just like humans. This allows
                                    Atlas to handle unexpected situations, decompose complex tasks, and continuously learn
                                    from its interactions with the environment.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* The New Atlas */}
                    <Section title="4. The New All-Electric Atlas">
                        <div className="space-y-6">
                            <p className="text-lg text-slate-400">
                                The product version of Boston Dynamics' <strong className="text-white">new Atlas robot</strong> was
                                unveiled at CES 2026. This all-electric humanoid represents a complete redesign, optimized
                                for real-world industrial deployment rather than research demonstrations.
                            </p>
                            <AtlasSpecs />
                        </div>
                    </Section>

                    {/* Why It Matters */}
                    <Section title="5. Why This Changes Everything">
                        <div className="space-y-6">
                            <p className="text-lg text-slate-400">
                                This partnership transforms Atlas from an impressive demonstration platform into a
                                <strong className="text-white"> practical industrial tool</strong>:
                            </p>
                            <WhyItMatters />
                        </div>
                    </Section>

                    {/* Industry Applications */}
                    <Section title="6. Industrial Applications">
                        <p className="text-lg text-slate-400 mb-6">
                            The partnership initially focuses on the <strong className="text-white">automotive sector</strong>,
                            with plans to expand to other industries:
                        </p>
                        <IndustryApplications />
                    </Section>

                    {/* Timeline */}
                    <Section title="7. Deployment Timeline">
                        <TimelineSection />
                    </Section>

                    {/* Resources */}
                    <Section title="8. Learn More">
                        <div className="grid md:grid-cols-2 gap-4">
                            <a
                                href="https://bostondynamics.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-teal-500/50 transition-all group"
                            >
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <Bot className="w-5 h-5 text-teal-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors">Boston Dynamics</h4>
                                    <p className="text-xs text-slate-500">Official website</p>
                                </div>
                                <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-teal-400" />
                            </a>
                            <a
                                href="https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-slate-900 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <Brain className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">Google DeepMind</h4>
                                    <p className="text-xs text-slate-500">Gemini Robotics blog post</p>
                                </div>
                                <ExternalLink className="ml-auto w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                            </a>
                        </div>
                    </Section>

                    {/* Key Takeaway */}
                    <div className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 border border-teal-500/30 rounded-2xl p-8 text-center mt-12">
                        <h3 className="text-2xl font-bold text-white mb-4">The Future of Physical AI</h3>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                            The Boston Dynamics × DeepMind partnership represents a pivotal moment in robotics.
                            By combining world-class mechanical engineering with foundational AI, we're witnessing
                            the birth of <strong className="text-teal-400">truly intelligent humanoid robots</strong> that
                            can work alongside humans in the real world.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-12 border-t border-white/10 mt-12">
                        <Link to="/robotics">
                            <Button variant="outline" className="border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to AI Robotics
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Robotics;
