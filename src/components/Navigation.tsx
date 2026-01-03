import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BroadcastModal } from '@/components/BroadcastModal';
import { Menu, X, Search, Newspaper, Video, Globe, Briefcase, Wrench, Clock, BookOpen, Info, GraduationCap, Brain, Radio } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SearchDialog } from '@/components/SearchDialog';
import { Button } from '@/components/ui/button';
import { LibraryDrawer } from '@/components/LibraryDrawer';
import { VisitorHUD } from '@/components/VisitorHUD';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserMenu } from "@/components/UserMenu";
import { cn } from "@/lib/utils";
import { BuyCoffeeButton } from './BuyCoffeeButton';
import logo from '@/assets/logo.png';

const ListItem = ({ className, title, children, href, icon: Icon, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {Icon && <Icon className="w-4 h-4 text-primary group-hover:text-primary/80" />}
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1 ml-6">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  const navItems = [
    { to: '/news', label: 'News', icon: Newspaper },
    { to: '/research', label: 'Research', icon: BookOpen }, // Assuming Lightbulb was a typo for BookOpen based on original
    { to: '/learning', label: 'Learning', icon: GraduationCap },
    { to: '/videos', label: 'Videos', icon: Video }, // Assuming PlaySquare was a typo for Video based on original
    { to: '/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/tools', label: 'Tools', icon: Wrench }, // Assuming Calculator was a typo for Wrench based on original
    // { to: '/glossary', label: 'Glossary', icon: BookOpen }, // Not in original structure
    // { to: '/archive', label: 'Archive', icon: Archive }, // Not in original structure
  ];

  return (
    <>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
      >
        <div className="container mx-auto px-3 md:px-6 py-2 md:py-3">
          <div className="flex items-center justify-between gap-2 md:gap-4">

            {/* Logo */}
            {/* Logo */}
            <Link to="/" className="group flex flex-col items-center justify-center gap-0.5 shrink-0 hover:opacity-90 transition-opacity" aria-label="WhatsGoingOnAI Home">
              <img
                src={logo}
                alt="WhatsGoingOnAI Logo"
                className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]"
              />
              <span className="text-[10px] md:text-[11px] font-black tracking-wider leading-none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                WhatsGoingOnAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 overflow-hidden">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to="/" className={location.pathname === '/' ? 'text-primary' : ''}>Home</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>News</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[400px]">
                        <ListItem href="/updates" title="AI News" icon={Newspaper}>
                          Latest headlines and breakthroughs in AI.
                        </ListItem>
                        <ListItem href="/videos" title="Videos" icon={Video}>
                          Curated video feeds from top AI creators.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to="/decoded" className="group flex items-center gap-2 font-bold">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                          AI Decoded
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to="/trending" className="group flex items-center gap-2 font-bold">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent animate-gradient bg-300% group-hover:from-orange-300 group-hover:via-red-300 group-hover:to-orange-400 transition-all duration-300">
                          Trending AI Tech
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to="/young-minds" className="group flex items-center gap-2 font-bold hover:bg-yellow-400/10 rounded-md px-3 py-2 transition-colors">
                        <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">
                          Young Minds
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to="/deepmind" className="group flex items-center gap-2 font-bold hover:bg-blue-500/10 rounded-md px-3 py-2 transition-colors">
                        <span className="text-blue-500 group-hover:text-blue-400 transition-colors">
                          Google DeepMind
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <ListItem href="/research" title="Research" icon={BookOpen}>
                          Deep dive into the latest ArXiv papers.
                        </ListItem>
                        <ListItem href="/jobs" title="Jobs Board" icon={Briefcase}>
                          Find your next role in AI & ML.
                        </ListItem>
                        <ListItem href="/learning" title="Learning" icon={GraduationCap}>
                          Courses & Videos to master AI.
                        </ListItem>
                        <ListItem href="/tools" title="Tools Directory" icon={Wrench}>
                          Explore standard tools and MCP servers.
                        </ListItem>
                        <ListItem href="/history" title="Timeline" icon={Clock}>
                          Interactive history of AI milestones.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to="/blog" className={location.pathname === '/blog' ? 'text-primary' : ''}>Blog</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                      <Link to="/about" className={location.pathname === '/about' ? 'text-primary' : ''}>About</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Side Utilities */}
            <div className="hidden lg:flex items-center gap-1 md:gap-2 shrink-0">
              <VisitorHUD />
              <LibraryDrawer />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setBroadcastOpen(true)}
                className="w-9 h-9 relative group"
                title="Broadcast Signal"
              >
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <Radio className="h-[1.2rem] w-[1.2rem] text-muted-foreground group-hover:text-indigo-400 transition-colors" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                title="Search"
                className="w-9 h-9"
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              <ThemeToggle />
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-1 lg:hidden shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9"
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-border/50"
            >
              <div className="flex flex-col gap-2 pt-4">
                <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Home</Link>

                <Link to="/decoded" onClick={() => setIsOpen(false)} className="mx-4 my-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-sm font-bold flex items-center gap-3 group">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">AI Decoded</span>
                </Link>

                <Link to="/trending" onClick={() => setIsOpen(false)} className="mx-4 mb-2 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/20 text-sm font-bold flex items-center gap-3 group">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Trending AI Tech</span>
                </Link>

                <Link to="/young-minds" onClick={() => setIsOpen(false)} className="mx-4 mb-2 px-4 py-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-sm font-bold flex items-center gap-3 text-yellow-400">
                  Young Minds
                </Link>

                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">News</div>
                <Link to="/updates" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><Newspaper className="w-4 h-4" /> AI News</Link>
                <Link to="/videos" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><Video className="w-4 h-4" /> Videos</Link>

                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Discover</div>
                <Link to="/deepmind" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><Brain className="w-4 h-4" /> Google DeepMind</Link>
                <Link to="/research" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><BookOpen className="w-4 h-4" /> Research</Link>
                <Link to="/jobs" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><Briefcase className="w-4 h-4" /> Jobs</Link>
                <Link to="/learning" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Learning</Link>
                <Link to="/tools" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><Wrench className="w-4 h-4" /> Tools</Link>
                <Link to="/history" onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm ml-2 hover:text-primary flex items-center gap-2"><Clock className="w-4 h-4" /> Timeline</Link>

                <div className="border-t border-border/50 my-2" />
                <Link to="/blog" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">Blog</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted">About</Link>

                <div className="px-4 py-3 flex items-center justify-between border-t border-border/50 mt-2">
                  <span className="text-sm font-medium text-muted-foreground">My Library</span>
                  <LibraryDrawer />
                </div>
                <div className="px-4 py-3 flex items-center justify-between border-t border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                  <ThemeToggle />
                </div>
                <div className="px-4 py-3 flex items-center justify-between border-t border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">Account</span>
                  <UserMenu />
                </div>
                <div className="px-4 py-3 flex items-center justify-between border-t border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">Site Traffic</span>
                  <VisitorHUD />
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <BroadcastModal isOpen={broadcastOpen} onClose={() => setBroadcastOpen(false)} />
      </motion.nav>
    </>
  );
}
