import { type SchemaTypeDefinition } from 'sanity';
import { seoObject } from "./objects/seo";
import { portableTextBody } from "./objects/portabletextbody";
import { pageSchema } from "./page";
import { projectSchema } from "./project";
import { postSchema } from "./post";
import { siteSettings } from "./sitesetting";

export const schemaTypes = [
    // objects first — documents depend on them
    seoObject,
    portableTextBody,
    // documents
    pageSchema,
    projectSchema,
    postSchema,
    siteSettings
];

export const schema: { types: SchemaTypeDefinition[] } = {
    types: schemaTypes,
};
