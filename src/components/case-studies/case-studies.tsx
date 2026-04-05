import Link from "next/link";
import type { ProjectCardData, AllProjectCardData, OutcomeMetric } from "@/types";

interface CaseStudiesProps {
    projects: ProjectCardData[] | AllProjectCardData[];
    showCTA: boolean;
}

export const CaseStudies = ({ projects, showCTA }: CaseStudiesProps) => {
    return (
        <section className="bg-background border-t border-b border-border px-6 md:px-12 py-28">
            <div className="max-w-7xl mx-auto">

                {/* OUTLINE HEADING */}
                <h2 className="text-[64px] sm:text-[96px] md:text-[140px] lg:text-[180px] font-bold uppercase leading-[0.9] tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,1)]">
                    Case Studies
                </h2>

                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-6 mt-16">
                    {projects?.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/case-studies/${project.slug}`}
                            className="group relative min-h-105 md:min-h-120 border border-border bg-card overflow-hidden hover:border-primary"
                        >
                            <div className="p-8 flex flex-col h-full">

                                {/* CONTENT */}
                                <div className="flex flex-col gap-6 flex-1">

                                    {/* TOP */}
                                    <div className="flex flex-col gap-4">

                                        {project.industry && (
                                            <p className="text-label uppercase tracking-widest text-primary">
                                                {project.industry}
                                            </p>
                                        )}

                                        {/* TITLE — keep strong */}
                                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight uppercase leading-tight group-hover:text-primary">
                                            {project.title}
                                        </h3>

                                        {/* SUBTEXT — calmer */}
                                        {project.subheading && (
                                            <p className="text-[15px] sm:text-base leading-relaxed text-muted-foreground max-w-sm [font-family:var(--font-body)]">
                                                {project.subheading}
                                            </p>
                                        )}
                                    </div>

                                    {/* METRICS */}
                                    {project.outcomeMetrics && project.outcomeMetrics.length > 0 && (
                                        <div className="flex gap-8 mt-2">
                                            {project.outcomeMetrics.map((metric: OutcomeMetric, i) => (
                                                <div key={i} className="flex flex-col gap-1">
                                                    <p className="text-xl md:text-2xl font-semibold text-primary">
                                                        {metric.value}
                                                    </p>
                                                    <p className="text-label uppercase tracking-widest text-muted-foreground">
                                                        {metric.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* HARD DIVIDER + CTA */}
                                <div className="pt-6 border-t border-border flex items-center justify-between">
                                    <span className="text-label uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                                        View Case Study
                                    </span>
                                    <span className="text-muted-foreground group-hover:text-primary">
                                        →
                                    </span>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                {showCTA && (
                    <div className="flex justify-center mt-16">
                        <Link
                            href="/case-studies"
                            className="border border-border px-8 py-3 text-label uppercase tracking-widest hover:bg-foreground hover:text-background"
                        >
                            View all case studies
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};