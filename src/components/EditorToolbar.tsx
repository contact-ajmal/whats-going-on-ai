import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    List,
    Heading1,
    Heading2,
    Link as LinkIcon,
    Image as ImageIcon,
    Quote,
    Code
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface EditorToolbarProps {
    onInsert: (text: string) => void;
    onImageUpload: (file: File) => Promise<void>;
    disabled?: boolean;
}

export function EditorToolbar({ onInsert, onImageUpload, disabled }: EditorToolbarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await onImageUpload(file);
        }
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/20">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('**bold**')} disabled={disabled} title="Bold">
                <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('_italic_')} disabled={disabled} title="Italic">
                <Italic className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('# ')} disabled={disabled} title="Heading 1">
                <Heading1 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('## ')} disabled={disabled} title="Heading 2">
                <Heading2 className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('- ')} disabled={disabled} title="List">
                <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('> ')} disabled={disabled} title="Quote">
                <Quote className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('```\ncode\n```')} disabled={disabled} title="Code Block">
                <Code className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1 self-center" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onInsert('[link](url)')} disabled={disabled} title="Link">
                <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleImageClick} disabled={disabled} title="Upload Image">
                <ImageIcon className="h-4 w-4" />
            </Button>

            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
        </div>
    );
}
