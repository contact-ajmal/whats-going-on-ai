import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { glossaryTerms } from "@/data/glossaryTerms";
import React from 'react';

interface GlossaryTextProps {
    children: React.ReactNode;
}

export function GlossaryText({ children }: GlossaryTextProps) {
    if (typeof children !== 'string') return <>{children}</>;

    const text = children;
    const terms = Object.keys(glossaryTerms);

    // Create a robust regex to find terms (case-insensitive, word boundaries)
    // We sort terms by length (descending) to match longer phrases first (e.g. "Neural Network" before "Neural")
    const sortedTerms = terms.sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`\\b(${sortedTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

    const parts = text.split(pattern);

    return (
        <span>
            {parts.map((part, i) => {
                // Check if this part matches a term (case-insensitive)
                const matchedTerm = sortedTerms.find(t => t.toLowerCase() === part.toLowerCase());

                if (matchedTerm) {
                    return (
                        <TooltipProvider key={i}>
                            <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                    <span className="text-primary font-semibold border-b border-dashed border-primary/50 cursor-help hover:bg-primary/10 transition-colors">
                                        {part}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-card/95 backdrop-blur border border-primary/20 p-3 shadow-xl">
                                    <div className="space-y-1">
                                        <p className="font-bold text-primary">{matchedTerm}</p>
                                        <p className="text-sm text-muted-foreground">{glossaryTerms[matchedTerm]}</p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </span>
    );
}
