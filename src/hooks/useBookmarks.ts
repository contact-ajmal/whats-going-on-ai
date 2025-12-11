import { useState, useEffect } from 'react';

export interface BookmarkItem {
    id: string;
    title: string;
    url: string;
    source: string;
    type: 'news' | 'research' | 'blog';
    publishedAt: string; // ISO string
}

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem('onai_bookmarks');
        if (stored) {
            try {
                setBookmarks(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse bookmarks", e);
            }
        }
    }, []);

    const isBookmarked = (id: string) => {
        return bookmarks.some(item => item.id === id);
    };

    const addBookmark = (item: BookmarkItem) => {
        setBookmarks(prev => {
            if (prev.some(b => b.id === item.id)) return prev;
            const newBookmarks = [item, ...prev];
            localStorage.setItem('onai_bookmarks', JSON.stringify(newBookmarks));
            return newBookmarks;
        });
    };

    const removeBookmark = (id: string) => {
        setBookmarks(prev => {
            const newBookmarks = prev.filter(b => b.id !== id);
            localStorage.setItem('onai_bookmarks', JSON.stringify(newBookmarks));
            return newBookmarks;
        });
    };

    const toggleBookmark = (item: BookmarkItem) => {
        if (isBookmarked(item.id)) {
            removeBookmark(item.id);
        } else {
            addBookmark(item);
        }
    };

    return {
        bookmarks,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark
    };
}
