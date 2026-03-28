import { getBaseUrl } from "@/app/lib/config";
import { getAllProjects } from "@/app/lib/projects";

export async function GET() {
  const baseUrl = getBaseUrl();
  const projects = getAllProjects();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${projects.map((p) => `  <url>
    <loc>${baseUrl}/projeler/${p.slug}</loc>
    <lastmod>2026-03-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
