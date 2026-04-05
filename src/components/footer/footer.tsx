import Link from "next/link";

import type { SocialLink } from "@/types";

interface FooterProps {
    copyright: string;
    socialLinks: SocialLink[];
}

export const Footer = ({ copyright, socialLinks }: FooterProps) => {
    return (
        <footer className="border-t border-border bg-background px-6 md:px-12 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Left */}
                <div className="flex flex-col gap-2">
                    <Link
                        href="/"
                        className="text-body font-bold tracking-tight text-foreground"
                    >
                        ⠿ NIVESH
                    </Link>

                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        {copyright}
                    </p>
                </div>

                {/* Right */}
                <nav className="flex items-center gap-8">
                    {socialLinks
                        .filter((link): link is { platform: string; url: string } =>
                            link.platform !== null && link.url !== null
                        )
                        .map((link) => (
                            <Link
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground"
                            >
                                {link.platform}
                            </Link>
                        ))}
                </nav>
            </div>
        </footer>
    );
};