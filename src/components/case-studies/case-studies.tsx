import Link from "next/link"

type Project = {
    title: string;
    slug: string;
    industry?: string;
    subheading?: string;
    outcomeMetrics?: { value: string; label: string }[];
};


export const CaseStudies = ({ projects }: { projects: Project[] }) => {
    return (
        <section className="bg-background border-t border-b border-border px-6 md:px-12 py-28">
            <div className="max-w-7xl mx-auto">

                {/* OUTLINE HEADING */}
                <h2 className="text-[72px] sm:text-[96px] md:text-[140px] lg:text-[180px] font-bold uppercase leading-[0.9] tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,1)]">
                    Case Studies
                </h2>

                {/* CARDS GRID */}
                <div className="grid md:grid-cols-2 gap-6 mt-16">
                    {projects?.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/case-studies/${project.slug}`}
                            className="group relative h-105 border border-border bg-card overflow-hidden transition-transform duration-500 hover:scale-[1.03]"
                        >
                            <div className="p-8 flex flex-col justify-between h-full">
                                <div>
                                    {project.industry && (
                                        <p className="text-[11px] uppercase tracking-widest text-primary mb-3">
                                            {project.industry}
                                        </p>
                                    )}

                                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                                        {project.title}
                                    </h3>

                                    {project.subheading && (
                                        <p className="text-sm text-muted-foreground mt-4 max-w-sm">
                                            {project.subheading}
                                        </p>
                                    )}

                                    {/* Metrics */}
                                    {project.outcomeMetrics && project.outcomeMetrics.length > 0 && (
                                        <div className="flex gap-10 mt-8">
                                            {project.outcomeMetrics.map((metric, i) => (
                                                <div key={i}>
                                                    <p className="text-2xl font-semibold">{metric.value}</p>
                                                    <p className="text-[11px] uppercase text-muted-foreground">
                                                        {metric.label}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="h-28 bg-linear-to-r from-muted to-transparent opacity-50" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-16">
                    <Link
                        href="/case-studies"
                        className="border border-border px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent transition"
                    >
                        View all case studies
                    </Link>
                </div>

            </div>
        </section>
    )
}