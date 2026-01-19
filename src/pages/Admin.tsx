import { useState, useEffect } from 'react';
import { GitHubClient } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { FeedStatusDashboard } from '@/components/admin/FeedStatusDashboard';
import { AdminBlog } from '@/components/admin/AdminBlog';
import { AdminNewsletter } from '@/components/admin/AdminNewsletter';
import { AdminTools } from '@/components/admin/AdminTools';
import { DailyNewsletterGenerator } from '@/components/admin/DailyNewsletterGenerator';

const Admin = () => {
    const [token, setToken] = useState('');
    const [repo, setRepo] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [activeTab, setActiveTab] = useState<'dashboard' | 'status' | 'blog' | 'newsletter' | 'social' | 'tools'>('dashboard');

    useEffect(() => {
        const storedToken = localStorage.getItem('gh_token');
        const storedRepo = localStorage.getItem('gh_repo');
        if (storedToken && storedRepo) {
            setToken(storedToken);
            setRepo(storedRepo);
            verifyToken(storedToken, storedRepo, true); // initial load
        }
    }, []);

    const verifyToken = async (t: string, r: string, initial = false) => {
        setIsLoading(true);
        try {
            // Trim inputs to avoid whitespace issues
            const cleanToken = t.trim();
            const cleanRepo = r.trim().replace('https://github.com/', '');

            console.log('Verifying GitHub connection...', { repo: cleanRepo, tokenLength: cleanToken.length });

            const client = new GitHubClient(cleanToken, cleanRepo);
            const user = await client.getUser();
            console.log('GitHub User verified:', user.login);

            setIsAuthenticated(true);
            setToken(cleanToken);
            setRepo(cleanRepo);

            localStorage.setItem('gh_token', cleanToken);
            localStorage.setItem('gh_repo', cleanRepo);

            if (!initial) toast.success(`Connected as ${user.login}`);
        } catch (error: any) {
            console.error('Admin Login verification failed:', error);
            const msg = error.message || 'Unknown error';

            if (!initial) {
                toast.error(`Connection failed: ${msg}`);
                // Detailed debug toast
                if (msg.includes('401') || msg.includes('Invalid Token')) {
                    toast.info("Check if your Token has 'repo' scope and hasn't expired.");
                } else if (msg.includes('404')) {
                    toast.info("Repo not found. Make sure it is 'username/repo' and the Token has access.");
                }
            } else {
                console.warn('Initial session check failed, clearly invalid credentials.');
                // Only clear if explicitly invalid, to avoid clearing on network errors? 
                // Currently safe to clear to force re-login.
                localStorage.removeItem('gh_token');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        verifyToken(token, repo);
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setToken('');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-background">
                <Card className="w-full max-w-md border-primary/20 bg-black/50 backdrop-blur-xl">
                    <CardHeader>
                        <div>
                            <CardTitle className="text-2xl text-primary">Admin Access</CardTitle>
                            <CardDescription>Enter your GitHub credentials to manage contents.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label>GitHub Personal Access Token</Label>
                                <Input
                                    type="password"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="ghp_..."
                                    required
                                />
                                <p className="text-xs text-muted-foreground">Requires 'repo' scope.</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Repository</Label>
                                <Input
                                    value={repo}
                                    onChange={(e) => setRepo(e.target.value)}
                                    placeholder="username/repo"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Connecting...' : 'Connect'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div >
        );
    }

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 container mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    <div className="bg-card/20 backdrop-blur-sm border border-white/5 rounded-xl p-6 min-h-[calc(100vh-140px)] animate-in fade-in slide-in-from-right-4 duration-300">
                        {activeTab === 'dashboard' && <AdminDashboard token={token} repo={repo} />}
                        {activeTab === 'status' && <FeedStatusDashboard />}
                        {activeTab === 'blog' && <AdminBlog token={token} repo={repo} />}
                        {activeTab === 'newsletter' && <AdminNewsletter />}
                        {activeTab === 'social' && <DailyNewsletterGenerator token={token} repo={repo} />}
                        {activeTab === 'tools' && <AdminTools />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
