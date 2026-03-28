import { getBaseUrl } from "@/app/lib/config";
import { getAllBlogPosts } from "@/app/lib/projects";

export async function GET() {
  const baseUrl = getBaseUrl();
  const posts = getAllBlogPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts.map((post) => `  <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${post.date ? new Date(post.date).toISOString() : new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
