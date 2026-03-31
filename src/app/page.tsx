import { client } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { caseStudiesQuery } from "@/sanity/lib/queries";
import { CaseStudies } from "@/components";
import { Writing } from "@/components";
import { postsQuery } from "@/sanity/lib/queries";

export default async function Home() {
    const page = await client.fetch(homePageQuery);

    console.log("FETCHED DATA:", page);

    if (!page) {
        return <div className="p-12">Page not found</div>;
    }

    const resumeUrl = page?.settings?.resumePdf?.asset?.url;
    const projects = await client.fetch(caseStudiesQuery);
    const posts = await client.fetch(postsQuery);


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