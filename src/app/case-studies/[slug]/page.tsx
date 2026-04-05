import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, allCaseStudiesQuery } from "@/sanity/lib/queries";
import { CaseStudyPage } from "@/components/case-study-page";

export const revalidate = 60;

export async function generateStaticParams() {
    const projects = await client.fetch(allCaseStudiesQuery);
    return projects
        .filter((p) => p.slug !== null)
        .map((p) => ({ slug: p.slug as string }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await client.fetch(projectBySlugQuery, { slug });
    if (!project) return {};
    return {
        title: `${project.title} — Nivesh Jain`,
        description: project.subheading ?? "",
        openGraph: {
            title: project.title ?? "",
            description: project.subheading ?? "",
            images: project.heroImage?.asset?.url
                ? [{ url: project.heroImage.asset.url }]
                : [],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await client.fetch(projectBySlugQuery, { slug });
    if (!project) notFound();
    return <CaseStudyPage project={project} />;
}