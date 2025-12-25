import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export const TextReveal = ({ text, className = "", delay = 0, duration = 2000 }: TextRevealProps) => {
    const [display, setDisplay] = useState("");

    // Use a predictable "scramble" effect
    useEffect(() => {
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
            }

            iterations += 1 / 2; // Speed of reveal
        }, 40); // Tick rate

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className={`font-mono ${className}`}>
            {display}
        </span>
    );
};
