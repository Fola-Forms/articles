import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * RSS feed at /rss.xml. Every PUBLISHED article in the corpus,
 * newest first — the pubDate is the agency's backdated publish
 * date, NOT the article's authoring date, so a feed reader's
 * timeline matches the USCIS / DOS / DHS announcement order.
 */
export async function GET(context: APIContext) {
  const entries = (await getCollection('articles'))
    .filter((e) => !e.data.draft)
    .sort(
      (a, b) =>
        b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
    );

  return rss({
    title: 'Fola Articles',
    description:
      'Plain-English breakdowns of every USCIS memo, DOS cable, and DHS rule that touches immigration practice. Educational content only — not legal advice.',
    site: context.site!,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/articles/${entry.id.replace(/\.(md|mdx)$/, '')}`,
      categories: entry.data.tags,
      author: entry.data.author,
    })),
    customData: '<language>en-us</language>',
  });
}
