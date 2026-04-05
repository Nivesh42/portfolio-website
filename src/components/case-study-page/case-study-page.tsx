import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { ProjectDetail } from "@/types";
import Image from "next/image";
import { SidebarNav } from "../side-bar";

const ptComponents = {
    block: {
        normal: ({ children }: { children?: React.ReactNode }) => (
            <p className="text-body text-muted-foreground mb-6">
                {children}
            </p>
        ),
        h2: ({ children }: { children?: React.ReactNode }) => (
            <h2 className="text-h2 mt-12 mb-6">
                {children}
            </h2>
        ),
        h3: ({ children }: { children?: React.ReactNode }) => (
            <h3 className="text-h3 mt-10 mb-4">
                {children}
            </h3>
        ),
        blockquote: ({ children }: { children?: React.ReactNode }) => (
            <blockquote className="border-l-2 border-primary pl-6 my-6 text-muted-foreground italic text-body">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }: { children?: React.ReactNode }) => (
            <strong className="text-foreground font-semibold">{children}</strong>
        ),
        em: ({ children }: { children?: React.ReactNode }) => (
            <em className="text-primary not-italic">{children}</em>
        ),
    },
};

function RenderSection({ section }: { section: ProjectDetail["sections"] extends (infer T)[] | null ? T : never }) {
    if (!section) return null;

    if (section._type === "textBlock") {
        return (
            <div className="max-w-2xl prose-terminal">
                {section.body && (
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
                    <Image src={imgUrl} alt={section.alt ?? ""} fill className="object-cover" />
                </div>
                {section.caption && (
                    <figcaption className="text-label text-muted-foreground mt-3">
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
                    <div key={i} className="bg-background p-6 sm:p-8 flex flex-col gap-2">
                        <p className="text-h3 text-primary">{m.value}</p>
                        <p className="text-label text-muted-foreground">{m.label}</p>
                    </div>
                ))}
            </div>
        );
    }

    if (section._type === "quoteBlock") {
        return (
            <div className="border-l-2 border-primary pl-8 py-2 max-w-2xl">
                <p className="text-body text-foreground mb-3">
                    "{section.quote}"
                </p>
                {section.attribution && (
                    <p className="text-label text-muted-foreground">
                        — {section.attribution}
                    </p>
                )}
            </div>
        );
    }

    if (section._type === "divider") {
        if (section.variant === "space") return <div className="h-16" />;
        return <div className="w-full h-px bg-border" />;
    }

    return null;
}

export function CaseStudyPage({ project }: { project: ProjectDetail }) {
    const heroUrl = project.heroImage?.asset?.url;

    return (
        <article className="min-h-screen bg-background">

            {/* HERO */}
            <section className="px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 max-w-7xl mx-auto">

                {/* META TAGS */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-label text-muted-foreground border border-border px-2 py-1">
                        Case Study
                    </span>

                    {project.industry && (
                        <>
                            <span className="text-muted-foreground text-xs">//</span>
                            <span className="text-label text-primary border border-primary/30 px-2 py-1">
                                {project.industry}
                            </span>
                        </>
                    )}
                </div>

                {/* TITLE */}
                <h1 className="text-display text-foreground mb-8">
                    {project.title}
                </h1>

                {/* META GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8 mb-16">

                    {project.industry && (
                        <div className="flex flex-col gap-1">
                            <p className="text-label text-muted-foreground">Client</p>
                            <p className="text-small text-foreground uppercase">{project.industry}</p>
                        </div>
                    )}

                    {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-col gap-1">
                            <p className="text-label text-muted-foreground">Services</p>
                            <p className="text-small text-foreground uppercase">{project.tags.join(" / ")}</p>
                        </div>
                    )}

                    {project.publishedAt && (
                        <div className="flex flex-col gap-1">
                            <p className="text-label text-muted-foreground">Timeline</p>
                            <p className="text-small text-foreground uppercase">
                                {new Date(project.publishedAt).getFullYear()}
                            </p>
                        </div>
                    )}

                    {project.outcomeMetrics?.[0] && (
                        <div className="flex flex-col gap-1">
                            <p className="text-label text-muted-foreground">
                                {project.outcomeMetrics[0].label}
                            </p>
                            <p className="text-small text-primary uppercase">
                                {project.outcomeMetrics[0].value}
                            </p>
                        </div>
                    )}
                </div>

                {/* HERO IMAGE */}
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

            {/* BODY */}
            <section className="px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-12 md:gap-16 lg:gap-20">

                    {/* SIDEBAR */}
                    <aside className="hidden md:block">
                        <div className="sticky top-32 flex flex-col gap-3">

                            {/* Industry (SERVER — stays here) */}
                            {project.industry && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary" />
                                    <span className="text-label text-primary">
                                        {project.industry}
                                    </span>
                                </div>
                            )}

                            {/* Client component only for interaction */}
                            <SidebarNav sections={project.sections ?? []} />
                        </div>
                    </aside>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-12 md:gap-16 pb-24 md:pb-32">
                        {project.sections?.map((section, index) => (
                            <div id={`section-${index}`} key={section._key}>
                                <RenderSection section={section} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEXT PROJECT */}
            {project.nextProject && (
                <section className="border-t border-border">
                    <Link
                        href={`/case-studies/${project.nextProject.slug}`}
                        className="flex items-center justify-between px-6 md:px-12 py-10 max-w-7xl mx-auto group hover:bg-foreground hover:text-background"
                    >
                        <div>
                            <p className="text-label text-muted-foreground mb-2">
                                Next Project
                            </p>
                            <p className="text-h2 group-hover:text-background">
                                {project.nextProject.title}
                            </p>
                        </div>
                        <span className="text-2xl group-hover:text-background">→</span>
                    </Link>
                </section>
            )}
        </article>
    );
}