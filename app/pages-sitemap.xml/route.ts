import { getBaseUrl } from "@/app/lib/config";

const staticPages = [
  { path: "", changefreq: "monthly", priority: "1.0" },
  { path: "/projeler", changefreq: "monthly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  { path: "/ben-kimim", changefreq: "monthly", priority: "0.7" },
  { path: "/iletisim", changefreq: "yearly", priority: "0.5" },
  { path: "/gizlilik", changefreq: "yearly", priority: "0.3" },
  { path: "/kullanim-sartlari", changefreq: "yearly", priority: "0.3" },
  { path: "/cerez-politikasi", changefreq: "yearly", priority: "0.3" },
];

export async function GET() {
  const baseUrl = getBaseUrl();
  const lastmod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
