import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
    title: "Nivesh Jain — Product Manager",
    description: "PM bridging the gap between technical possibility and business necessity.",
};

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-sans"
});
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await client.fetch(siteSettingsQuery);

    return (
        <html lang="en" className="dark h-full antialiased">
            <body className={`${spaceGrotesk.className} min-h-full flex flex-col`}>
                <Header siteName={settings.siteName} navLinks={settings.navLinks} />
                <main className="flex-1">{children}</main>
                <Footer copyright={settings.footerCopyright} socialLinks={settings.socialLinks} />
            </body>
        </html>
    );
}