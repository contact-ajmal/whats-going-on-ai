import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuyCoffeeButtonProps {
    className?: string;
    username?: string; // e.g. 'ajmal' for buymeacoffee.com/ajmal
}

export function BuyCoffeeButton({ className, username = 'ajmalnazir' }: BuyCoffeeButtonProps) {
    const handleClick = () => {
        window.open(`https://www.buymeacoffee.com/${username}`, '_blank');
    };

    return (
        <Button
            onClick={handleClick}
            className={cn(
                "bg-[#5F7FFF] text-white hover:bg-[#5F7FFF]/90 font-bold border rounded-md shadow-sm transition-all",
                "font-[Lato]", // Using the requested font stack if available, else fallback
                className
            )}
        >
            <Coffee className="mr-2 h-5 w-5 text-[#FFDD00]" fill="#FFDD00" />
            Buy me a coffee
        </Button>
    );
}
