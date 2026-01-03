import { useState } from 'react';
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export function DailyBriefingWidget() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            toast.success("Welcome to the inner circle! 🚀");
            localStorage.setItem('ai_daily_brief_sub', 'true');
        }, 800);
    };

    if (submitted) {
        return (
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20 backdrop-blur-md">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">You're In!</h3>
                    <p className="text-sm text-green-200/80">
                        Check your inbox tomorrow for your first specialized AI briefing.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

            <Card className="relative p-6 md:p-8 bg-black/40 border-white/10 backdrop-blur-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Sparkles className="w-24 h-24 text-primary" />
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
                            The Daily AI Pulse
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base max-w-sm">
                            Join 10,000+ engineers receiving the 3-minute breakdown of what actually matters in AI each morning.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="email"
                            placeholder="work@email.com"
                            className="bg-white/5 border-white/10 focus:border-primary/50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shrink-0">
                            Join <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                        <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            No Spam
                        </span>
                        <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Unsub Anytime
                        </span>
                        <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Free Forever
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
