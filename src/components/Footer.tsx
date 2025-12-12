import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';
import { BuyCoffeeButton } from './BuyCoffeeButton';

const socialLinks = [
  { icon: Github, href: 'https://github.com/StartLedger', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/ajmal_nazir', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ajmalnazir', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@whatsgoingon.ai', label: 'Email' },
];

const footerLinks = {
  explore: [
    { label: 'AI News', href: '/updates' },
    { label: 'Research Papers', href: '/research' },
    { label: 'Video Feeds', href: '/videos' },
    { label: 'Jobs Board', href: '/jobs' },
    { label: 'Tools Directory', href: '/tools' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Timeline', href: '/history' },
    { label: 'Learning Path', href: '/learning' },
  ]
};

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#0a0a0a]">
      {/* Decorative top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                W
              </div>
              <span className="font-bold text-xl tracking-tight">
                WhatsGoingOn<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Your daily command center for Artificial Intelligence. We curate the latest breakthroughs, research, and tools to keep you ahead of the curve.
            </p>
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

          {/* Links Columns (2 cols each -> 4 cols total spacing) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-semibold text-foreground tracking-wide">Explore</h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-semibold text-foreground tracking-wide">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Support (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
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
