const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// Simulación: esta función debería obtener los slugs reales desde una base de datos o CMS
async function fetchBlogSlugs() {
  return ["articulo-1", "articulo-2", "guia-seo"];
}

export async function GET() {
  const staticUrls = ["/", "/blog", "/contacto"];
  const blogSlugs = await fetchBlogSlugs();
  const blogUrls = blogSlugs.map(slug => `/blog/${slug}`);

  const allUrls = [...staticUrls, ...blogUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(url => `
    <url>
      <loc>${BASE_URL}${url}</loc>
    </url>`)
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
