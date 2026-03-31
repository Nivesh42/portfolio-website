import { defineType, defineArrayMember } from "sanity";

export const portableTextBody = defineType({
    name: "portableTextBody",
    title: "Body",
    type: "array",
    of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
            type: "image",
            options: { hotspot: true },
            fields: [
                {
                    name: "caption",
                    type: "string",
                    title: "Caption",
                },
                {
                    name: "alt",
                    type: "string",
                    title: "Alt text",
                    validation: (R) => R.required().warning("Alt text is required for accessibility and SEO"),
                },
            ],
        }),
    ],
});