
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart, Activity } from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';
import { BuyCoffeeButton } from './BuyCoffeeButton';

const socialLinks = [
  { icon: Github, href: 'https://github.com/StartLedger', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/ajmal_nazir', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ajmalnazir', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@whatsgoingon.ai', label: 'Email' },
];

const SignalVisual = () => (
  <div className="flex items-center gap-1 h-8 mb-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-primary/60 rounded-full"
        animate={{
          height: [10, 24, 10],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut"
        }}
      />
    ))}
    <span className="ml-2 text-xs font-mono text-primary/80 tracking-widest uppercase">
      System Online
    </span>
  </div>
);

// Removed as per request

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#0a0a0a] overflow-hidden">
      {/* Decorative top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Background Grid - faint */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 w-fit group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 text-primary-foreground font-bold font-mono">W</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                WhatsGoingOn<span className="text-primary">AI</span>
              </span>
            </Link>

            <SignalVisual />

            <div className="max-w-md space-y-4">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                Decoding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">future</span> of intelligence.
              </h3>
              <p className="text-lg font-medium text-muted-foreground leading-relaxed">
                We sift through the noise to bring you high-signal research, powerful tools, and the critical insights needed to navigate the AI revolution.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-white/5 bg-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter & Support (6 cols) */}
          <div className="lg:col-span-6 lg:pl-12">
            <div className="relative group rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

              <div className="rounded-[22px] bg-black/40 backdrop-blur-xl p-8 h-full relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"></span>
                    </div>
                    <h4 className="font-mono text-xs tracking-[0.2em] text-primary/80 font-bold uppercase">Incoming_Transmission</h4>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">Join AI Network</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed max-w-md">
                    Get priority access to breakthrough research, new tools, and intelligence reports. No noise, just signal.
                  </p>

                  <NewsletterSignup variant="minimal" />

                  {/* Control Panel Footer */}
                  <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center justify-end gap-6">
                    <BuyCoffeeButton className="h-10 px-6 shadow-[0_0_20px_rgba(0,0,0,0.2)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WhatsGoingOnAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
