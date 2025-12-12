
import { toolsData, Tool } from '../data/toolsData';
import { supabase } from './supabase';

const USE_SUPABASE = import.meta.env.VITE_USE_SUPABASE === 'true';

export const DataManager = {
    /**
     * Fetch tools from the appropriate source.
     */
    getTools: async (): Promise<Tool[]> => {
        if (USE_SUPABASE && supabase) {
            try {
                const { data, error } = await supabase
                    .from('tools')
                    .select('*')
                    .order('name', { ascending: true });

                if (error) {
                    console.error('Supabase error:', error);
                    throw error;
                }

                // Ideally, we validate 'data' here to match Tool[] interface
                // For now, we cast it, assuming DB schema matches types
                return (data as unknown) as Tool[];
            } catch (err) {
                console.warn('Failed to fetch from Supabase, falling back to local data.', err);
                return toolsData;
            }
        }

        // Fallback / Static Mode
        return toolsData;
    },

    /**
     * (Future) Add a new tool
     */
    addTool: async (tool: Omit<Tool, 'id'>) => {
        if (!USE_SUPABASE) {
            console.warn('Cannot add tool in static mode.');
            return null;
        }
        // Implementation for admin to add tools
        return null;
    },

    /**
     * Seed the database with local toolsData.
     * WARNING: This should only be run once or when you want to reset/update.
     */
    seedTools: async () => {
        if (!USE_SUPABASE || !supabase) {
            console.error("Supabase is not enabled or configured.");
            return { success: false, message: "Supabase disabled" };
        }

        console.log("Starting seed process...");
        let successCount = 0;
        let failCount = 0;

        for (const tool of toolsData) {
            // Remove 'id' to let Supabase generate UUIDs, 
            // OR keep it if we want consistent IDs (but UUIDs are better for DBs)
            // We use 'slug' (if we had one) or 'name' to check for duplicates?
            // The schema says `slug` is unique. Let's assume we want to insert.

            // Generate a slug if missing
            const slug = tool.id || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            const { error } = await supabase
                .from('tools')
                .upsert({
                    slug: slug,
                    name: tool.name,
                    description: tool.description,
                    category: tool.category,
                    url: tool.url,
                    icon: tool.icon,
                    tags: tool.tags,
                    is_new: tool.isNew || false,
                    pricing: tool.pricing || 'Free',
                    how_to_use: tool.howToUse || []
                }, { onConflict: 'slug' });

            if (error) {
                console.error(`Failed to seed ${tool.name}:`, error);
                failCount++;
            } else {
                successCount++;
            }
        }

        return { success: true, message: `Seeded: ${successCount}, Failed: ${failCount}` };
    },
    /**
     * Subscribe to the newsletter
     */
    subscribeToNewsletter: async (email: string): Promise<{ success: boolean; message: string }> => {
        if (!USE_SUPABASE || !supabase) {
            console.warn("Supabase not enabled, falling back to mock success (Dev mode)");
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true, message: "Subscribed (Mock)" };
        }

        try {
            const { error } = await supabase
                .from('subscribers')
                .insert({ email });

            if (error) {
                if (error.code === '23505') { // Unique violation
                    return { success: true, message: "You are already subscribed!" };
                }
                console.error("Newsletter error:", error);
                return { success: false, message: "Failed to subscribe. Please try again." };
            }

            return { success: true, message: "Successfully subscribed!" };
        } catch (err) {
            console.error("Newsletter exception:", err);
            return { success: false, message: "An unexpected error occurred." };
        }
    },

    /**
     * Update user profile details
     */
    updateProfileDetails: async (userId: string, updates: { full_name?: string; website?: string; country?: string; bio?: string; email?: string }) => {
        if (!USE_SUPABASE || !supabase) return { success: false, error: "Supabase disabled" };

        const { error } = await supabase
            .from('profiles')
            .upsert({ id: userId, ...updates }, { onConflict: 'id' });

        return { success: !error, error };
    },

    /**
     * Update user interests
     */
    updateInterests: async (userId: string, interests: string[]) => {
        if (!USE_SUPABASE || !supabase) return { success: false, error: "Supabase disabled" };

        const { error } = await supabase
            .from('profiles')
            .upsert({ id: userId, interests }, { onConflict: 'id' });

        return { success: !error, error };
    }
};
