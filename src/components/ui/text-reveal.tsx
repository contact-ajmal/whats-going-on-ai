import { useEffect, useState } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export const TextReveal = ({ text, className = "", delay = 0, duration = 2000 }: TextRevealProps) => {
    // Start with actual text for immediate visibility (mobile-friendly)
    const [display, setDisplay] = useState(text);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || hasAnimated) {
            setDisplay(text);
            return;
        }

        // Delay before starting animation
        const delayTimer = setTimeout(() => {
            let iterations = 0;
            const interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iterations) {
                                return text[index];
                            }
                            if (letter === " ") return " ";
                            return letters[Math.floor(Math.random() * letters.length)];
                        })
                        .join("")
                );

                if (iterations >= text.length) {
                    clearInterval(interval);
                    setHasAnimated(true);
                }

                iterations += 1 / 2;
            }, 40);

            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(delayTimer);
    }, [text, delay, hasAnimated]);

    return (
        <span className={`font-mono ${className}`}>
            {display}
        </span>
    );
};

