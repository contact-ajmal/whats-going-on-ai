import { motion } from 'framer-motion';
import { NeuralBackground } from '@/components/NeuralBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Globe, Linkedin, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-indigo-500/30 font-sans overflow-hidden">
      <NeuralBackground />
      <Navigation />

      <main className="relative min-h-screen flex items-center justify-center p-6">

        {/* Abstract Background Element */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
          <div className="w-[800px] h-[800px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[120px] animate-pulse-slow" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          {/* Minimal Avatar / Symbol */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-12"
          />

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 mix-blend-overlay opacity-90">
            AJMAL
          </h1>

          <div className="space-y-8 mb-16">
            <p className="text-xl md:text-3xl font-light text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Building the digital nervous system of the future.
            </p>
            <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
              I operate at the intersection of <span className="text-indigo-400">Data Architecture</span> and <span className="text-purple-400">Artificial Intelligence</span>.
              My focus is not just on what technology does, but what it <em>means</em> for the evolution of human capability.
            </p>
          </div>

          {/* Minimal Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-8"
          >
            <a href="https://www.hawkeyeinnovations.com/" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors">
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/20">
                <Globe size={24} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">Work</span>
            </a>

            <a href="https://www.linkedin.com/in/ajmalnazirbaba/" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-2 text-slate-500 hover:text-[#0077b5] transition-colors">
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-[#0077b5]/20 transition-colors border border-white/5 group-hover:border-[#0077b5]/30">
                <Linkedin size={24} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">Connect</span>
            </a>

            <a href="mailto:ajmalbhatti71@gmail.com" className="group flex flex-col items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors">
              <div className="p-4 rounded-full bg-white/5 group-hover:bg-indigo-500/20 transition-colors border border-white/5 group-hover:border-indigo-500/30">
                <Mail size={24} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">Contact</span>
            </a>
          </motion.div>

        </motion.div>

      </main>

      {/* Abstract Footer (Minimal) */}
      <footer className="absolute bottom-6 w-full text-center">
        <p className="text-xs text-slate-700 font-mono uppercase tracking-[0.3em]">
          Architecture / Intelligence / Eternity
        </p>
      </footer>
    </div>
  );
}
