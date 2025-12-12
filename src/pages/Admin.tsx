import { useState, useEffect, useRef } from 'react';
import { GitHubClient } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { EditorToolbar } from '@/components/EditorToolbar';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const Admin = () => {
    const [token, setToken] = useState('');
    const [repo, setRepo] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Post List State
    const [existingPosts, setExistingPosts] = useState<string[]>([]);
    const [selectedPost, setSelectedPost] = useState<string>('new');

    // Post Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [originalDate, setOriginalDate] = useState('');

    const textareaRef = useRef<HTMLTextAreaElement>(null);

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
            const client = new GitHubClient(t, r);
            await client.getUser();
            setIsAuthenticated(true);
            localStorage.setItem('gh_token', t);
            localStorage.setItem('gh_repo', r);
            if (!initial) toast.success('Connected to GitHub');

            // Load list of posts
            await loadPostList(client);
        } catch (error) {
            console.error(error);
            if (!initial) toast.error('Connection failed. Check Token and Repo.');
            localStorage.removeItem('gh_token');
        } finally {
            setIsLoading(false);
        }
    };

    const loadPostList = async (client: GitHubClient) => {
        try {
            const configFile = await client.getFile('src/lib/config.ts');
            // Extract the array content: const availablePosts = [ ... ];
            const match = configFile.content.match(/const availablePosts(?:\s*:\s*[^=]+)?\s*=\s*\[([\s\S]*?)\]/);
            if (match && match[1]) {
                const posts = match[1]
                    .split(',')
                    .map(p => p.trim().replace(/['"]/g, ''))
                    .filter(p => p && !p.startsWith('//'));
                setExistingPosts(posts);
            }
        } catch (e) {
            console.error("Failed to load post list", e);
        }
    };

    const loadPost = async (slug: string) => {
        if (slug === 'new') {
            setTitle('');
            setDescription('');
            setTags('');
            setContent('');
            setOriginalDate('');
            return;
        }

        setIsLoading(true);
        try {
            const client = new GitHubClient(token, repo);
            const file = await client.getFile(`public/posts/${slug}.md`);

            // Parse Frontmatter
            const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
            const match = file.content.match(frontmatterRegex);

            if (match) {
                const frontmatter = match[1];
                const cleanContent = match[2];

                // Simple parser
                const getMeta = (key: string) => {
                    const line = frontmatter.split('\n').find(l => l.startsWith(key + ':'));
                    return line ? line.split(':').slice(1).join(':').trim() : '';
                };

                setTitle(getMeta('title').replace(/^['"]|['"]$/g, '')); // remove quotes
                setDescription(getMeta('description'));
                setOriginalDate(getMeta('date'));

                // Tags
                let tagStr = getMeta('tags');
                if (tagStr.startsWith('[') && tagStr.endsWith(']')) {
                    tagStr = tagStr.slice(1, -1);
                }
                setTags(tagStr);

                setContent(cleanContent);
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to load post content");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        verifyToken(token, repo);
    };

    const handleInsert = (textToInsert: string) => {
        if (!textareaRef.current) return;

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const mainText = textareaRef.current.value;

        const newText = mainText.substring(0, start) + textToInsert + mainText.substring(end);
        setContent(newText);

        // Restore focus
        setTimeout(() => {
            textareaRef.current?.focus();
            textareaRef.current?.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
        }, 0);
    };

    const handleImageUpload = async (file: File) => {
        const loadingToast = toast.loading('Uploading image...');
        try {
            const client = new GitHubClient(token, repo);
            const publicPath = await client.uploadImage(file);

            // If it's an absolute URL (raw GitHub), don't prepend BASE_URL
            const url = publicPath.startsWith('http') ? publicPath : `${import.meta.env.BASE_URL}${publicPath}`;
            const imageMarkdown = `\n![${file.name}](${url})\n`;
            handleInsert(imageMarkdown);

            toast.success('Image uploaded! It should appear immediately.', { id: loadingToast });
        } catch (error: any) {
            console.error(error);
            toast.error(`Upload failed: ${error.message}`, { id: loadingToast });
        }
    };

    const handlePublish = async () => {
        if (!title || !content) {
            toast.error('Title and Content are required');
            return;
        }

        setIsLoading(true);
        try {
            const client = new GitHubClient(token, repo);
            // If editing, keep original slug to avoid renaming file (simplification)
            // If new, generate slug from title
            const isEditing = selectedPost !== 'new';
            const slug = isEditing ? selectedPost : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            const date = originalDate || new Date().toISOString().split('T')[0];
            const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

            const fileContent = `---
title: ${title}
date: ${date}
description: ${description}
tags: [${tagsArray.join(', ')}]
---

${content}`;

            // 1. Create/Update Post File
            await client.createFile(
                `public/posts/${slug}.md`,
                fileContent,
                `feat: ${isEditing ? 'update' : 'add'} post ${title}`
            );

            // 2. Update config.ts registry (only if new)
            if (!isEditing) {
                const configPath = 'src/lib/config.ts';
                const configFile = await client.getFile(configPath);
                const updatedConfigContent = configFile.content.replace(
                    /(const availablePosts(?:\s*:\s*[^=]+)?\s*=\s*\[)/,
                    `$1\n  '${slug}',`
                );

                if (updatedConfigContent !== configFile.content) {
                    await client.createFile(
                        configPath,
                        updatedConfigContent,
                        `chore: register post ${slug}`
                    );
                }
            }

            toast.success(isEditing ? 'Post Updated!' : 'Post Published!');

            // Reload list if new
            if (!isEditing) {
                await loadPostList(client);
                setSelectedPost(slug); // Switch to editing mode for the new post
            }

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
                        <div>
                            <CardTitle className="text-2xl text-primary">Admin Access</CardTitle>
                            <CardDescription>Enter your GitHub credentials to manage posts.</CardDescription>
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
        <div className="min-h-screen pt-24 px-4 pb-12 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">
                    {selectedPost === 'new' ? 'New Post' : 'Edit Post'}
                </h1>
                <div className="flex gap-2">
                    <Select
                        value={selectedPost}
                        onValueChange={(val) => {
                            setSelectedPost(val);
                            loadPost(val);
                        }}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Post" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new">+ Create New</SelectItem>
                            {existingPosts.map(slug => (
                                <SelectItem key={slug} value={slug}>{slug}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={() => {
                        localStorage.clear();
                        setIsAuthenticated(false);
                        setToken('');
                    }}>Logout</Button>
                </div>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label>Title {selectedPost !== 'new' && <span className="text-xs text-muted-foreground">(Locked while editing)</span>}</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title..."
                        disabled={selectedPost !== 'new'} // Lock title when editing to prevent slug drift
                    />
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
                    <Label>Content</Label>
                    <div className="border border-input rounded-md overflow-hidden bg-background">
                        <EditorToolbar
                            onInsert={handleInsert}
                            onImageUpload={handleImageUpload}
                            disabled={isLoading}
                        />
                        <Tabs defaultValue="write" className="w-full relative"
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.currentTarget.classList.add('ring-2', 'ring-primary', 'bg-primary/5');
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.currentTarget.classList.remove('ring-2', 'ring-primary', 'bg-primary/5');
                            }}
                            onDrop={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                e.currentTarget.classList.remove('ring-2', 'ring-primary', 'bg-primary/5');

                                const files = Array.from(e.dataTransfer.files);
                                if (files.length === 0) return;

                                const file = files[0];
                                // Determine type
                                const isImage = file.type.startsWith('image/');
                                const isVideo = file.type.startsWith('video/');

                                if (!isImage && !isVideo) {
                                    toast.error('Only images and videos are supported via drag & drop');
                                    return;
                                }

                                const loadingToast = toast.loading(`Uploading ${file.name}...`);
                                try {
                                    const client = new GitHubClient(token, repo);
                                    const publicPath = await client.uploadImage(file); // Reusing uploadImage as it handles generic binary files well enough
                                    const url = publicPath.startsWith('http') ? publicPath : `${import.meta.env.BASE_URL}${publicPath}`;

                                    let insertText = '';
                                    if (isImage) {
                                        insertText = `\n![${file.name}](${url})\n`;
                                    } else {
                                        insertText = `\n<video src="${url}" controls width="100%"></video>\n`;
                                    }

                                    handleInsert(insertText);
                                    toast.success('File uploaded!', { id: loadingToast });
                                } catch (error: any) {
                                    console.error(error);
                                    toast.error(`Upload failed: ${error.message}`, { id: loadingToast });
                                }
                            }}
                        >
                            <div className='bg-muted/30 px-2 pt-2 border-b'>
                                <TabsList className="h-8">
                                    <TabsTrigger value="write" className="text-xs h-6">Write</TabsTrigger>
                                    <TabsTrigger value="preview" className="text-xs h-6">Preview</TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent value="write" className="p-0 m-0">
                                <Textarea
                                    ref={textareaRef}
                                    className="min-h-[400px] font-mono border-0 focus-visible:ring-0 rounded-none resize-y p-4"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="# Hello World..."
                                />
                            </TabsContent>
                            <TabsContent value="preview" className="p-0 m-0">
                                <div className="min-h-[400px] p-4 bg-background/50 rounded-b-md">
                                    <MarkdownRenderer content={content || '*Nothing to preview*'} />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <Button size="lg" onClick={handlePublish} disabled={isLoading} className="w-full md:w-auto md:self-start">
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    {isLoading ? 'Processing...' : (selectedPost === 'new' ? 'Publish Post' : 'Update Post')}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                    Publishing will commit to <code>{repo}</code> and trigger a deployment.
                </p>
            </div>
        </div>
    );
};

export default Admin;
