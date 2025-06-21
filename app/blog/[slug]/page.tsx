/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts: { slug: string }[] = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: any) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!post) return { title: "No encontrado" };

  return {
    title: post.title,
    description: post.content?.substring(0, 160) || "Artículo del blog",
  };
}

export default async function BlogPostPage({ params }: any) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!post) return notFound();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-300 whitespace-pre-line">{post.content}</p>
    </main>
  );
}
