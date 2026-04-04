import type {
    HomePageQueryResult,
    CaseStudiesQueryResult,
    PostsQueryResult,
    SiteSettingsQueryResult,
} from "../../sanity.types";

export type HeroData = NonNullable<HomePageQueryResult>["hero"];
export type AboutData = NonNullable<HomePageQueryResult>["about"];
export type ContactData = NonNullable<HomePageQueryResult>["contact"];

export type ProjectCardData = CaseStudiesQueryResult[number];
export type PostCardData = PostsQueryResult[number];

export type SiteSettings = NonNullable<SiteSettingsQueryResult>;
export type NavLink = NonNullable<SiteSettings["navLinks"]>[number];
export type SocialLink = NonNullable<SiteSettings["socialLinks"]>[number];

export type TimelineItem = NonNullable<NonNullable<AboutData>["timeline"]>[number];
export type OutcomeMetric = NonNullable<NonNullable<ProjectCardData["outcomeMetrics"]>>[number];