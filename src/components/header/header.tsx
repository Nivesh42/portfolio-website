"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import type { NavLink } from "@/types";

interface HeaderProps {
    siteName: string;
    navLinks: NavLink[];
}

export const Header = ({ siteName, navLinks }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [open]);


    return (
        <header ref={menuRef} className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border will-change-transform">
            <div className="flex items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="text-foreground font-bold text-lg tracking-tight"
                >
                    {siteName}
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks
                        .filter((link): link is { label: string; href: string } =>
                            link.label !== null && link.href !== null
                        )
                        .map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground uppercase tracking-wide"
                            >
                                {link.label}
                            </Link>
                        ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="/#contact"
                        className="hidden md:block bg-primary text-primary-foreground text-sm font-medium px-5 py-2 hover:bg-background hover:text-primary hover:border-primary border border-transparent uppercase tracking-wide"
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
                <div className="absolute top-15.5 left-0 right-0 border-t border-border px-6 py-6 flex flex-col gap-6 bg-background">
                    {navLinks
                        .filter((link): link is { label: string; href: string } =>
                            link.label !== null && link.href !== null
                        )
                        .map((link) => (
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
                        className="bg-primary text-primary-foreground text-sm font-medium px-5 py-3 text-center hover:bg-background hover:text-primary hover:border-primary border border-transparent uppercase tracking-wide"
                    >
                        Contact
                    </Link>
                </div>

            )}
        </header>
    );
};