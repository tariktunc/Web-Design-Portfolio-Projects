import { getBaseUrl } from "@/app/lib/config";

export async function GET() {
  const baseUrl = getBaseUrl();

  const sitemaps = [
    { loc: `${baseUrl}/pages-sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/blog-sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/projects-sitemap.xml`, lastmod: new Date().toISOString() },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
