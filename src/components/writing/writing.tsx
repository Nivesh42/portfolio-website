import Link from "next/link";
import type { PostCardData } from "@/types";

export const Writing = ({ posts, showCTA }: { posts: PostCardData[]; showCTA: boolean }) => {
    return (
        <section className="bg-background px-6 md:px-12 py-32">
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-none mb-6">
                        Essays & Strategy
                    </h2>

                    <p className="text-xs uppercase tracking-widest text-muted-foreground max-w-md leading-relaxed">
                        Unfiltered thoughts on product management, growth loops, and building
                        things that actually matter.
                    </p>
                </div>

                {/* List */}
                <div className="border-t border-border">
                    {posts?.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/writing/${post.slug}`}
                            className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 py-10 border-b border-border items-start transition"
                        >
                            {/* Left */}
                            <div className="transition group-hover:translate-x-2">
                                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-5 group-hover:opacity-70 transition">
                                    {post.title}
                                </h3>

                                <div className="flex gap-2 flex-wrap">
                                    {post.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-label uppercase tracking-widest border border-border px-2 py-1 text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right date */}
                            <div className="text-sm uppercase tracking-widest text-muted-foreground md:mt-1">
                                {post.publishedAt
                                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    })
                                    : null}
                            </div>
                        </Link>
                    ))}
                </div>
                {/* CTA */}
                {showCTA && (
                    <div className="flex justify-center mt-16">
                        <Link
                            href="/writing"
                            className="border border-border px-8 py-3 text-sm uppercase tracking-widest hover:bg-accent transition"
                        >
                            Read all writings
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}