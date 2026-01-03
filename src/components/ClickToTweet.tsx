import { Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClickToTweetProps {
    quote: string;
    author?: string;
    hashtags?: string[];
    url?: string;
}

export function ClickToTweet({ quote, author, hashtags = ['AI', 'WhatsGoingOnAI'], url }: ClickToTweetProps) {
    const handleTweet = () => {
        const currentUrl = url || window.location.href;
        const items = [quote];

        if (author) items.push(`- ${author}`);
        items.push(currentUrl);
        if (hashtags.length) items.push(hashtags.map(t => `#${t}`).join(' '));

        const text = items.join('\n\n');
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

        window.open(twitterUrl, '_blank', 'width=550,height=420');
    };

    return (
        <div className="my-8 relative overflow-hidden rounded-xl border border-sky-500/30 bg-sky-500/5 p-6 md:p-8">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Twitter size={100} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex-1">
                    <blockquote className="text-xl md:text-2xl font-medium text-sky-100 leading-relaxed font-heading">
                        "{quote}"
                    </blockquote>
                    {author && (
                        <cite className="block mt-3 text-sm font-medium text-sky-300 not-italic">
                            — {author}
                        </cite>
                    )}
                </div>

                <Button
                    onClick={handleTweet}
                    className="shrink-0 bg-black hover:bg-black/80 text-white border border-white/10 gap-2 transition-all"
                >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Post to X
                </Button>
            </div>
        </div>
    );
}
