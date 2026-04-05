import type {
    HomePageQueryResult,
    CaseStudiesPreviewQueryResult,
    AllCaseStudiesQueryResult,
    AllPostsQueryResult,
    SiteSettingsQueryResult,
    ProjectBySlugQueryResult,
    PostBySlugQueryResult,
} from "../../sanity.types";

export type HeroData = NonNullable<HomePageQueryResult>["hero"];
export type AboutData = NonNullable<HomePageQueryResult>["about"];
export type ContactData = NonNullable<HomePageQueryResult>["contact"];

export type ProjectCardData = CaseStudiesPreviewQueryResult[number];
export type AllProjectCardData = AllCaseStudiesQueryResult[number];
export type PostCardData = AllPostsQueryResult[number];

export type ProjectDetail = NonNullable<ProjectBySlugQueryResult>;
export type ProjectSection = NonNullable<ProjectDetail["sections"]>[number];

export type PostDetail = NonNullable<PostBySlugQueryResult>;

export type SiteSettings = NonNullable<SiteSettingsQueryResult>;
export type NavLink = NonNullable<SiteSettings["navLinks"]>[number];
export type SocialLink = NonNullable<SiteSettings["socialLinks"]>[number];

export type TimelineItem = NonNullable<NonNullable<AboutData>["timeline"]>[number];
export type OutcomeMetric = NonNullable<NonNullable<ProjectCardData["outcomeMetrics"]>>[number];