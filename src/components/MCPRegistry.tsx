import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, Globe, Github, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MCPServer {
    server: {
        name: string;
        description: string;
        version: string;
        repository?: {
            url?: string;
            source?: string;
        };
        packages?: {
            registryType: string;
            identifier: string;
            version: string;
        }[];
    };
    _meta?: {
        'io.modelcontextprotocol.registry/official'?: {
            status: string;
            publishedAt: string;
        };
    };
}

interface ApiResponse {
    results: MCPServer[];
    metadata: {
        nextCursor?: string;
    };
}

export function MCPRegistry() {
    const [servers, setServers] = useState<MCPServer[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [cursor, setCursor] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [error, setError] = useState<string | null>(null);

    const fetchServers = async (nextCursor?: string) => {
        try {
            const url = new URL('https://registry.modelcontextprotocol.io/v0/servers');
            if (nextCursor) {
                url.searchParams.set('cursor', nextCursor);
            }

            const res = await fetch(url.toString());
            if (!res.ok) throw new Error('Failed to fetch registry');

            const data: ApiResponse = await res.json();

            if (nextCursor) {
                setServers(prev => [...prev, ...data.results]);
            } else {
                setServers(data.results);
            }

            setCursor(data.metadata?.nextCursor || null);
        } catch (err) {
            console.error(err);
            setError('Failed to load MCP Registry. Please try again later.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchServers();
    }, []);

    const handleLoadMore = () => {
        if (cursor) {
            setLoadingMore(true);
            fetchServers(cursor);
        }
    };

    const filteredServers = servers.filter(item =>
        item.server.name.toLowerCase().includes(search.toLowerCase()) ||
        item.server.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full max-w-5xl mx-auto py-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 h-12">
                    Official MCP Registry
                </h2>
                <p className="text-muted-foreground">
                    Discover community-submitted Model Context Protocol servers.
                </p>
            </div>

            {/* Search */}
            <div className="relative max-w-xl mx-auto mb-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search registry..."
                    className="pl-12 py-6 bg-white/5 border-white/10 backdrop-blur-md rounded-xl focus-visible:ring-blue-500/50"
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                </div>
            ) : error ? (
                <div className="text-center py-20 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                    {error}
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {filteredServers.map((item) => (
                            <ServerRow key={item.server.name + item.server.version} item={item} />
                        ))}
                    </AnimatePresence>

                    {filteredServers.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No servers found matching "{search}"
                        </div>
                    )}

                    {cursor && !search && (
                        <div className="flex justify-center pt-8">
                            <Button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                variant="outline"
                                className="min-w-[150px] border-white/10 hover:bg-white/5"
                            >
                                {loadingMore ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Load More
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function ServerRow({ item }: { item: MCPServer }) {
    const { name, description, repository, packages } = item.server;
    const isGithub = repository?.source === 'github';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            layout
        >
            <Card className="p-5 bg-black/40 border-white/10 hover:border-blue-500/30 transition-all duration-200 group">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
                                {name}
                            </h3>
                            {item._meta?.['io.modelcontextprotocol.registry/official']?.status === 'active' && (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] h-5">
                                    Official
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {description || "No description provided."}
                        </p>

                        {(packages && packages.length > 0) && (
                            <div className="flex gap-2">
                                {packages.map(pkg => (
                                    <Badge key={pkg.identifier} variant="outline" className="text-[10px] bg-white/5 border-white/5 text-slate-400 flex items-center gap-1">
                                        <Package className="w-3 h-3" />
                                        {pkg.registryType === 'pypi' ? 'PyPI' : 'NPM'}: {pkg.identifier}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {repository?.url && (
                            <Button size="sm" variant="outline" className="h-9 border-white/10 hover:bg-white/5 bg-transparent" asChild>
                                <a href={repository.url} target="_blank" rel="noopener noreferrer">
                                    {isGithub ? <Github className="w-4 h-4 mr-2" /> : <Globe className="w-4 h-4 mr-2" />}
                                    Source
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
