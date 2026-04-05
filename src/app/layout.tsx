import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Space_Grotesk } from "next/font/google";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
    title: "Nivesh Jain — Product Manager",
    description: "PM bridging the gap between technical possibility and business necessity.",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
};

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-sans",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await client.fetch(siteSettingsQuery);

    const siteName = settings?.siteName ?? "Nivesh Jain";
    const navLinks = settings?.navLinks ?? [];
    const footerCopyright = settings?.footerCopyright ?? "";
    const socialLinks = settings?.socialLinks ?? [];

    return (
        <html lang="en" className="dark h-full antialiased" data-scroll-behavior="smooth">
            <link rel="icon" href="/favicon.ico" />
            <body className={`${spaceGrotesk.variable} ${inter.variable} min-h-full flex flex-col`}>
                <Header siteName={siteName} navLinks={navLinks} />
                <main className="flex-1">{children}</main>
                <Footer copyright={footerCopyright} socialLinks={socialLinks} />
            </body>
        </html>
    );
}