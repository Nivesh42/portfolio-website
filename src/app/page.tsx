import { client } from "@/sanity/lib/client";
import {
    homePageQuery,
    caseStudiesQuery,
    postsQuery,
} from "@/sanity/lib/queries";

import { Hero, About, Contact, CaseStudies, Writing } from "@/components";

export const revalidate = 60; // ISR for performance

export default async function Home() {
    const [page, projects, posts] = await Promise.all([
        client.fetch(homePageQuery),
        client.fetch(caseStudiesQuery),
        client.fetch(postsQuery),
    ]);

    if (!page) {
        return <div className="p-12">Page not found</div>;
    }

    const resumeUrl = page?.settings?.resumePdf?.asset?.url;

    return (
        <>
            <Hero data={page.hero} resumeUrl={resumeUrl} />
            <CaseStudies projects={projects} />
            <Writing posts={posts} />
            <About data={page.about} />
            <Contact data={page.contact} />
        </>
    );
}