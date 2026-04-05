import { defineType, defineField, defineArrayMember } from "sanity";

export const postSchema = defineType({
    name: "post",
    title: "Post",
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
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            description: "Short summary shown on the writing index. Also used as meta description if SEO field is empty.",
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({ name: "alt", type: "string", title: "Alt Text" }),
            ],
        }),
        defineField({
            name: "tags",
            title: "Tags",
            type: "array",
            of: [defineArrayMember({ type: "string" })],
            options: { layout: "tags" },
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "portableTextBody",
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            validation: (R) => R.required(),
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
        defineField({
            name: "featured",
            title: "Featured on homepage?",
            type: "boolean",
            initialValue: false,
            description: "Show this post in the homepage preview.",
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
            subtitle: "publishedAt",
            media: "coverImage",
        },
    },
});