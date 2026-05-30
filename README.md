# articles.folaform.com

Long-form articles on USCIS, DOS, and DHS immigration policy.
Static Astro site, deploys from `main` to Netlify at
**articles.folaform.com**.

```
articles-site/
├── astro.config.mjs        # Astro + sitemap + MDX
├── netlify.toml            # Netlify build config
├── public/
│   └── source-docs/        # downloaded USCIS / DOS / DHS PDFs
├── scripts/
│   └── new-article.mjs     # `npm run new-article -- my-slug`
└── src/
    ├── content/
    │   ├── articles/       # one .mdx file per article (markdown
    │   │                    # body + optional Astro / MDX components)
    │   └── config.ts       # typed frontmatter schema
    ├── layouts/            # BaseLayout + ArticleLayout
    ├── pages/              # index, articles/[slug], tags, authority, rss
    ├── components/         # ArticleCard
    └── styles/             # global.css (brand tokens)
```

## Local dev

```sh
cd articles-site
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

## Writing a new article

```sh
npm run new-article -- my-slug
```

That stamps a `src/content/articles/my-slug.mdx` skeleton with the
four mandatory sections (`## What changed`, `## Why it matters`,
`## Way forward`, `## Disclaimer`) and a placeholder frontmatter
block. Fill it in, set `draft: false`, push.

## Frontmatter fields

| field | required | note |
| ----- | -------- | ---- |
| `title` | yes | 8-140 chars |
| `description` | yes | 60-200 chars — lands in `<meta name="description">` and OG card |
| `publishDate` | yes | **BACKDATE to the day the USCIS/DOS/DHS source was published**, NOT the day this article was written |
| `revisedDate` | no | when we last edited the article |
| `authority` | yes | `USCIS` / `DOS` / `DHS` / `DOJ-EOIR` / `DOL` / `OTHER` |
| `category` | yes | one of the enums in `src/content/config.ts` |
| `tags` | yes | 1-8 lowercase hyphenated tags |
| `sourceUrl` | yes | URL to the primary source — verified by the build |
| `sourcePdf` | no | `/source-docs/foo.pdf` (path under `public/`) |
| `heroImage` | no | optional image import |
| `heroAlt` | no | required if `heroImage` is set |
| `author` | no | defaults to `Fola Editorial` |
| `readingMinutes` | no | integer; otherwise auto-estimated |
| `draft` | no | `true` keeps the article out of build output |

## The four mandatory sections

Every article body MUST contain, in this order:

1. `## What changed` — the policy / memo / cable / rule in plain
   English.
2. `## Why it matters` — real-world impact for practitioners and
   the people they represent.
3. `## Way forward` — three to five concrete bullets the reader
   can act on today.
4. `## Disclaimer` — we are not a law firm; not legal advice;
   verify against the primary source.

The `ArticleLayout` re-asserts the disclaimer at the bottom as a
backstop even if a draft drops it.

## Source PDFs

Drop downloaded USCIS memos / DOS cables / DHS policy memos under
`public/source-docs/` with descriptive filenames
(`uscis-pm-602-0185.pdf`, `dos-9-fam-302-1.pdf`, etc.). Reference
them in frontmatter via `sourcePdf: /source-docs/foo.pdf`. They
ship cache-immutable so a returning reader doesn't re-download
multi-MB memos.

## Deploys

Pushes to `main` auto-deploy via Netlify. No CI gate beyond
Astro's content-collection schema validation — a malformed
frontmatter fails the build, the deploy never goes out.
