import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { PostDetail } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { ShareButton } from "./../share-button";

// ─── Portable Text components ─────────────────────────────────────────────────
const ptComponents = {
    block: {
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                {children}
            </p>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground mt-16 mb-6">
                {children}
            </h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <div className="flex items-start gap-4 mt-12 mb-4">
                <div className="w-2 h-2 bg-primary mt-1.5 shrink-0" />
                <h3 className="text-base font-bold uppercase tracking-tight text-foreground">
                    {children}
                </h3>
            </div>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <div className="relative pl-8 py-2 my-10">
                <span className="absolute top-0 left-0 text-4xl font-bold text-primary leading-none">
                    "
                </span>
                <p className="text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground leading-tight">
                    {children}
                </p>
            </div>
        ),
    },
    marks: {
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className="text-foreground font-semibold">{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => (
            <em className="text-primary not-italic">{children}</em>
        ),
        code: ({ children }: { children?: React.ReactNode }) => (
            <code className="text-[11px] font-mono bg-muted px-1.5 py-0.5 text-primary">
                {children}
            </code>
        ),
    },
    types: {
        image: ({ value }: { value: { asset?: { url?: string }; alt?: string; caption?: string } }) => {
            if (!value?.asset?.url) return null;
            return (
                <figure className="my-10">
                    <div className="relative w-full aspect-video border border-border overflow-hidden">
                        <Image
                            src={value.asset.url}
                            alt={value.alt ?? ""}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {value.caption && (
                        <figcaption className="text-[10px] uppercase tracking-widest text-muted-foreground mt-3">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
};

// ─── Main component ───────────────────────────────────────────────────────────
export function EssayPage({ post }: { post: PostDetail }) {
    const coverUrl = post.coverImage?.asset?.url;

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }).toUpperCase().replace(",", "_").replace(" ", "_")
        : null;

    return (
        <article className="min-h-screen bg-background">

            {/* ── Hero header ──────────────────────────────────────────────── */}
            <section className="max-w-3xl mx-auto px-6 md:px-12 pt-32 pb-10">

                {/* Tag + reading time */}
                <div className="flex items-center gap-4 mb-6 border-l-2 border-primary pl-4">
                    {post.tags && post.tags[0] && (
                        <span className="text-[10px] uppercase tracking-widest text-primary border border-primary/40 px-2 py-1">
                            {post.tags[0]}
                        </span>
                    )}
                    {post.readingTime && (
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            Est. Read: {post.readingTime} min
                        </span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold uppercase leading-none tracking-tight text-foreground mb-8">
                    {post.title}
                </h1>

                {/* Divider */}
                <div className="w-full h-px bg-border mb-8" />

                {/* Meta row */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                            Author
                        </p>
                        <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                            Nivesh_Terminal
                        </p>
                    </div>
                    {formattedDate && (
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                                Published
                            </p>
                            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                {formattedDate}
                            </p>
                        </div>
                    )}
                    {post.tags && post.tags.length > 0 && (
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                                Tags
                            </p>
                            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                {post.tags.map((t) => `#${t}`).join(" ")}
                            </p>
                        </div>
                    )}
                </div>

                {/* Cover image */}
                {coverUrl && (
                    <div className="relative w-full aspect-video border border-border overflow-hidden mb-16">
                        <Image
                            src={
                                post.coverImage
                                    ? urlFor(post.coverImage).width(1200).quality(90).url()
                                    : coverUrl
                            }
                            alt={post.coverImage?.alt ?? post.title ?? ""}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}
            </section>

            {/* ── Body ─────────────────────────────────────────────────────── */}
            <section className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
                {post.body && (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <PortableText value={post.body as any} components={ptComponents} />
                )}
            </section>

            {/* ── Footer strip ─────────────────────────────────────────────── */}
            <section className="border-t border-border">
                <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">

                    {/* Left — series note */}
                    <div className="flex flex-col gap-2 max-w-xs">
                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
                            End_of_Transmission
                        </p>
                        {post.excerpt && (
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}
                    </div>

                    {/* Right — actions */}
                    <div className="flex flex-col gap-3">
                        <ShareButton title={post.title ?? ""} />
                        <Link
                            href="/writing"
                            className="border border-border px-8 py-3 text-[10px] uppercase tracking-widest text-foreground hover:bg-accent transition text-left"
                        >
                            Read_All_Writings
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Next essay ───────────────────────────────────────────────── */}
            {post.nextPost && (
                <section className="border-t border-border">
                    <Link
                        href={`/writing/${post.nextPost.slug}`}
                        className="flex items-center justify-between px-6 md:px-12 py-10 max-w-3xl mx-auto group hover:bg-accent/30 transition-colors"
                    >
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2">
                                Next Essay
                            </p>
                            <p className="text-xl md:text-3xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {post.nextPost.title}
                            </p>
                        </div>
                        <span className="text-2xl text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all">
                            →
                        </span>
                    </Link>
                </section>
            )}
        </article>
    );
}