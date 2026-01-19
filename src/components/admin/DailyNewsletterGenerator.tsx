import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Copy, RefreshCw, Loader2, CheckCircle2, Calendar, ChevronLeft, ChevronRight,
    AlignLeft, AlignCenter, Type, Hash, Minus, Plus, RotateCcw, Eye, Code,
    Bold, Italic, Link2, List, ListOrdered, Quote, Heading1, Heading2, Globe
} from 'lucide-react';
import { GitHubClient } from '@/lib/github';
import { toast } from 'sonner';
import {
    aggregateAllContent,
    filterContentByDay,
    getCharacterInfo,
    NewsletterContentItem,
    ContentSource,
    SECTION_LABELS
} from '@/lib/newsletterUtils';

type Platform = 'twitter' | 'linkedin' | 'newsletter' | 'markdown';

interface FormatSettings {
    showLinks: boolean;
    showDescriptions: boolean;
    useNumbering: boolean;
    includeDate: boolean;
    includeBranding: boolean;
    headerStyle: 'bold' | 'underline' | 'plain';
    separatorStyle: 'line' | 'space' | 'dots';
}

const DEFAULT_SETTINGS: FormatSettings = {
    showLinks: true,
    showDescriptions: false,
    useNumbering: true,
    includeDate: true,
    includeBranding: true,
    headerStyle: 'bold',
    separatorStyle: 'line'
};

interface DailyNewsletterGeneratorProps {
    token?: string;
    repo?: string;
}

