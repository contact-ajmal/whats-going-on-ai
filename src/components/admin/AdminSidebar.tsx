import { LayoutDashboard, FileText, Mail, Wrench, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
    activeTab: 'dashboard' | 'blog' | 'newsletter' | 'tools';
    setActiveTab: (tab: 'dashboard' | 'blog' | 'newsletter' | 'tools') => void;
    onLogout: () => void;
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'blog', label: 'Blog Editor', icon: FileText },
        { id: 'newsletter', label: 'Newsletter', icon: Mail },
        { id: 'tools', label: 'Tools Manager', icon: Wrench },
    ] as const;

    return (
        <div className="w-full md:w-64 shrink-0 md:h-[calc(100vh-100px)] bg-card/30 backdrop-blur-xl border-r border-white/5 p-4 flex flex-col gap-2 rounded-xl h-fit">
            <div className="mb-6 px-4 py-2">
                <h2 className="text-xl font-bold text-primary tracking-tight">Command Center</h2>
                <p className="text-xs text-muted-foreground">System v2.0</p>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        variant={activeTab === item.id ? 'secondary' : 'ghost'}
                        className={`w-full justify-start gap-3 ${activeTab === item.id ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </Button>
                ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-white/5">
                <Button variant="ghost" className="w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={onLogout}>
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
