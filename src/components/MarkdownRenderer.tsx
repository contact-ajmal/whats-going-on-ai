
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { GlossaryText } from '@/components/GlossaryText';
import { ClickToTweet } from '@/components/ClickToTweet';

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const lang = match ? match[1] : '';

                        if (!inline && lang === 'tweet') {
                            const content = String(children).replace(/\n$/, '');
                            // Parse optional author if provided as "Quote -- Author"
                            const parts = content.split(' -- ');
                            const quote = parts[0];
                            const author = parts.length > 1 ? parts[1] : undefined;

                            return <ClickToTweet quote={quote} author={author} />;
                        }

                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={atomDark}
                                language={lang}
                                PreTag="div"
                                className="rounded-lg border border-white/10 !bg-black/50 !p-4 !my-4 shadow-lg text-sm"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={`${className} bg-primary/10 text-primary px-1 py-0.5 rounded font-mono text-sm border border-primary/20`} {...props}>
                                {children}
                            </code>
                        );
                    },
                    // Customize text elements if needed
                    p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6 mb-6 text-muted-foreground"><GlossaryText>{children}</GlossaryText></p>,
                    h1: ({ children }) => <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mt-12 font-heading text-foreground">{children}</h1>,
                    h2: ({ children }) => <h2 className="scroll-m-20 border-b border-white/10 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6 mt-12 font-heading text-foreground">{children}</h2>,
                    h3: ({ children }) => <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-8 font-heading text-foreground">{children}</h3>,
                    ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground">{children}</ul>,
                    ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground">{children}</ol>,
                    blockquote: ({ children }) => <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground/80 bg-primary/5 py-4 pr-4 rounded-r-lg">{children}</blockquote>,
                    a: ({ href, children }) => <a href={href} className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors" target="_blank" rel="noopener noreferrer">{children}</a>,
                    img: ({ src, alt }) => (
                        <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                            <img src={src} alt={alt} className="w-full h-auto object-cover" />
                        </div>
                    ),
                    table: ({ children }) => <div className="my-6 w-full overflow-y-auto"><table className="w-full text-sm text-left">{children}</table></div>,
                    th: ({ children }) => <th className="border border-white/10 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right bg-white/5">{children}</th>,
                    td: ({ children }) => <td className="border border-white/10 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">{children}</td>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
