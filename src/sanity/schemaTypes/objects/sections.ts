import { defineArrayMember, defineField } from "sanity";

export const textBlock = defineArrayMember({
    type: "object",
    name: "textBlock",
    title: "Text Block",
    fields: [
        defineField({
            name: "title",
            title: "Section Title",
            type: "string",
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "portableTextBody",
        }),
    ],
    preview: {
        prepare() {
            return { title: "Text Block" };
        },
    },
});

export const imageBlock = defineArrayMember({
    type: "object",
    name: "imageBlock",
    title: "Image Block",
    fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            validation: (R) => R.required(),
        }),
        defineField({
            name: "caption",
            title: "Caption",
            type: "string",
        }),
        defineField({
            name: "alt",
            title: "Alt Text",
            type: "string",
            validation: (R) => R.required().warning("Required for SEO and accessibility"),
        }),
        defineField({
            name: "fullWidth",
            title: "Full Width?",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: { title: "caption", media: "image" },
        prepare({ title, media }) {
            return { title: title ?? "Image Block", media };
        },
    },
});

export const metricsBlock = defineArrayMember({
    type: "object",
    name: "metricsBlock",
    title: "Metrics Block",
    fields: [
        defineField({
            name: "metrics",
            title: "Metrics",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({ name: "value", title: "Value", type: "string", description: 'e.g. "66%"' }),
                        defineField({ name: "label", title: "Label", type: "string", description: 'e.g. "Faster delivery"' }),
                    ],
                    preview: {
                        select: { title: "value", subtitle: "label" },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: "Metrics Block" };
        },
    },
});

export const quoteBlock = defineArrayMember({
    type: "object",
    name: "quoteBlock",
    title: "Quote Block",
    fields: [
        defineField({
            name: "quote",
            title: "Quote",
            type: "text",
            rows: 3,
            validation: (R) => R.required(),
        }),
        defineField({
            name: "attribution",
            title: "Attribution",
            type: "string",
            description: "Optional — who said it or where it's from",
        }),
    ],
    preview: {
        select: { title: "quote" },
        prepare({ title }) {
            return { title: `"${title}"` };
        },
    },
});

export const dividerBlock = defineArrayMember({
    type: "object",
    name: "divider",
    title: "Divider",

    fields: [
        defineField({
            name: "variant",
            title: "Variant",
            type: "string",
            options: {
                list: [
                    { title: "Line", value: "line" },
                    { title: "Space", value: "space" },
                    { title: "Gradient", value: "gradient" },
                ],
                layout: "radio",
            },
            initialValue: "line",
        }),
    ],

    preview: {
        prepare() {
            return { title: "── Divider ──" };
        },
    },
});