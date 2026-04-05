// src/app/essays/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery, allPostsQuery } from "@/sanity/lib/queries";
import { EssayPage } from "@/components/writing-page";

export const revalidate = 60;

export async function generateStaticParams() {
    const posts = await client.fetch(allPostsQuery);
    return posts
        .filter((p) => p.slug !== null)
        .map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await client.fetch(postBySlugQuery, { slug });
    if (!post) return {};
    return {
        title: `${post.title} — Nivesh Jain`,
        description: post.excerpt ?? "",
        openGraph: {
            title: post.title ?? "",
            description: post.excerpt ?? "",
            images: post.coverImage?.asset?.url
                ? [{ url: post.coverImage.asset.url }]
                : [],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await client.fetch(postBySlugQuery, { slug });
    if (!post) notFound();
    return <EssayPage post={post} />;
}