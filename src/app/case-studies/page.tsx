import { client } from "@/sanity/lib/client";
import { allCaseStudiesQuery } from "@/sanity/lib/queries";
import { CaseStudies } from "@/components";

export const revalidate = 60;

export default async function CaseStudiesPage() {
    const projects = await client.fetch(allCaseStudiesQuery);

    return <CaseStudies projects={projects} showCTA={false}/>;
}