export function DailyNewsletterGenerator({ token, repo }: DailyNewsletterGeneratorProps) {
    const [allContent, setAllContent] = useState<NewsletterContentItem[]>([]);
    const [filteredContent, setFilteredContent] = useState<NewsletterContentItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [platform, setPlatform] = useState<Platform>('newsletter');
    const [settings, setSettings] = useState<FormatSettings>(DEFAULT_SETTINGS);
    const [headerText, setHeaderText] = useState('AI Weekly Digest');
    const [footerText, setFooterText] = useState('Visit whatsgoingonai.com for more');
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [previewMode, setPreviewMode] = useState<'preview' | 'source'>('preview');
    const [fontSize, setFontSize] = useState(14);
    const [selectedSection, setSelectedSection] = useState<ContentSource | 'all'>('all');

    // Load all content on mount
    useEffect(() => {
        loadContent();
    }, []);

    // Re-filter when date or section changes - preserve existing selections
    useEffect(() => {
        let filtered = filterContentByDay(allContent, selectedDate);

        // Apply section filter
        if (selectedSection !== 'all') {
            filtered = filtered.filter(item => item.source === selectedSection);
        }

        // Sort by section first, then by date
        filtered.sort((a, b) => {
            // First sort by source
            if (a.source !== b.source) {
                return a.source.localeCompare(b.source);
            }
            // Then by date (newest first)
            return b.date.getTime() - a.date.getTime();
        });

        setFilteredContent(filtered);
        // DON'T reset selections - preserve user's manual selections
    }, [allContent, selectedDate, selectedSection]);

    const loadContent = async () => {
        setIsLoading(true);
        try {
            const content = await aggregateAllContent();
            setAllContent(content);
        } catch (error) {
            console.error('Failed to load content:', error);
            toast.error('Failed to load content');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleItem = (id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            filteredContent.forEach(item => newSet.add(item.id));
            return newSet;
        });
    };

    const handleDeselectAll = () => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            filteredContent.forEach(item => newSet.delete(item.id));
            return newSet;
        });
    };

    const getSelectedItems = useCallback(() => {
        // Get ALL content for the day, not just what's currently filtered/visible
        const dailyItems = filterContentByDay(allContent, selectedDate);

        // Filter by selection
        const selected = dailyItems.filter(item => selectedIds.has(item.id));

        // Sort to ensure consistent output order
        return selected.sort((a, b) => {
            if (a.source !== b.source) return a.source.localeCompare(b.source);
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [allContent, selectedDate, selectedIds]);

    // Generate professional newsletter content
    const generateNewsletter = useCallback(() => {
        const selected = getSelectedItems();
        if (selected.length === 0) {
            return 'Select content items from the left panel to generate your newsletter.';
        }

        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let content = '';
        const separator = settings.separatorStyle === 'line'
            ? '─'.repeat(40)
            : settings.separatorStyle === 'dots'
                ? '• • •'
                : '';

        // Header
        if (settings.headerStyle === 'bold') {
            content += `**${headerText}**\n`;
        } else if (settings.headerStyle === 'underline') {
            content += `${headerText}\n${'─'.repeat(headerText.length)}\n`;
        } else {
            content += `${headerText}\n`;
        }

        if (settings.includeDate) {
            content += `${date}\n`;
        }

        if (separator) {
            content += `\n${separator}\n\n`;
        } else {
            content += '\n';
        }

        // Content items - Grouped by Section
        const grouped = selected.reduce((acc, item) => {
            if (!acc[item.source]) acc[item.source] = [];
            acc[item.source].push(item);
            return acc;
        }, {} as Record<string, typeof selected>);

        // Iterate through known sections to maintain order
        (Object.keys(SECTION_LABELS) as ContentSource[]).forEach(source => {
            const items = grouped[source];
            if (items && items.length > 0) {
                // Section Header
                content += `## ${SECTION_LABELS[source]}\n\n`;

                items.forEach((item, index) => {
                    const prefix = settings.useNumbering ? `${index + 1}. ` : '• ';
                    content += `${prefix}${item.title}\n`;

                    if (settings.showDescriptions && item.description) {
                        content += `   ${item.description}\n`;
                    }

                    if (settings.showLinks) {
                        content += `   ${item.url}\n`;
                    }

                    content += '\n';
                });

                content += '----------------------------------------\n\n';
            }
        });

        // Footer
        if (separator) {
            content += `${separator}\n\n`;
        }

        if (settings.includeBranding && footerText) {
            content += footerText;
        }

        return content.trim();
    }, [getSelectedItems, settings, headerText, footerText]);

    // Generate HTML preview
    const generateHTMLPreview = useCallback(() => {
        const selected = getSelectedItems();
        if (selected.length === 0) {
            return '<p style="color: #888; font-style: italic;">Select content items from the left panel to generate your newsletter.</p>';
        }

        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let html = '<div style="font-family: Georgia, serif; line-height: 1.6;">';

        // Header
        if (settings.headerStyle === 'bold') {
            html += `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 4px; color: #1a1a1a;">${headerText}</h1>`;
        } else if (settings.headerStyle === 'underline') {
            html += `<h1 style="font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 8px; margin-bottom: 4px; color: #1a1a1a;">${headerText}</h1>`;
        } else {
            html += `<h1 style="font-size: 24px; font-weight: normal; margin-bottom: 4px; color: #1a1a1a;">${headerText}</h1>`;
        }

        if (settings.includeDate) {
            html += `<p style="color: #666; font-size: 14px; margin-bottom: 24px;">${date}</p>`;
        }

        if (settings.separatorStyle === 'line') {
            html += '<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />';
        } else if (settings.separatorStyle === 'dots') {
            html += '<p style="text-align: center; color: #ccc; margin: 20px 0;">• • •</p>';
        }

        // Content items - Grouped by Section
        const grouped = selected.reduce((acc, item) => {
            if (!acc[item.source]) acc[item.source] = [];
            acc[item.source].push(item);
            return acc;
        }, {} as Record<string, typeof selected>);

        (Object.keys(SECTION_LABELS) as ContentSource[]).forEach(source => {
            const items = grouped[source];
            if (items && items.length > 0) {
                // Section Header
                html += `<h2 style="font-size: 18px; color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 25px; margin-bottom: 15px;">${SECTION_LABELS[source]}</h2>`;

                if (settings.useNumbering) {
                    html += '<ol style="padding-left: 24px; margin: 0;">';
                    items.forEach((item) => {
                        html += `<li style="margin-bottom: 16px;">`;
                        html += `<strong style="color: #1a1a1a;">${item.title}</strong>`;
                        if (settings.showDescriptions && item.description) {
                            html += `<br /><span style="color: #555; font-size: 14px;">${item.description}</span>`;
                        }
                        if (settings.showLinks) {
                            html += `<br /><a href="${item.url}" style="color: #0066cc; font-size: 13px; text-decoration: none;">${item.url}</a>`;
                        }
                        html += `</li>`;
                    });
                    html += '</ol>';
                } else {
                    html += '<ul style="padding-left: 24px; margin: 0; list-style-type: disc;">';
                    items.forEach((item) => {
                        html += `<li style="margin-bottom: 16px;">`;
                        html += `<strong style="color: #1a1a1a;">${item.title}</strong>`;
                        if (settings.showDescriptions && item.description) {
                            html += `<br /><span style="color: #555; font-size: 14px;">${item.description}</span>`;
                        }
                        if (settings.showLinks) {
                            html += `<br /><a href="${item.url}" style="color: #0066cc; font-size: 13px; text-decoration: none;">${item.url}</a>`;
                        }
                        html += `</li>`;
                    });
                    html += '</ul>';
                }
            }
        });

        // Footer
        if (settings.separatorStyle === 'line') {
            html += '<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 24px 0 16px 0;" />';
        } else if (settings.separatorStyle === 'dots') {
            html += '<p style="text-align: center; color: #ccc; margin: 24px 0 16px 0;">• • •</p>';
        }

        if (settings.includeBranding && footerText) {
            html += `<p style="color: #666; font-size: 14px; font-style: italic;">${footerText}</p>`;
        }

        html += '</div>';
        return html;
    }, [getSelectedItems, settings, headerText, footerText]);

    const handleCopy = async () => {
        const text = generateNewsletter();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('Failed to copy');
        }
    };

    const handlePublish = async () => {
        if (!token || !repo) {
            toast.error("GitHub credentials missing. Please re-login.");
            return;
        }

        const selected = getSelectedItems();
        if (selected.length === 0) {
            toast.error("No items selected!");
            return;
        }

        const toastId = toast.loading("Publishing to website...");
        try {
            const client = new GitHubClient(token, repo);

            // Generate the output structure
            const data = {
                lastUpdated: new Date().toISOString(),
                header: headerText,
                sectionLabels: SECTION_LABELS,
                items: selected.map(item => ({
                    ...item,
                    // Ensure we save necessary fields
                    source: item.source,
                    title: item.title,
                    description: item.description,
                    url: item.url,
                    date: item.date
                }))
            };

            // Save to localStorage for immediate local preview
            localStorage.setItem('daily_preview_data', JSON.stringify(data));

            await client.createFile(
                'public/data/daily_curated.json',
                JSON.stringify(data, null, 2),
                `feat: update daily curated content ${new Date().toISOString().split('T')[0]}`
            );

            toast.success("Successfully published to /daily!", { id: toastId });
        } catch (error: any) {
            console.error(error);
            toast.error(`Publish failed: ${error.message}`, { id: toastId });
        }
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        setHeaderText('AI Weekly Digest');
        setFooterText('Visit whatsgoingonai.com for more');
    };

    // Navigation functions
    const goToPreviousDay = () => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    const goToNextDay = () => {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    };

    const goToToday = () => setSelectedDate(new Date());
    const isToday = () => selectedDate.toDateString() === new Date().toDateString();
    const formatDateForInput = (date: Date) => date.toISOString().split('T')[0];

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value + 'T12:00:00');
        if (!isNaN(date.getTime())) {
            setSelectedDate(date);
        }
    };

    const formatDisplayDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const charInfo = getCharacterInfo(generateNewsletter());

    // Get section counts for dropdown
    const getSectionCounts = useCallback(() => {
        const counts: Record<ContentSource | 'all', number> = {
            all: filterContentByDay(allContent, selectedDate).length,
            trending: 0, blog: 0, agentic: 0, research: 0,
            news: 0, video: 0, jobs: 0, tools: 0, learning: 0,
            decoded: 0, deepmind: 0, robotics: 0, skills: 0, timeline: 0
        };
        filterContentByDay(allContent, selectedDate).forEach(item => {
            counts[item.source]++;
        });
        return counts;
    }, [allContent, selectedDate]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                        Newsletter Editor
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Create and format professional newsletters
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={resetSettings} variant="ghost" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    <Button onClick={loadContent} variant="outline" size="sm" disabled={isLoading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Date Selection Bar */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4" />
                    Date:
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToPreviousDay}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <input
                        type="date"
                        value={formatDateForInput(selectedDate)}
                        onChange={handleDateChange}
                        className="h-8 px-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goToNextDay}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                {!isToday() && (
                    <Button variant="outline" size="sm" onClick={goToToday}>
                        Today
                    </Button>
                )}
                <span className="text-sm text-muted-foreground ml-auto">
                    {filteredContent.length} items available
                </span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Content Selection - Left Column */}
                <Card className="xl:col-span-1 border-border/50">
                    <CardHeader className="pb-3 border-b">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base font-medium">Content</CardTitle>
                            <div className="flex gap-1">
                                <Button size="sm" variant="ghost" onClick={handleSelectAll} className="h-7 text-xs">
                                    All
                                </Button>
                                <Button size="sm" variant="ghost" onClick={handleDeselectAll} className="h-7 text-xs">
                                    None
                                </Button>
                            </div>
                        </div>
                        {/* Section Filter Dropdown */}
                        <div className="mt-3">
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Section</label>
                            <select
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value as ContentSource | 'all')}
                                className="w-full h-9 px-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                            >
                                <option value="all">All Sections ({getSectionCounts().all})</option>
                                {(Object.keys(SECTION_LABELS) as ContentSource[]).map(source => {
                                    const count = getSectionCounts()[source];
                                    return (
                                        <option key={source} value={source}>
                                            {SECTION_LABELS[source]} ({count})
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <CardDescription className="text-xs mt-2">
                            {selectedIds.size} of {filteredContent.length} selected
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="max-h-[600px] overflow-y-auto">
                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                                </div>
                            ) : filteredContent.length === 0 ? (
                                <div className="text-center py-12 px-4 text-muted-foreground text-sm">
                                    No content available for this date.
                                </div>
                            ) : (
                                (() => {
                                    let currentSection: string | null = null;
                                    return filteredContent.map((item, index) => {
                                        const showHeader = selectedSection === 'all' && item.source !== currentSection;
                                        if (showHeader) currentSection = item.source;

                                        return (
                                            <div key={item.id}>
                                                {/* Section Header */}
                                                {showHeader && (
                                                    <div className="sticky top-0 bg-muted/80 backdrop-blur-sm px-4 py-2 border-b border-border/50 z-10">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                                            {SECTION_LABELS[item.source]}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground ml-2">
                                                            ({filteredContent.filter(i => i.source === item.source).length})
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Content Item */}
                                                <div
                                                    className={`px-4 py-3 border-b border-border/30 cursor-pointer transition-colors ${selectedIds.has(item.id)
                                                        ? 'bg-primary/5'
                                                        : 'hover:bg-muted/50'
                                                        }`}
                                                    onClick={() => handleToggleItem(item.id)}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <Checkbox
                                                            checked={selectedIds.has(item.id)}
                                                            onCheckedChange={() => handleToggleItem(item.id)}
                                                            className="mt-0.5"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium leading-snug line-clamp-2">
                                                                {item.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Editor Panel - Middle/Right Columns */}
                <div className="xl:col-span-2 space-y-4">
                    {/* Format Controls */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-base font-medium">Format Options</CardTitle>
                        </CardHeader>
                        <CardContent className="py-4 space-y-4">
                            {/* Header and Footer */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                        Header
                                    </label>
                                    <input
                                        type="text"
                                        value={headerText}
                                        onChange={(e) => setHeaderText(e.target.value)}
                                        className="w-full h-9 px-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                        placeholder="Newsletter title..."
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                        Footer
                                    </label>
                                    <input
                                        type="text"
                                        value={footerText}
                                        onChange={(e) => setFooterText(e.target.value)}
                                        className="w-full h-9 px-3 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                        placeholder="Closing text..."
                                    />
                                </div>
                            </div>

                            {/* Toggle Options */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <Checkbox
                                        checked={settings.showLinks}
                                        onCheckedChange={(checked) => setSettings(s => ({ ...s, showLinks: !!checked }))}
                                    />
                                    Links
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <Checkbox
                                        checked={settings.showDescriptions}
                                        onCheckedChange={(checked) => setSettings(s => ({ ...s, showDescriptions: !!checked }))}
                                    />
                                    Descriptions
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <Checkbox
                                        checked={settings.useNumbering}
                                        onCheckedChange={(checked) => setSettings(s => ({ ...s, useNumbering: !!checked }))}
                                    />
                                    Numbered
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <Checkbox
                                        checked={settings.includeDate}
                                        onCheckedChange={(checked) => setSettings(s => ({ ...s, includeDate: !!checked }))}
                                    />
                                    Show Date
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <Checkbox
                                        checked={settings.includeBranding}
                                        onCheckedChange={(checked) => setSettings(s => ({ ...s, includeBranding: !!checked }))}
                                    />
                                    Branding
                                </label>
                            </div>

                            {/* Style Options */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                        Header Style
                                    </label>
                                    <div className="flex gap-1">
                                        {(['bold', 'underline', 'plain'] as const).map(style => (
                                            <Button
                                                key={style}
                                                size="sm"
                                                variant={settings.headerStyle === style ? 'default' : 'outline'}
                                                onClick={() => setSettings(s => ({ ...s, headerStyle: style }))}
                                                className="h-8 text-xs capitalize"
                                            >
                                                {style}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                        Separator
                                    </label>
                                    <div className="flex gap-1">
                                        {(['line', 'dots', 'space'] as const).map(style => (
                                            <Button
                                                key={style}
                                                size="sm"
                                                variant={settings.separatorStyle === style ? 'default' : 'outline'}
                                                onClick={() => setSettings(s => ({ ...s, separatorStyle: style }))}
                                                className="h-8 text-xs capitalize"
                                            >
                                                {style}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-3 border-b">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-medium">Preview</CardTitle>
                                <div className="flex items-center gap-2">
                                    {/* View Toggle */}
                                    <div className="flex border rounded-md overflow-hidden">
                                        <Button
                                            size="sm"
                                            variant={previewMode === 'preview' ? 'default' : 'ghost'}
                                            onClick={() => setPreviewMode('preview')}
                                            className="h-7 rounded-none text-xs"
                                        >
                                            <Eye className="w-3 h-3 mr-1" />
                                            Preview
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={previewMode === 'source' ? 'default' : 'ghost'}
                                            onClick={() => setPreviewMode('source')}
                                            className="h-7 rounded-none text-xs"
                                        >
                                            <Code className="w-3 h-3 mr-1" />
                                            Source
                                        </Button>
                                    </div>
                                    {/* Font Size */}
                                    <div className="flex items-center gap-1 border rounded-md px-1">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setFontSize(s => Math.max(12, s - 1))}
                                            className="h-7 w-7 p-0"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </Button>
                                        <span className="text-xs w-8 text-center">{fontSize}</span>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setFontSize(s => Math.min(20, s + 1))}
                                            className="h-7 w-7 p-0"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {/* White Background Preview Area */}
                            <div
                                className="min-h-[400px] bg-white text-black p-8 overflow-auto"
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                {previewMode === 'preview' ? (
                                    <div dangerouslySetInnerHTML={{ __html: generateHTMLPreview() }} />
                                ) : (
                                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                                        {generateNewsletter()}
                                    </pre>
                                )}
                            </div>

                            {/* Character Count & Copy */}
                            <div className="flex items-center justify-between p-4 border-t bg-muted/30">
                                <span className="text-xs text-muted-foreground">
                                    {charInfo.count} characters
                                    {charInfo.count > 280 && (
                                        <span className="text-amber-500 ml-2">
                                            (exceeds Twitter limit)
                                        </span>
                                    )}
                                </span>
                                <Button onClick={handleCopy} disabled={selectedIds.size === 0} variant="outline" className="mr-2">
                                    {copied ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copy Text
                                        </>
                                    )}
                                </Button>
                                <Button onClick={handlePublish} disabled={selectedIds.size === 0 || !token}>
                                    <Globe className="w-4 h-4 mr-2" />
                                    Publish to Website
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
