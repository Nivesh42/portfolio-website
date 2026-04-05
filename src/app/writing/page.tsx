import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";
import { Writing } from "@/components";

export const revalidate = 60;

export default async function EssaysPage() {
    const posts = await client.fetch(allPostsQuery);

    return <Writing posts={posts} showCTA={false}/>;
}