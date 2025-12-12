
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
          <div className="lg:col-span-6 space-y-6 lg:pl-12">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
              <h4 className="font-semibold text-foreground">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">
                Join our community of engineers and researchers. No spam, just high-signal AI updates.
              </p>
              <NewsletterSignup variant="minimal" />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01]">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-red-500 fill-red-500/10" />
                <span>Support the project</span>
              </div>
              <BuyCoffeeButton className="h-9 px-4 text-xs" />
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
