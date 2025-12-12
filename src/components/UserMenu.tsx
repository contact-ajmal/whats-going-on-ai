import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export function UserMenu() {
    const { user, profile, loading, signInWithGoogle, signOut } = useAuth();

    // Initial loading state
    if (loading) {
        return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
    }

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            toast.error("Login failed. Check console or try again.");
        }
    };

    const handleLogout = async () => {
        await signOut();
        toast.success("Logged out successfully");
    };

    if (!user) {
        return (
            <Button
                variant="outline"
                size="sm"
                onClick={handleLogin}
                className="hidden md:flex gap-2"
            >
                <img src="https://authjs.dev/img/providers/google.svg" className="w-4 h-4" alt="Google" />
                Sign in
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || user.user_metadata.avatar_url} alt={profile?.full_name || "User"} />
                        <AvatarFallback>{(profile?.full_name?.[0] || user.email?.[0] || "U").toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile?.full_name || user.user_metadata.full_name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile & Interests</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
