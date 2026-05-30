import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

/**
 * Machine-readable article feed at /feed.json.
 *
 * <p>Consumed by the workspace backend's
 * {@code PlatformUpdateSyncScheduler} every few hours — the
 * scheduler pulls this JSON, deduplicates against the
 * {@code platform_updates} table (by URL), and inserts new rows
 * so workspace users see the latest article surface in the
 * top-of-page bulletin banner automatically.
 *
 * <p>Distinct from {@code /search.json} (which the homepage
 * search uses) in that this feed carries the metadata fields
 * the backend needs for routing — {@code authority} for the
 * kind mapping, {@code publishDate} for chronology / sort.
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
      url: `https://articles.folaform.com/articles/${slug}`,
      title: entry.data.title,
      description: entry.data.description,
      authority: entry.data.authority,
      category: entry.data.category,
      tags: entry.data.tags,
      publishDate: entry.data.publishDate.toISOString(),
      sourceUrl: entry.data.sourceUrl,
      sourcePdf: entry.data.sourcePdf ?? null,
    };
  });

  return new Response(
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      count: items.length,
      items,
    }),
    {
      headers: {
        'content-type': 'application/json',
        // 1-hour cache so consumers don't thrash; the workspace
        // scheduler polls every 6 hours anyway.
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    },
  );
};
