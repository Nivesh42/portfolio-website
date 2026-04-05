import Link from "next/link";
import type { HeroData } from "@/types";

interface HeroProps {
    data: HeroData;
    resumeUrl?: string;
}

export const Hero = ({ data, resumeUrl }: HeroProps) => {
    return (
        <section id="home" className="min-h-screen bg-background flex flex-col justify-center px-6 md:px-12 pt-12 pb-16">
            {/* Available badge */}
            <div className="container-main">
                {data?.badge && (
                    <div className="flex items-center gap-2 mb-8">
                        <div className="border border-border px-3 py-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                                {data.badge}
                            </span>
                        </div>
                    </div>
                )}

                <h1 className="text-6xl md:text-8xl xl:text-9xl font-bold uppercase leading-none tracking-tight mb-8">
                    {data?.headlineLineOne && (
                        <span className="text-foreground block">{data.headlineLineOne}</span>
                    )}
                    {data?.headlineLineTwo && (
                        <span className="text-foreground block">{data.headlineLineTwo}</span>
                    )}
                    {data?.headlineAccent && (
                        <span className="text-primary block">{data.headlineAccent}</span>
                    )}
                </h1>

                <div className="flex items-center gap-4 mb-10">
                    {data?.primaryCta?.label && data?.primaryCta?.href && (
                        <Link
                            href={data.primaryCta.href}
                            className="bg-primary text-primary-foreground text-sm font-medium px-6 py-3 uppercase tracking-widest hover:bg-background hover:text-primary hover:border-primary border border-transparent"
                        >
                            {data.primaryCta.label}
                        </Link>
                    )}

                    {data?.secondaryCta?.label && resumeUrl && (
                        <Link
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-border text-foreground text-sm font-medium px-6 py-3 uppercase tracking-widest hover:bg-foreground hover:text-background"
                        >
                            {data.secondaryCta.label}
                        </Link>
                    )}
                </div>

                {data?.subheadline && (
                    <p className="text-sm uppercase tracking-widest text-muted-foreground max-w-md leading-relaxed">
                        {data.subheadline}
                    </p>
                )}
            </div>
        </section>
    );
};