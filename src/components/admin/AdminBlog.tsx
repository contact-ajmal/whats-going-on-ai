import { useState, useRef, useEffect } from 'react';
import { GitHubClient } from '@/lib/github';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { EditorToolbar } from '@/components/EditorToolbar';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';

interface AdminBlogProps {
    token: string;
    repo: string;
}

export function AdminBlog({ token, repo }: AdminBlogProps) {
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
        if (token && repo) {
            const client = new GitHubClient(token, repo);
            loadPostList(client);
        }
    }, [token, repo]);

    const loadPostList = async (client: GitHubClient) => {
        try {
            const configFile = await client.getFile('src/lib/config.ts');
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

            const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
            const match = file.content.match(frontmatterRegex);

            if (match) {
                const frontmatter = match[1];
                const cleanContent = match[2];

                const getMeta = (key: string) => {
                    const line = frontmatter.split('\n').find(l => l.startsWith(key + ':'));
                    return line ? line.split(':').slice(1).join(':').trim() : '';
                };

                setTitle(getMeta('title').replace(/^['"]|['"]$/g, ''));
                setDescription(getMeta('description'));
                setOriginalDate(getMeta('date'));

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

    const handleInsert = (textToInsert: string) => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const mainText = textareaRef.current.value;
        const newText = mainText.substring(0, start) + textToInsert + mainText.substring(end);
        setContent(newText);
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
            const url = publicPath.startsWith('http') ? publicPath : `${import.meta.env.BASE_URL}${publicPath}`;
            const imageMarkdown = `\n![${file.name}](${url})\n`;
            handleInsert(imageMarkdown);
            toast.success('Image uploaded!', { id: loadingToast });
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

            await client.createFile(
                `public/posts/${slug}.md`,
                fileContent,
                `feat: ${isEditing ? 'update' : 'add'} post ${title}`
            );

            if (!isEditing) {
                const configPath = 'src/lib/config.ts';
                const configFile = await client.getFile(configPath);
                const updatedConfigContent = configFile.content.replace(
                    /(const availablePosts(?:\s*:\s*[^=]+)?\s*=\s*\[)/,
                    `$1\n  '${slug}',`
                );
                if (updatedConfigContent !== configFile.content) {
                    await client.createFile(configPath, updatedConfigContent, `chore: register post ${slug}`);
                }
            }

            toast.success(isEditing ? 'Post Updated!' : 'Post Published!');
            if (!isEditing) {
                await loadPostList(client);
                setSelectedPost(slug);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(`Publish Failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Blog Editor</h2>
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
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label>Title</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title..."
                        disabled={selectedPost !== 'new'}
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
                        <EditorToolbar onInsert={handleInsert} onImageUpload={handleImageUpload} disabled={isLoading} />
                        <Tabs defaultValue="write" className="w-full relative">
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
            </div>
        </div>
    );
}
