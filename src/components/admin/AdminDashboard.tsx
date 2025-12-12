import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Newspaper, Hammer } from 'lucide-react';

export function AdminDashboard() {
    const [stats, setStats] = useState({
        subscribers: '--',
        tools: '--',
        posts: '--'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            try {
                console.log("Fetching Admin Stats...", { hasToken: !!token, repo });

                // 1. Fetch Subscribers Count
                let subCount = 0;
                if (supabase) {
                    const { count, error } = await supabase.from('subscribers').select('*', { count: 'exact', head: true });
                    if (error) console.error("Subscribers fetch error:", error);
                    else subCount = count || 0;
                } else {
                    console.warn("Supabase client missing");
                }

                // 2. Fetch Tools Count
                let toolCount = 0;
                if (supabase) {
                    const { count, error } = await supabase.from('tools').select('*', { count: 'exact', head: true });
                    if (error) console.error("Tools fetch error:", error);
                    else toolCount = count || 0;
                }

                // 3. Fetch Blog Posts Count (via GitHub Config)
                let postCount = 0;
                if (token && repo) {
                    try {
                        const client = new GitHubClient(token, repo);
                        const configFile = await client.getFile('src/lib/config.ts');
                        const match = configFile.content.match(/const availablePosts(?:\s*:\s*[^=]+)?\s*=\s*\[([\s\S]*?)\]/);
                        if (match && match[1]) {
                            postCount = match[1].split(',').filter(p => !p.trim().startsWith('//')).length;
                        }
                    } catch (ghError) {
                        console.error("GitHub fetch error:", ghError);
                    }
                } else {
                    console.warn("GitHub token/repo missing");
                }

                setStats({
                    subscribers: subCount,
                    tools: toolCount,
                    posts: postCount
                });

            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, [token, repo]);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-card/40 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loading ? '--' : stats.subscribers}</div>
                        <p className="text-xs text-muted-foreground">
                            +0% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tools</CardTitle>
                        <Hammer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{loading ? '--' : stats.tools}</div>
                        <p className="text-xs text-muted-foreground">
                            Indexed in directory
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-card/40 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                        <Newspaper className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">
                            Published via GitHub
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
