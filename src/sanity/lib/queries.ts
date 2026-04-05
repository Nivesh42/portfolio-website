import { defineQuery } from "groq";

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    footerCopyright,
    resumePdf { asset-> { url } },
    socialLinks[] { platform, url },
    navLinks[] { label, href },
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "page"][0] {
    hero {
      badge,
      headlineLineOne,
      headlineLineTwo,
      headlineAccent,
      subheadline,
      primaryCta,
      secondaryCta,
    },
    about {
      headlineLineOne,
      headlineLineTwo,
      bio,
      timeline[] {
        period,
        role,
        description,
        current,
      },
    },
    contact {
      heading,
      nameLabel,
      namePlaceholder,
      emailLabel,
      emailPlaceholder,
      messageLabel,
      messagePlaceholder,
      submitLabel,
    },
    "settings": *[_type == "siteSettings"][0]{
      resumePdf {
        asset->{ url }
      }
    }
  }
`);

// Homepage — 2 featured projects only
export const caseStudiesPreviewQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(publishedAt desc)[0...2]{
    title,
    "slug": slug.current,
    industry,
    subheading,
    outcomeMetrics[0...2]
  }
`);

// /case-studies index — all projects
export const allCaseStudiesQuery = defineQuery(`
  *[_type == "project"] | order(featured desc, publishedAt desc){
    title,
    "slug": slug.current,
    industry,
    subheading,
    outcomeMetrics[0...2]
  }
`);

// Homepage — 2 featured posts only
export const postsPreviewQuery = defineQuery(`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...2]{
    title,
    "slug": slug.current,
    tags,
    publishedAt
  }
`);

// /essays index — all posts
export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc){
    title,
    "slug": slug.current,
    tags,
    publishedAt
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    industry,
    subheading,
    tags,
    publishedAt,
    outcomeMetrics,
    heroImage {
      asset->{ url },
      alt
    },
    sections[] {
      _type,
      _key,
      // textBlock
      _type == "textBlock" => {  title, body },
      // imageBlock
      _type == "imageBlock" => {
        image { asset->{ url } },
        caption,
        alt,
        fullWidth
      },
      // metricsBlock
      _type == "metricsBlock" => {
        metrics[] { value, label }
      },
      // quoteBlock
      _type == "quoteBlock" => { quote, attribution },
      // divider
      _type == "divider" => { variant }
    },
    "nextProject": *[_type == "project" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0] {
      title,
      "slug": slug.current
    }
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    tags,
    publishedAt,
    coverImage {
      asset->{ url },
      alt
    },
    body,
    "readingTime": round(length(pt::text(body)) / 5 / 180),
    "nextPost": *[_type == "post" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0] {
      title,
      "slug": slug.current
    }
  }
`);