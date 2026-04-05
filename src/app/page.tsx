import { client } from "@/sanity/lib/client";
import {
    homePageQuery,
    caseStudiesPreviewQuery,
    postsPreviewQuery
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Hero, About, Contact, CaseStudies, Writing } from "@/components";

export const revalidate = 60; // ISR for performance

export default async function Home() {
    const [page, projects, posts] = await Promise.all([
        client.fetch(homePageQuery),
        client.fetch(caseStudiesPreviewQuery),
        client.fetch(postsPreviewQuery),
    ]);

    if (!page) notFound();

    const resumeUrl = page.settings?.resumePdf?.asset?.url ?? undefined;

    return (
        <>
            <Hero data={page.hero} resumeUrl={resumeUrl} />
            <CaseStudies projects={projects} showCTA={true}/>
            <Writing posts={posts} showCTA={true}/>
            <About data={page.about} />
            <Contact data={page.contact} />
        </>
    );
}