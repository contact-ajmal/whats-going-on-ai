import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Globe, Linkedin, Mail, Brain, Zap, Compass, Cpu, Network, Lightbulb } from 'lucide-react';
import { Magnetic } from '@/components/ui/magnetic';
import { Spotlight } from '@/components/ui/spotlight';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      <NeuralBackground />
      <Navigation />

      <main className="relative z-10">

        {/* Section 1: Introduction (The Architect) */}
        <section className="min-h-[90vh] flex items-center justify-center p-6 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-[60vh] h-[60vh] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-slow" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 mb-8"
            >
              <Brain size={16} /> <span>The Architect</span>
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-8">
              Hello, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AJMAL</span>.
              <span className="block text-3xl md:text-5xl text-slate-400 mt-4 font-bold">Data & AI Architect.</span>
            </h1>

            <div className="flex justify-center gap-6 mb-20">
              <SocialLink href="https://www.hawkeyeinnovations.com/" icon={Globe} label="Work" />
              <SocialLink href="https://www.linkedin.com/in/ajmalnazirbaba/" icon={Linkedin} label="Connect" />
              <SocialLink href="mailto:ajmalbhatti71@gmail.com" icon={Mail} label="Contact" />
            </div>

            {/* Why I Built This - Moved Up */}
            <div className="text-left max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <Compass className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Why I Built This</h2>
              </div>

              <p className="text-xl text-slate-400 leading-relaxed mb-12">
                <strong>WhatsGoingOnAI</strong> is my attempt to map the chaos. It is a curated signal in a noisy world.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Lightbulb}
                  title="Clarity"
                  desc="Start here. No jargon. No hype. Just clear, decoded explanations of complex Transformers and Diffusion models."
                />
                <FeatureCard
                  icon={Network}
                  title="Connection"
                  desc="A hub to connect research papers, tools, and news. See how Agential Workflows connect to LLMs."
                />
                <FeatureCard
                  icon={Compass}
                  title="Direction"
                  desc="Don't just watch the future happen. Understand where it's going. Navigate the shift with confidence."
                />
              </div>
            </div>
          </motion.div>
        </section>


        {/* Section 2: The Philosophy (Why AI?) */}
        <section className="min-h-screen flex items-center justify-center p-6 relative bg-gradient-to-b from-black via-indigo-950/20 to-black">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="order-2 md:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20" />
              <div className="relative bg-black/50 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl">
                <Cpu className="w-12 h-12 text-indigo-400 mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Age of Intelligence</h2>
                <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                  <p>
                    We are living through the single greatest technological shift in human history.
                    Artificial Intelligence is not just a tool; it is a fundamental rewriting of how we solve problems.
                  </p>
                  <p>
                    But with exponential growth comes exponential noise. The signal is lost in the hype.
                    I believe AI should be <span className="text-white">accessible, demystified, and actionable</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping-slow" />
                <div className="absolute inset-10 bg-purple-500/10 rounded-full animate-ping-slower" />
                <Zap className="w-32 h-32 text-white opacity-80 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </motion.div>
        </section>


      </main>

      <Footer />
    </div>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    // MAXIMIZED STRENGTH FOR VISIBILITY
    <Magnetic strength={1.5}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex flex-col items-center gap-3 cursor-pointer"
      >
        {/* Added z-index to ensure it sits above background */}
        <div className="relative z-20 p-5 rounded-full bg-white/10 border border-white/20 text-slate-300 group-hover:text-white group-hover:bg-indigo-500/40 group-hover:border-indigo-500/50 transition-all duration-300 backdrop-blur-sm">
          <Icon size={24} />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 group-hover:text-indigo-300 transition-colors">
          {label}
        </span>
      </a>
    </Magnetic>
  )
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <Spotlight className="p-8">
      <div className="relative z-20 pointer-events-none">
        <Icon className="w-10 h-10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
          {desc}
        </p>
      </div>
    </Spotlight>
  )
}
