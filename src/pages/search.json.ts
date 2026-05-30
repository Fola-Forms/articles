import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

/**
 * Static search index — emitted at build time as /search.json.
 * The homepage fetches this once on first keystroke and runs an
 * in-memory fuzzy match. Zero server, zero database, sub-100 ms
 * on a 1000-article corpus.
 */
export const GET: APIRoute = async () => {
  const entries = (await getCollection('articles'))
    .filter((e) => !e.data.draft)
    .sort(
      (a, b) =>
        b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
    );

  const items = entries.map((entry) => {
    const slug = entry.id.replace(/\.(md|mdx)$/, '');
    return {
      slug,
      href: `/articles/${slug}`,
      title: entry.data.title,
      description: entry.data.description,
      authority: entry.data.authority,
      category: entry.data.category,
      tags: entry.data.tags,
      publishDate: entry.data.publishDate.toISOString(),
      readingMinutes: entry.data.readingMinutes ?? null,
    };
  });

  return new Response(JSON.stringify({ items }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=300, s-maxage=300',
    },
  });
};
