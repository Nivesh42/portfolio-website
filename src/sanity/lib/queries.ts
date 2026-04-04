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

export const caseStudiesQuery = defineQuery(`
  *[_type == "project"] | order(featured desc, publishedAt desc)[0...4]{
    title,
    "slug": slug.current,
    industry,
    subheading,
    outcomeMetrics[0...2]
  }
`);

export const postsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc)[0...3]{
    title,
    "slug": slug.current,
    tags,
    publishedAt
  }
`);