import { getAllBlogPosts } from "@/app/lib/projects";

export async function GET() {
  const posts = getAllBlogPosts();
  const siteUrl = "https://tariktunc.vercel.app";

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/weblog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/weblog/${post.slug}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.categories}</category>
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tarık Tunç Blog</title>
    <link>${siteUrl}/weblog</link>
    <description>Tarık Tunç'un teknik blog yazıları — React, Next.js, TypeScript ve web geliştirme.</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
