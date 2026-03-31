import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
    title: "Nivesh Jain — Product Manager",
    description: "PM bridging the gap between technical possibility and business necessity.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await client.fetch(siteSettingsQuery);

    return (
        <html lang="en" className="dark h-full antialiased">
            <body className="min-h-full flex flex-col">
                <Header siteName={settings.siteName} navLinks={settings.navLinks} />
                <main className="flex-1">{children}</main>
                <Footer copyright={settings.footerCopyright} socialLinks={settings.socialLinks} />
            </body>
        </html>
    );
}