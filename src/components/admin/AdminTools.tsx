import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { DataManager } from '@/lib/dataManager';
import { Tool } from '@/data/toolsData';

export function AdminTools() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTool, setEditingTool] = useState<Tool | null>(null);

    // Form State
    const emptyForm = {
        name: '',
        description: '',
        url: '',
        category: 'Dev',
        tags: '',
        pricing: 'Free',
        icon: '🔧'
    };
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        loadTools();
    }, []);

    const loadTools = async () => {
        setIsLoading(true);
        try {
            const data = await DataManager.getTools();
            setTools(data);
        } catch (error) {
            toast.error("Failed to load tools");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDialog = (tool?: Tool) => {
        if (tool) {
            setEditingTool(tool);
            setFormData({
                name: tool.name,
                description: tool.description,
                url: tool.url,
                category: tool.category,
                tags: tool.tags.join(', '),
                pricing: tool.pricing || 'Free',
                icon: typeof tool.icon === 'string' ? tool.icon : '🔧'
            });
        } else {
            setEditingTool(null);
            setFormData(emptyForm);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.url) {
            toast.error("Name and URL are required");
            return;
        }

        const toastId = toast.loading("Saving...");
        try {
            const toolData = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            };

            if (editingTool) {
                await DataManager.updateTool(editingTool.id, toolData);
                toast.success("Tool updated!", { id: toastId });
            } else {
                await DataManager.addTool(toolData);
                toast.success("Tool added!", { id: toastId });
            }

            setIsDialogOpen(false);
            loadTools();
        } catch (error) {
            console.error(error);
            toast.error("Failed to save tool", { id: toastId });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this tool?")) return;

        const toastId = toast.loading("Deleting...");
        try {
            await DataManager.deleteTool(id);
            toast.success("Tool deleted", { id: toastId });
            loadTools();
        } catch (error) {
            toast.error("Failed to delete", { id: toastId });
        }
    };

    const filteredTools = tools.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Tools Manager</h2>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tool
                </Button>
            </div>

            {/* Quick Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            <Card className="bg-card/40 border-white/10">
                <CardHeader>
                    <CardTitle>Directory ({tools.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredTools.slice(0, 10).map(tool => (
                                <div key={tool.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 shrink-0 rounded flex items-center justify-center bg-background border border-white/10 text-xl">
                                            {typeof tool.icon === 'string' ? tool.icon : '🔧'}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-medium text-sm truncate">{tool.name}</h4>
                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{tool.category}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(tool)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(tool.id)} className="h-8 w-8 text-muted-foreground hover:text-red-400">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {filteredTools.length === 0 && (
                                <p className="text-center text-muted-foreground py-4">No tools found.</p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-card border-white/10">
                    <DialogHeader>
                        <DialogTitle>{editingTool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
                        <DialogDescription>
                            {editingTool ? 'Update existing tool details.' : 'Add a new AI tool to the directory.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="url" className="text-right">URL</Label>
                            <Input id="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Desc</Label>
                            <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tags" className="text-right">Tags</Label>
                            <Input id="tags" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="col-span-3" placeholder="Comma separated" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
