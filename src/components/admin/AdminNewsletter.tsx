import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
// import { supabase } from '@/lib/supabase'; // We'll need to export this or pass it in

// Mock interface for now until we uncomment Supabase logic
interface Subscriber {
    id: string;
    email: string;
    created_at: string;
}

export function AdminNewsletter() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadSubscribers();
    }, []);

    const loadSubscribers = async () => {
        setIsLoading(true);
        try {
            // Mock data for now, waiting for Supabase Setup
            const { supabase } = await import('@/lib/supabase');
            if (supabase) {
                const { data, error } = await supabase
                    .from('subscribers')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setSubscribers(data || []);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load subscribers");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Date Joined\n"
            + subscribers.map(s => `${s.email},${new Date(s.created_at).toLocaleDateString()}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Newsletter</h2>
                <Button onClick={handleExport} disabled={subscribers.length === 0}>
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                </Button>
            </div>

            <Card className="bg-card/40 border-white/10">
                <CardHeader>
                    <CardTitle>Subscriber List ({subscribers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="animate-spin text-primary" />
                        </div>
                    ) : subscribers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No subscribers yet.
                        </div>
                    ) : (
                        <div className="rounded-md border border-white/10 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Joined</th>
                                        <th className="px-4 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {subscribers.map((sub) => (
                                        <tr key={sub.id} className="hover:bg-white/5">
                                            <td className="px-4 py-3">{sub.email}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{new Date(sub.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-400">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
