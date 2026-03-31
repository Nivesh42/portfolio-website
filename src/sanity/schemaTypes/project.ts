import { defineType, defineField, defineArrayMember } from "sanity";
import { textBlock, imageBlock, metricsBlock, quoteBlock, dividerBlock } from "./objects/sections";

export const projectSchema = defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (R) => R.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title" },
            validation: (R) => R.required(),
        }),
        defineField({
            name: "industry",
            title: "Industry",
            type: "string",
            description: 'e.g. "Fintech", "3D Commerce", "Logistics"',
        }),
        defineField({
            name: "subheading",
            title: "Subheading",
            type: "text",
            rows: 2,
            description: "One punchy line that frames the case study. e.g. 'How compliance became a product moat.'",
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({ name: "alt", type: "string", title: "Alt Text", validation: (R) => R.required() }),
            ],
            validation: (R) => R.required(),
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            name: "outcomeMetrics",
            title: "Outcome Metrics",
            description: "Top-line results shown on the project card and hero. Max 4.",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "value", title: "Value", type: "string", description: 'e.g. "66%"' }),
                        defineField({ name: "label", title: "Label", type: "string", description: 'e.g. "Reduction in delivery time"' }),
                    ],
                    preview: {
                        select: { title: "value", subtitle: "label" },
                    },
                }),
            ],
            validation: (R) => R.max(4),
        }),
        defineField({
            name: "sections",
            title: "Sections",
            description: "Build the case study by composing blocks in order.",
            type: "array",
            of: [textBlock, imageBlock, metricsBlock, quoteBlock, dividerBlock],
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
        }),
        defineField({
            name: "featured",
            title: "Featured?",
            type: "boolean",
            initialValue: false,
            description: "Featured projects appear first on the homepage.",
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],

    orderings: [
        {
            title: "Newest first",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],

    preview: {
        select: {
            title: "title",
            subtitle: "industry",
            media: "heroImage",
        },
    },
});