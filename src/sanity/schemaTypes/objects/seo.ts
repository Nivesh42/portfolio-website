import { defineType, defineField } from "sanity";

export const seoObject = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            description: "Ideal length 50–60 characters.",
            validation: (R) => R.max(60).warning("Keep under 60 characters"),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            rows: 3,
            description: "Ideal length 150–160 characters.",
            validation: (R) => R.max(160).warning("Keep under 160 characters"),
        }),
        defineField({
            name: "ogImage",
            title: "OG Image",
            type: "image",
            description: "Recommended 1200×630px. Used for social sharing previews.",
        }),
        defineField({
            name: "canonicalUrl",
            title: "Canonical URL",
            type: "url",
            description: "Only set if this page has a duplicate at another URL.",
        }),
        defineField({
            name: "noIndex",
            title: "Hide from search engines",
            type: "boolean",
            initialValue: false,
            description: "Turn on only for pages you never want indexed.",
        }),
    ],
});