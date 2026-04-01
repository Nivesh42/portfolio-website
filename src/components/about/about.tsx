type TimelineItem = {
    period: string;
    role: string;
    description: string;
    current: boolean;
};

type AboutData = {
    headlineLineOne?: string;
    headlineLineTwo?: string;
    bio?: string;
    timeline?: TimelineItem[];
};


export const About = ({ data }: { data: AboutData }) => {
    return (
        <section id="about" className="min-h-full bg-background border-t border-b border-border grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">
            {/* Left */}
            <div className="section-spacing container-main md:container-none md:px-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
                <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold uppercase leading-none tracking-tight text-foreground mb-8">
                    {data?.headlineLineOne && <span className="block">{data.headlineLineOne}</span>}
                    {data?.headlineLineTwo && <span className="block">{data.headlineLineTwo}</span>}
                </h2>
                {data?.bio && (
                    <p className="text-xs uppercase tracking-widest text-muted-foreground max-w-xs leading-relaxed">
                        {data.bio}
                    </p>
                )}
            </div>

            {/* Right — timeline */}
            <div className="relative section-spacing md:px-12 px-12">
                <div className="absolute left-13 md:left-13 top-0 bottom-0 w-px bg-border" />
                <div className="flex flex-col gap-10">
                    {data?.timeline?.map((item, i) => (
                        <div key={i} className="flex gap-5 relative">
                            <div className="shrink-0 mt-1 z-10">
                                <div className={`w-2.5 h-2.5 ${item.current ? "bg-primary" : "bg-muted-foreground"}`} />
                            </div>
                            <div className="pb-2">
                                <p className={`text-xs uppercase tracking-widest mb-2 ${item.current ? "text-primary" : "text-muted-foreground"}`}>
                                    {item.period}
                                </p>
                                <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-foreground mb-2">
                                    {item.role}
                                </h3>
                                <p className="text-xs uppercase tracking-widest text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};