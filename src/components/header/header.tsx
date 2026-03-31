"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };

type HeaderProps = {
    siteName: string;
    navLinks: NavLink[];
};


export const Header = ({ siteName, navLinks }: HeaderProps) => {
    const [open, setOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, [pathname]);

    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
            <div className="flex items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="text-foreground font-bold text-lg tracking-tight"
                >
                    {siteName}
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="/#contact"
                        className="hidden md:block bg-primary text-primary-foreground text-sm font-medium px-5 py-2 hover:bg-primary/90 transition-colors uppercase tracking-wide"
                    >
                        Contact
                    </Link>

                    {/* Hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-foreground p-1"
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-border px-6 py-6 flex flex-col gap-6 bg-background">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/#contact"
                        onClick={() => setOpen(false)}
                        className="bg-primary text-primary-foreground text-sm font-medium px-5 py-3 text-center hover:bg-primary/90 transition-colors uppercase tracking-wide"
                    >
                        Contact
                    </Link>
                </div>
            )}
        </header>
    );
};