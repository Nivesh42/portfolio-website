"use client";

export function SidebarNav({ sections }: { sections: any[] }) {
    return (
        <div className="sticky top-32 flex flex-col gap-3">
            {sections.map((section, index) => {
                if (!("title" in section) || !section.title) return null;

                return (
                    <p
                        key={section._key}
                        onClick={() => {
                            document
                                .getElementById(`section-${index}`)
                                ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-label text-muted-foreground hover:text-primary cursor-pointer"
                    >
                        {String(index + 1).padStart(2, "0")} // {section.title}
                    </p>
                );
            })}
        </div>
    );
}