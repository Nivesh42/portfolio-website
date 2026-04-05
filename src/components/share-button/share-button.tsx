// src/components/share-button.tsx
"use client";

interface ShareButtonProps {
    title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
    const handleShare = () => {
        navigator.share?.({ title, url: window.location.href });
    };

    return (
        <button
            onClick={handleShare}
            className="border border-border px-8 py-3 text-label uppercase tracking-widest text-foreground hover:bg-accent transition text-left"
        >
            Share_Encrypted
        </button>
    );
}