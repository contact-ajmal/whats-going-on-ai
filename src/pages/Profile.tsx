import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Save } from "lucide-react";
import { DataManager } from "@/lib/dataManager";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AVAILABLE_INTERESTS = [
    "Generative AI", "LLMs", "Computer Vision",
    "Robotics", "Startups", "Coding",
    "Ethics", "Research", "Tools"
];

export default function Profile() {
    const { user, profile, loading: authLoading } = useAuth();
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile?.interests) {
            setSelectedInterests(profile.interests);
        }
    }, [profile]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        const { success, error } = await DataManager.updateInterests(user.id, selectedInterests);
        if (success) {
            toast.success("Interests updated!");
        } else {
            console.error(error);
            toast.error("Failed to save.");
        }
        setSaving(false);
    };

    if (authLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
    if (!user) return <div className="p-20 text-center">Please log in to view your profile.</div>;

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Your Profile
                </h1>
                <p className="text-muted-foreground mb-8">Manage your preferences and personalize your feed.</p>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={profile?.avatar_url || user.user_metadata.avatar_url}
                                    alt="Avatar"
                                    className="w-16 h-16 rounded-full border-2 border-primary/20"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{profile?.full_name || "User"}</h3>
                                    <p className="text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Your Interests</CardTitle>
                            <CardDescription>Select topics you want to see more of.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {AVAILABLE_INTERESTS.map(interest => (
                                    <Badge
                                        key={interest}
                                        variant={selectedInterests.includes(interest) ? "default" : "outline"}
                                        className="cursor-pointer text-sm py-1 px-3 hover:bg-primary/80 transition-colors"
                                        onClick={() => toggleInterest(interest)}
                                    >
                                        {interest}
                                    </Badge>
                                ))}
                            </div>
                            <Button onClick={handleSave} disabled={saving}>
                                {saving ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : <Save className="mr-2 w-4 h-4" />}
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
