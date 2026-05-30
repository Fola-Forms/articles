import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Article frontmatter schema. Every markdown file under
 * src/content/articles/ MUST satisfy this — Astro fails the build
 * if a required field is missing or mis-typed, so an agent's draft
 * can't slip into production with a malformed publish date or a
 * missing source citation.
 *
 * Editorial requirements (per the founder's brief):
 *
 *   1. {@link publishDate} BACKDATES to the date the underlying
 *      USCIS / DOS / DHS source was published — NOT the date the
 *      agent wrote the article. The reader is looking for the
 *      authority's announcement; the article is just our gloss.
 *
 *   2. Every body MUST contain four labeled sections in order:
 *      - "## What changed" (the policy / memo / cable / rule)
 *      - "## Why it matters" (real-world impact in plain English)
 *      - "## Way forward" (steps a reader can take TODAY)
 *      - "## Disclaimer" (we are not a law firm, etc.)
 *      The {@link checkBodyShape} helper in build-time scripts
 *      runs the regex check; the layout also asserts visually.
 *
 *   3. {@link sourceUrl} is REQUIRED — every article cites a real,
 *      reachable .gov page so we never claim a policy that
 *      doesn't exist.
 */
const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/articles',
  }),
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .min(8, 'title must be at least 8 characters')
        .max(200, 'title must be at most 200 characters'),

      /** SEO meta description. Lands in <meta name="description">
       *  and OpenGraph / Twitter cards. Google truncates display
       *  around 155-160 characters in the SERP but the full string
       *  is indexed; social cards (Twitter, Slack) wrap longer
       *  text gracefully. Capped at 400 to leave room for the
       *  agent-authored summaries while keeping accidental
       *  paragraphs out. */
      description: z
        .string()
        .min(60, 'description must be at least 60 characters')
        .max(400, 'description must be at most 400 characters'),

      /** Date the underlying authority (USCIS / DOS / DHS) published
       *  the source — NOT the date the article was authored. Drives
       *  list-page sort, RSS pubDate, and the byline timestamp the
       *  reader sees. */
      publishDate: z.coerce.date(),

      /** Date the article itself was written / last revised.
       *  Optional — Astro fills it from git lastUpdated when
       *  omitted. Surfaced in small print on the article page so
       *  the reader can tell a backdated article from a fresh
       *  rewrite. */
      revisedDate: z.coerce.date().optional(),

      /** Issuing agency. Drives the /authority/{slug} index pages
       *  and the agency badge that renders at the top of every
       *  article. */
      authority: z.enum(['USCIS', 'DOS', 'DHS', 'DOJ-EOIR', 'DOL', 'OTHER']),

      /** High-level category — drives the colored category pill +
       *  the /category/{slug} index pages. Kept to a stable enum
       *  so the homepage filter chips don't proliferate. */
      category: z.enum([
        'family-based',
        'employment-based',
        'humanitarian',
        'naturalization',
        'nonimmigrant',
        'removal-defense',
        'consular-processing',
        'work-authorization',
        'travel-documents',
        'policy-update',
        'visa-bulletin',
        'enforcement',
      ]),

      /** Free-form tags (lowercase, hyphenated). Drives /tags/{tag}
       *  index pages + the tag chips below each article. */
      tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1).max(8),

      /** Primary source URL — REQUIRED. The reader can verify what
       *  we're describing by clicking through. Validated as a
       *  proper URL so a typo'd "uscis.gov" without a scheme
       *  fails the build. */
      sourceUrl: z.string().url(),

      /** Path to a downloaded source PDF / memo hosted in
       *  /public/source-docs/. Convention: leading slash, e.g.
       *  "/source-docs/uscis-pm-602-0185.pdf". Optional — some
       *  topics cite a webpage rather than a PDF. */
      sourcePdf: z.string().regex(/^\/source-docs\/.+\.pdf$/).optional(),

      /** Hero image. Optional — list page falls back to a category-
       *  colored card when omitted. */
      heroImage: image().optional(),
      heroAlt: z.string().optional(),

      /** Author byline. Defaults to "Fola Editorial" so a single
       *  agent's hand isn't on display, and so re-revisions don't
       *  appear to flip authors mid-stream. */
      author: z.string().default('Fola Editorial'),

      /** Estimated read time (minutes). The new-article script
       *  fills this from a wordcount-÷-200 heuristic; an author
       *  can override. */
      readingMinutes: z.number().int().positive().optional(),

      /** Set true to keep the article out of the public site
       *  (excluded from list, RSS, sitemap, and the slug page
       *  404s). Used by agents that want to land a half-written
       *  draft so a human can finish it. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
