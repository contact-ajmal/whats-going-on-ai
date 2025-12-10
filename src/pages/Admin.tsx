import { useState, useEffect } from 'react';
import { GitHubClient } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

const Admin = () => {
    const [token, setToken] = useState('');
    const [repo, setRepo] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Post Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('gh_token');
        const storedRepo = localStorage.getItem('gh_repo');
        if (storedToken && storedRepo) {
            setToken(storedToken);
            setRepo(storedRepo);
            verifyToken(storedToken, storedRepo);
        }
    }, []);

    const verifyToken = async (t: string, r: string) => {
        setIsLoading(true);
        try {
            const client = new GitHubClient(t, r);
            await client.getUser();
            setIsAuthenticated(true);
            localStorage.setItem('gh_token', t);
            localStorage.setItem('gh_repo', r);
            toast.success('Connected to GitHub');
        } catch (error) {
            console.error(error);
            toast.error('Connection failed. Check Token and Repo.');
            localStorage.removeItem('gh_token');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        verifyToken(token, repo);
    };

    const handlePublish = async () => {
        if (!title || !content) {
            toast.error('Title and Content are required');
            return;
        }

        setIsLoading(true);
        try {
            const client = new GitHubClient(token, repo);
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const date = new Date().toISOString().split('T')[0];
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

            const fileContent = `---
title: ${title}
date: ${date}
description: ${description}
tags: [${tagsArray.join(', ')}]
---

${content}`;

            // 1. Create Post File
            await client.createFile(
                `public/posts/${slug}.md`,
                fileContent,
                `feat: add post ${title}`
            );

            // 2. Update config.ts registry
            const configPath = 'src/lib/config.ts';
            const configFile = await client.getFile(configPath);

            // Basic regex to insert slug into the array
            // Looks for: const availablePosts = [ ... ];
            // We insert the new slug at the beginning
            const updatedConfigContent = configFile.content.replace(
                /(const availablePosts(?:\s*:\s*[^=]+)?\s*=\s*\[)/,
                `$1\n  '${slug}',`
            );

            if (updatedConfigContent === configFile.content) {
                throw new Error("Could not find 'availablePosts' array in src/lib/config.ts");
            }

            await client.createFile(
                configPath,
                updatedConfigContent,
                `chore: register post ${slug}`
            );

            toast.success('Post Published! Site will update closely.');

            // Reset form
            setTitle('');
            setDescription('');
            setTags('');
            setContent('');

        } catch (error: any) {
            console.error(error);
            toast.error(`Publish Failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-background">
                <Card className="w-full max-w-md border-primary/20 bg-black/50 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Admin Access</CardTitle>
                        <CardDescription>Enter your GitHub credentials to manage posts.</CardDescription>
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
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">New Post</h1>
                <Button variant="outline" onClick={() => {
                    localStorage.clear();
                    setIsAuthenticated(false);
                    setToken('');
                }}>Logout</Button>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label>Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title..." />
                </div>

                <div className="grid gap-2">
                    <Label>Description</Label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary..." />
                </div>

                <div className="grid gap-2">
                    <Label>Tags</Label>
                    <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="AI, Tech, Future (comma separated)" />
                </div>

                <div className="grid gap-2">
                    <Label>Content (Markdown)</Label>
                    <Textarea
                        className="min-h-[400px] font-mono"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="# Hello World..."
                    />
                </div>

                <Button size="lg" onClick={handlePublish} disabled={isLoading} className="w-full md:w-auto md:self-start">
                    {isLoading ? 'Publishing...' : 'Publish Post'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                    Publishing will commit to <code>{repo}</code> and trigger a deployment.
                </p>
            </div>
        </div>
    );
};

export default Admin;
