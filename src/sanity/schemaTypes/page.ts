import { defineType, defineField, defineArrayMember } from "sanity";

export const pageSchema = defineType({
    name: "page",
    title: "Page",
    type: "document",
    fields: [
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "hero.headlineLineOne" },
            validation: (R) => R.required(),
        }),

        // ─── HERO ───────────────────────────────────────────────
        defineField({
            name: "hero",
            title: "Hero Section",
            type: "object",
            fields: [
                defineField({
                    name: "badge",
                    title: "Badge Text",
                    type: "string",
                    description: 'e.g. "Available for roles"',
                }),
                defineField({
                    name: "headlineLineOne",
                    title: "Headline — Line 1",
                    type: "string",
                    description: 'e.g. "I Build"',
                }),
                defineField({
                    name: "headlineLineTwo",
                    title: "Headline — Line 2",
                    type: "string",
                    description: 'e.g. "Products"',
                }),
                defineField({
                    name: "headlineAccent",
                    title: "Headline — Accent Line (blue)",
                    type: "string",
                    description: 'e.g. "That Ship."',
                }),
                defineField({
                    name: "subheadline",
                    title: "Subheadline",
                    type: "text",
                    rows: 2,
                }),
                defineField({
                    name: "primaryCta",
                    title: "Primary CTA",
                    type: "object",
                    fields: [
                        defineField({ name: "label", title: "Label", type: "string" }),
                        defineField({ name: "href", title: "Link", type: "string" }),
                    ],
                }),
                defineField({
                    name: "secondaryCta",
                    title: "Secondary CTA",
                    type: "object",
                    fields: [
                        defineField({ name: "label", title: "Label", type: "string" }),
                        defineField({ name: "href", title: "Link", type: "string" }),
                    ],
                }),
            ],
        }),

        // ─── ABOUT ──────────────────────────────────────────────
        defineField({
            name: "about",
            title: "About Section",
            type: "object",
            fields: [
                defineField({
                    name: "headlineLineOne",
                    title: "Headline — Line 1",
                    type: "string",
                    description: 'e.g. "From Code"',
                }),
                defineField({
                    name: "headlineLineTwo",
                    title: "Headline — Line 2",
                    type: "string",
                    description: 'e.g. "To Strategy."',
                }),
                defineField({
                    name: "bio",
                    title: "Bio",
                    type: "text",
                    rows: 3,
                }),
                defineField({
                    name: "timeline",
                    title: "Timeline",
                    type: "array",
                    of: [
                        defineArrayMember({
                            type: "object",
                            fields: [
                                defineField({ name: "period", title: "Period", type: "string", description: 'e.g. "2023 — Present"' }),
                                defineField({ name: "role", title: "Role", type: "string" }),
                                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
                                defineField({ name: "current", title: "Current Role?", type: "boolean", initialValue: false }),
                            ],
                            preview: {
                                select: { title: "role", subtitle: "period" },
                            },
                        }),
                    ],
                }),
            ],
        }),

        // ─── SKILLS ─────────────────────────────────────────────
        defineField({
            name: "skills",
            title: "Skills / Bento Grid",
            type: "object",
            fields: [
                defineField({
                    name: "heading",
                    title: "Section Heading",
                    type: "string",
                }),
                defineField({
                    name: "categories",
                    title: "Skill Categories",
                    type: "array",
                    of: [
                        defineArrayMember({
                            type: "object",
                            fields: [
                                defineField({ name: "label", title: "Category Label", type: "string", description: 'e.g. "Logic", "Build", "Design", "Shipped"' }),
                                defineField({
                                    name: "items",
                                    title: "Skills",
                                    type: "array",
                                    of: [defineArrayMember({ type: "string" })],
                                }),
                            ],
                            preview: {
                                select: { title: "label" },
                            },
                        }),
                    ],
                }),
            ],
        }),

        // ─── CONTACT ────────────────────────────────────────────
        defineField({
            name: "contact",
            title: "Contact Section",
            type: "object",
            fields: [
                defineField({ name: "heading", title: "Heading", type: "string", description: 'e.g. "Start Transmission"' }),
                defineField({ name: "namePlaceholder", title: "Name Placeholder", type: "string" }),
                defineField({ name: "nameLabel", title: "Name Label", type: "string", description: 'e.g. "Identification"' }),
                defineField({ name: "emailPlaceholder", title: "Email Placeholder", type: "string" }),
                defineField({ name: "emailLabel", title: "Email Label", type: "string", description: 'e.g. "Routing Address"' }),
                defineField({ name: "messagePlaceholder", title: "Message Placeholder", type: "string" }),
                defineField({ name: "messageLabel", title: "Message Label", type: "string", description: 'e.g. "Payload"' }),
                defineField({ name: "submitLabel", title: "Submit Button Label", type: "string" }),
            ],
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
            description: "Search engine and social sharing metadata for this page.",
        }),
    ],


    preview: {
        select: { title: "slug.current" },
        prepare({ title }) {
            return { title: `Page — ${title}` };
        },
    },
});