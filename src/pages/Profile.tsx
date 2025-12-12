import { useEffect, useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    const [formData, setFormData] = useState({
        full_name: "",
        website: "",
        country: "",
        bio: ""
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setSelectedInterests(profile.interests || []);
            setFormData({
                full_name: profile.full_name || "",
                website: profile.website || "",
                country: profile.country || "",
                bio: profile.bio || ""
            });
        }
    }, [profile]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);

        // Save Details
        const detailsResult = await DataManager.updateProfileDetails(user.id, {
            ...formData,
            email: user.email // Ensure email is always synced
        });

        // Save Interests
        const interestsResult = await DataManager.updateInterests(user.id, selectedInterests);

        if (detailsResult.success && interestsResult.success) {
            toast.success("Profile updated successfully!");
        } else {
            console.error(detailsResult.error || interestsResult.error);
            toast.error("Failed to save profile.");
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
                <p className="text-muted-foreground mb-8">Manage your personal information and preferences.</p>

                <div className="grid gap-6">
                    {/* AVATAR & EMAIL (Read Only) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
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
                                    <Badge variant="secondary" className="mt-2">Google Account</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* PERSONAL DETAILS FORM */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                            <CardDescription>Tell us a bit about yourself.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        placeholder="e.g. USA, UK"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    placeholder="https://your-portfolio.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="I am an AI enthusiast..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* INTERESTS */}
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
                            <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto">
                                {saving ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : <Save className="mr-2 w-4 h-4" />}
                                Save All Changes
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
