// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * articles.folaform.com — long-form articles on USCIS / DOS / DHS
 * immigration policy. Each article is a markdown file in
 * src/content/articles/<slug>.md (or .mdx) with typed frontmatter
 * — see src/content/config.ts.
 *
 * Deploys to Netlify at the articles.folaform.com subdomain. The
 * @astrojs/sitemap plugin emits /sitemap-index.xml at build time,
 * and src/pages/rss.xml.ts emits the article feed. No runtime
 * JavaScript except the optional client islands; Lighthouse 100
 * is the target.
 */
export default defineConfig({
  site: 'https://articles.folaform.com',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({
      // Group every published article under one tile in
      // Search Console — same posture the docs-site uses.
      changefreq: 'monthly',
      // Skip draft routes — they're filtered out of the article
      // collection at content-load time, but the sitemap plugin
      // sees the raw routes, so we filter here too.
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  build: {
    // Per-article HTML page + a short trailing-slash-less URL
    // (articles.folaform.com/articles/<slug>).
    format: 'file',
  },
  markdown: {
    shikiConfig: {
      // Match the docs-site's theme so any inline code snippets
      // we ship in an article render identically across both
      // subdomains.
      theme: 'github-light',
      wrap: true,
    },
  },
});
