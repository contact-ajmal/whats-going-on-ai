import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

export function NewsletterSignup({ variant = 'default' }: { variant?: 'default' | 'compact' | 'minimal' }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call - In production, replace with actual endpoint (e.g., Formspree, ConvertKit)
        // For static sites, Formspree is recommended: https://formspree.io/
        // Action would be: 'https://formspree.io/f/YOUR_FORM_ID'
        // Or for this user: 'https://formspree.io/f/whatsgoingonai@gmail.com' (though usually needs an ID)

        try {
            const { DataManager } = await import('@/lib/dataManager');
            const result = await DataManager.subscribeToNewsletter(email);

            if (result.success) {
                setStatus('success');
                setEmail("");
            } else {
                setStatus('error');
                // Optional: Show error toast here if you want
                console.error(result.message);
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-xl border border-green-500/30 bg-green-500/10 text-center ${variant === 'minimal' ? 'py-4' : ''}`}
            >
                <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-green-500 mb-1">Subscribed!</h3>
                <p className="text-sm text-muted-foreground">
                    You're on the list. Watch your inbox for AI updates.
                </p>
            </motion.div>
        );
    }

    if (variant === 'minimal') {
        return (
            <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50"
                    required
                />
                <Button type="submit" size="icon" disabled={status === 'loading'}>
                    {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                </Button>
            </form>
        );
    }

    return (
        <div className={`relative overflow-hidden rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-md p-6 md:p-8 ${variant === 'compact' ? 'max-w-md mx-auto' : ''}`}>
            {/* Background effects */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-32 h-32 bg-secondary/20 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="space-y-2 text-center md:text-left max-w-lg">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Stay ahead of the curve
                    </h3>
                    <p className="text-muted-foreground">
                        Get the latest research, news, and insights delivered directly to your inbox. No spam, just signal.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto min-w-[320px]">
                    <Input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-background/50 border-white/10 focus:border-primary/50 h-10"
                        required
                    />
                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="h-10 px-6 font-medium"
                    >
                        {status === 'loading' ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Mail className="w-4 h-4 mr-2" />
                        )}
                        Subscribe
                    </Button>
                </form>
            </div>

            <p className="mt-4 text-xs text-center md:text-left text-muted-foreground/50">
                Join 2,000+ researchers and engineers. Unsubscribe at any time.
            </p>
        </div>
    );
}
