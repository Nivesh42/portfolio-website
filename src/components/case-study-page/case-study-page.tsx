import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { ProjectDetail } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

// ─── Portable Text components ───
const ptComponents = {
    block: {
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-base leading-relaxed text-muted-foreground mb-6 [font-family:var(--font-body)]">
                {children}
            </p>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground mt-10 mb-4">
                {children}
            </h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="text-lg font-bold uppercase tracking-tight text-foreground mt-8 mb-3">
                {children}
            </h3>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className="border-l-2 border-primary pl-6 my-6 text-muted-foreground italic">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className="text-foreground font-semibold">{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => (
            <em className="text-primary">{children}</em>
        ),
    },
};

// ─── Section renderer ───
function RenderSection({ section }: { section: ProjectDetail["sections"] extends (infer T)[] | null ? T : never }) {
    if (!section) return null;

    if (section._type === "textBlock") {
        return (
            <div className="max-w-2xl prose-terminal">
                {section.body && (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <PortableText value={section.body as any} components={ptComponents} />
                )}
            </div>
        );
    }

    if (section._type === "imageBlock") {
        const imgUrl = section.image?.asset?.url;
        if (!imgUrl) return null;
        return (
            <figure className={section.fullWidth ? "w-full" : "max-w-3xl"}>
                <div className="relative w-full aspect-video border border-border overflow-hidden">
                    <Image
                        src={imgUrl}
                        alt={section.alt ?? ""}
                        fill
                        className="object-cover"
                    />
                </div>
                {section.caption && (
                    <figcaption className="text-[10px] uppercase tracking-widest text-muted-foreground mt-3">
                        {section.caption}
                    </figcaption>
                )}
            </figure>
        );
    }

    if (section._type === "metricsBlock") {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px border border-border bg-border">
                {section.metrics?.map((m, i) => (
                    <div key={i} className="bg-background p-8 flex flex-col gap-2">
                        <p className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                            {m.value}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed">
                            {m.label}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    if (section._type === "quoteBlock") {
        return (
            <div className="border-l-2 border-primary pl-8 py-2 max-w-2xl">
                <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-3">
                    "{section.quote}"
                </p>
                {section.attribution && (
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        — {section.attribution}
                    </p>
                )}
            </div>
        );
    }

    if (section._type === "divider") {
        if (section.variant === "space") return <div className="h-16" />;
        if (section.variant === "gradient") {
            return (
                <div className="w-full h-px bg-linear-to-r from-primary via-border to-transparent" />
            );
        }
        // default: line
        return <div className="w-full h-px bg-border" />;
    }

    return null;
}

// ─── Main component ───
export function CaseStudyPage({ project }: { project: ProjectDetail }) {
    const heroUrl = project.heroImage?.asset?.url;

    return (
        <article className="min-h-screen bg-background">

            {/* ── Hero ─────────────────────────────────────────────────────── */}
            <section className="px-6 md:px-12 pt-32 pb-16 max-w-7xl mx-auto">

                {/* Breadcrumb + industry */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1">
                        Case Study
                    </span>
                    {project.industry && (
                        <>
                            <span className="text-muted-foreground text-xs">//</span>
                            <span className="text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1">
                                {project.industry}
                            </span>
                        </>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl xl:text-[120px] font-bold uppercase leading-none tracking-tight text-foreground mb-8">
                    {project.title}
                </h1>

                {/* Meta row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8 mb-16">
                    {project.industry && (
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Client</p>
                            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                {project.industry}
                            </p>
                        </div>
                    )}
                    {project.tags && project.tags.length > 0 && (
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Services</p>
                            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                {project.tags.join(" / ")}
                            </p>
                        </div>
                    )}
                    {project.publishedAt && (
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Timeline</p>
                            <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                                {new Date(project.publishedAt).getFullYear()}
                            </p>
                        </div>
                    )}
                    {project.outcomeMetrics && project.outcomeMetrics[0] && (
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                                {project.outcomeMetrics[0].label}
                            </p>
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                                {project.outcomeMetrics[0].value}
                            </p>
                        </div>
                    )}
                </div>

                {/* Hero image */}
                {heroUrl && (
                    <div className="relative w-full aspect-video border border-border overflow-hidden mb-20">
                        <Image
                            src={heroUrl}
                            alt={project.heroImage?.alt ?? project.title ?? ""}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                )}
            </section>

            {/* ── Two-column body ──────────────────────────────────────────── */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-16">

                    {/* Sticky sidebar nav */}
                    <aside className="hidden md:block">
                        <div className="sticky top-32 flex flex-col gap-3">
                            {project.industry && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary" />
                                    <span className="text-[9px] uppercase tracking-widest text-primary font-medium">
                                        {project.industry}
                                    </span>
                                </div>
                            )}
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                01 // The Challenge
                            </p>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                02 // Execution
                            </p>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                03 // Metrics
                            </p>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                04 // Conclusion
                            </p>
                        </div>
                    </aside>

                    {/* Sections */}
                    <div className="flex flex-col gap-16 pb-32">
                        {project.sections?.map((section) => (
                            <RenderSection key={section._key} section={section} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Next project ─────────────────────────────────────────────── */}
            {project.nextProject && (
                <section className="border-t border-border">
                    <Link
                        href={`/case-studies/${project.nextProject.slug}`}
                        className="flex items-center justify-between px-6 md:px-12 py-10 max-w-7xl mx-auto group hover:bg-accent/30 transition-colors"
                    >
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2">
                                Next Project
                            </p>
                            <p className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                                {project.nextProject.title}
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