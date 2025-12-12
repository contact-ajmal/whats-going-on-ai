import { Button } from '@/components/ui/button';
import { Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuyCoffeeButtonProps {
    className?: string;
    username?: string; // e.g. 'ajmal' for buymeacoffee.com/ajmal
}

export function BuyCoffeeButton({ className, username = 'zazamik' }: BuyCoffeeButtonProps) {
    const handleClick = () => {
        window.open(`https://www.buymeacoffee.com/${username}`, '_blank');
    };

    return (
        <Button
            onClick={handleClick}
            className={cn(
                "bg-[#FFDD00] text-black hover:bg-[#FFDD00]/90 font-bold border-none shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all",
                className
            )}
        >
            <Coffee className="mr-2 h-5 w-5" fill="black" />
            Buy me a coffee
        </Button>
    );
}
