import { useEffect } from 'react';

export function CodeProtection() {
    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // 2. Disable Keyboard Shortcuts (Inspect, View Source, Save)
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent F12
            if (e.key === 'F12') {
                e.preventDefault();
            }
            // Prevent Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element), Ctrl+U (Source)
            if (
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j' || e.key === 'c')) || // Mac
                (e.ctrlKey && e.key === 'u') ||
                (e.metaKey && e.key === 'u')
            ) {
                e.preventDefault();
            }
            // Prevent Ctrl+S (Save)
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
            }
        };

        // 3. Console Warning
        const showWarning = () => {
            console.clear();
            console.log(
                '%c🛑 STOP!',
                'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px black;'
            );
            console.log(
                '%cThis code is proprietary and protected by copyright law. \nUnauthorized use, copying, or modification is strictly prohibited.',
                'font-size: 16px; color: white; background: #222; padding: 10px; border-radius: 5px;'
            );
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);

        // Initial warning
        showWarning();

        // Re-show warning if they clear console (via interval - optional, but keeps it visible)
        const interval = setInterval(showWarning, 20000);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(interval);
        };
    }, []);

    return (
        <style>{`
            /* 4. Disable Text Selection globally */
            body {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            /* Allow select in inputs though */
            input, textarea {
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;
            }
            /* Disable Image Dragging */
            img {
                -webkit-user-drag: none;
                user-drag: none;
                pointer-events: none;
            }
        `}</style>
    );
}
