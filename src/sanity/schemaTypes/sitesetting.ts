import { defineType, defineField, defineArrayMember } from "sanity";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",

    fields: [
        defineField({
            name: "siteName",
            title: "Site Name",
            type: "string",
            validation: (R) => R.required(),
        }),

        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
        }),

        defineField({
            name: "defaultSeo",
            title: "Default SEO",
            type: "seo",
        }),

        defineField({
            name: "defaultOgImage",
            title: "Default OG Image",
            type: "image",
            options: { hotspot: true },
        }),

        defineField({
            name: "socialLinks",
            title: "Social Links",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "platform",
                            title: "Platform",
                            type: "string",
                        }),
                        defineField({
                            name: "url",
                            title: "URL",
                            type: "url",
                        }),
                    ],
                }),
            ],
        }),

        defineField({
            name: "navLinks",
            title: "Navigation Links",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({ name: "label", type: "string" }),
                        defineField({ name: "href", type: "string" }),
                    ],
                }),
            ],
        }),

        defineField({
            name: "footerCopyright",
            title: "Footer Copyright",
            type: "string",
        }),

        defineField({
            name: "resumePdf",
            title: "Resume PDF",
            type: "file",
            options: { accept: "application/pdf" },
        }),
    ],

    preview: {
        prepare() {
            return { title: "Site Settings" };
        },
    },
});