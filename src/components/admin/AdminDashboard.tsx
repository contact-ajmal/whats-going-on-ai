import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Newspaper, Hammer } from 'lucide-react';

export function AdminDashboard() {
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
                        <div className="text-2xl font-bold">--</div>
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
                        <div className="text-2xl font-bold">--</div>
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
