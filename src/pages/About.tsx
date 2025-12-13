import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, Twitter, Code, Cpu, Globe, Database, Briefcase, User, Layers, Info, Award, Server, Zap, Shield, Network, Brain } from 'lucide-react';

const Skills = () => {
  // Accurate skills data
  const skills = [
    { name: 'Data Architecture', icon: Database, color: "text-blue-400" },
    { name: 'Real-time Pipelines', icon: Zap, color: "text-yellow-400" },
    { name: 'Cloud Architecture', icon: Cloud, color: "text-cyan-400" },
    { name: 'Data Governance', icon: Shield, color: "text-green-400" },
    { name: 'AI/ML Enablement', icon: Brain, color: "text-purple-400" },
    { name: 'Tech Leadership', icon: Network, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors group"
        >
          <skill.icon className={`w-5 h-5 ${skill.color} group-hover:scale-110 transition-transform`} />
          <span className="font-medium text-xs md:text-sm text-slate-200">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  );
};

import { Cloud } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-purple-500/30 font-sans">
      <NeuralBackground />
      <Navigation />

      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10 max-w-6xl">

        {/* Header / Intro */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Avatar Placeholder / Abstract representation */}
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-10 shadow-[0_0_40px_rgba(99,102,241,0.3)] flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-500">
              <User className="text-white w-12 h-12" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
              Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Ajmal</span>.
            </h1>

            <p className="text-2xl md:text-3xl text-slate-400 font-light max-w-4xl leading-relaxed">
              Principal Architect blending <span className="text-white font-medium">Data Strategy</span> with <span className="text-white font-medium">Artificial Intelligence</span> to build the systems of tomorrow.
            </p>

            <div className="flex gap-4 mt-10">
              <a href="https://github.com/contact-ajmal" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full hover:bg-white/10 hover:translate-y-[-2px] transition-all text-white border border-white/10 group">
                <Github size={20} /> <span className="text-sm font-bold">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/ajmalnazirbaba/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0077b5]/20 rounded-full hover:bg-[#0077b5]/30 hover:translate-y-[-2px] transition-all text-[#0077b5] border border-[#0077b5]/30 group">
                <Linkedin size={20} /> <span className="text-sm font-bold">LinkedIn</span>
              </a>
              <a href="mailto:ajmalbhatti71@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full hover:bg-white/10 hover:translate-y-[-2px] transition-all text-white border border-white/10">
                <Mail size={20} /> <span className="text-sm font-bold">Contact</span>
              </a>
            </div>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Left Column: Story & Career */}
          <div className="lg:col-span-7 space-y-20">

            {/* About Section */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-4">
                <div className="w-12 h-px bg-slate-800" /> The Architect
              </h2>
              <div className="prose prose-lg prose-invert text-slate-300 leading-relaxed">
                <p className="mb-6">
                  I specialize in <strong className="text-white">Data & AI Platforms</strong>. My work bridges the gap between complex AI research and practical, high-impact enterprise solutions.
                </p>
                <p className="mb-6">
                  Currently at <strong className="text-white">Hawk-Eye Innovations</strong>, I design the real-time data platforms behind world-leading tracking, officiating, and analytics systems used across 20+ global sports (FIFA, NFL, NHL, ATP).
                </p>
                <p>
                  From skeletal tracking and ball-flight modelling to AI simulation platforms, I build scalable architectures that turn complex sensor data into instant, reliable insights.
                </p>
              </div>
            </section>

            {/* Career Timeline */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-4">
                <div className="w-12 h-px bg-slate-800" /> Career Trajectory
              </h2>

              <div className="space-y-12 border-l border-white/10 ml-3 pl-10 relative">
                {/* Role 1 */}
                <div className="relative group">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                  <div className="mb-1 text-indigo-400 font-mono text-sm tracking-wide">2024 — Present</div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Data Architect</h3>
                  <div className="text-lg text-slate-400 mb-3">Hawk-Eye Innovations</div>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                    Leading real-time sports data architecture for FIFA, NFL, NHL, ICC, and ATP systems.
                  </p>
                </div>

                {/* Role 2 */}
                <div className="relative group">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-slate-600 rounded-full group-hover:border-white transition-colors" />
                  <div className="mb-1 text-slate-500 font-mono text-sm tracking-wide">2022 — 2024</div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Cloud & Data Architect</h3>
                  <div className="text-lg text-slate-400 mb-3">Atos</div>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                    Delivered enterprise cloud/AI solutions, AWS data lakes, and DevSecOps implementations.
                  </p>
                </div>

                {/* Role 3 */}
                <div className="relative group">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-slate-800 border-2 border-slate-600 rounded-full group-hover:border-white transition-colors" />
                  <div className="mb-1 text-slate-500 font-mono text-sm tracking-wide">2012 — 2023</div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Systems Engineering Architect</h3>
                  <div className="text-lg text-slate-400 mb-3">Qatar Public Sector</div>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-md">
                    Designed datacenter/cloud infra, including support for FIFA World Cup 2022.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Skills & Stack */}
          <div className="lg:col-span-5 space-y-16">
            {/* Skills Grid */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-4">
                <div className="w-12 h-px bg-slate-800" /> Capabilities
              </h2>
              <Skills />
            </section>

            {/* Projects Highlight */}
            <section>
              <div className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Server className="text-indigo-400" /> Key Projects
                </h3>

                <ul className="space-y-4">
                  {[
                    { name: 'NFL & NHL Tracking', desc: 'Ultra-low latency officiating & analytics' },
                    { name: 'SkeleTRACK (FIFA)', desc: 'Real-time skeletal tracking at World Cup' },
                    { name: 'AI Simulation Platform', desc: 'Predictive football models' },
                    { name: 'Cricket Data Architecture', desc: 'End-to-end ball/player pipelines' }
                  ].map((p, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <div>
                        <div className="text-slate-200 font-medium text-sm">{p.name}</div>
                        <div className="text-slate-500 text-xs">{p.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-4">
                <div className="w-12 h-px bg-slate-800" /> Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'AWS Solutions Architect Pro',
                  'AWS DevOps Engineer Pro',
                  'AWS Generative AI Essentials',
                  'AWS Community Builder (2021)'
                ].map(cert => (
                  <Badge key={cert} variant="outline" className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-default py-1.5">
                    {cert}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
}
