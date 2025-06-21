import {client} from '@/lib/sanity'
const BASE_URL = "https://dawa-lab14.netlify.app"

async function fetchBlogSlugs() {
  const query = `*[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }`;

  const posts = await client.fetch(query);

  return posts.map(post => post.slug);
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
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
