import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DataManager } from '@/lib/dataManager';
import { toast } from 'sonner';

export interface BookmarkItem {
    id: string;
    title: string;
    url: string;
    source: string;
    type: string;
    publishedAt: string | Date;
    [key: string]: any; // Allow extra props
}

export function useBookmarks() {
    const { user } = useAuth();
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [loading, setLoading] = useState(false);

    // Load bookmarks on mount or auth change
    useEffect(() => {
        const loadBookmarks = async () => {
            if (user) {
                // Cloud Mode
                setLoading(true);
                const { success, data } = await DataManager.getBookmarks(user.id);
                if (success && data) {
                    // Normalize data from DB
                    const normalized = data.map((b: any) => ({
                        id: b.item_id, // Important: Map item_id back to id for frontend consistency
                        title: b.title,
                        url: b.url,
                        source: b.source,
                        type: b.type,
                        publishedAt: b.published_at
                    }));
                    setBookmarks(normalized);
                }
                setLoading(false);
            } else {
                // Local Mode
                const stored = localStorage.getItem('onai_bookmarks');
                if (stored) {
                    try {
                        setBookmarks(JSON.parse(stored));
                    } catch (e) {
                        console.error("Failed to parse local bookmarks", e);
                    }
                } else {
                    setBookmarks([]);
                }
            }
        };

        loadBookmarks();
    }, [user]);

    const isBookmarked = (id: string) => {
        return bookmarks.some(item => item.id === id);
    };

    const addBookmark = async (item: BookmarkItem) => {
        // Optimistic UI update
        const newItem = { ...item, publishedAt: item.publishedAt || new Date().toISOString() };
        setBookmarks(prev => [newItem, ...prev]);

        if (user) {
            const { success } = await DataManager.addBookmark(user.id, newItem);
            if (!success) {
                // Revert on failure
                setBookmarks(prev => prev.filter(b => b.id !== item.id));
                toast.error("Failed to save bookmark");
            } else {
                toast.success("Saved to Library");
            }
        } else {
            // Local Storage
            const newBookmarks = [newItem, ...bookmarks];
            localStorage.setItem('onai_bookmarks', JSON.stringify(newBookmarks));
            toast.success("Saved to Local Library (Login to sync)");
        }
    };

    const removeBookmark = async (id: string) => {
        // Optimistic UI update
        const prevBookmarks = [...bookmarks];
        setBookmarks(prev => prev.filter(b => b.id !== id));

        if (user) {
            const { success } = await DataManager.removeBookmark(user.id, id);
            if (!success) {
                setBookmarks(prevBookmarks); // Revert
                toast.error("Failed to remove bookmark");
            } else {
                toast.success("Removed from Library");
            }
        } else {
            // Local Storage
            const newBookmarks = prevBookmarks.filter(b => b.id !== id);
            localStorage.setItem('onai_bookmarks', JSON.stringify(newBookmarks));
            toast.success("Removed");
        }
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
        loading,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark
    };
}
