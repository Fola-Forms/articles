#!/usr/bin/env node
/* Scaffolds a new article skeleton under
 * src/content/articles/<slug>.md with the four mandatory sections
 * pre-stamped + a frontmatter template the editor fills in.
 *
 * Usage: npm run new-article -- my-slug
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error(
    'usage: npm run new-article -- <slug>  (lowercase, hyphenated)',
  );
  process.exit(1);
}
const file = resolve(
  __dirname,
  '..',
  'src',
  'content',
  'articles',
  `${slug}.mdx`,
);
if (existsSync(file)) {
  console.error(`refused to overwrite ${file}`);
  process.exit(1);
}
mkdirSync(dirname(file), { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const tpl = `---
title: ""
description: ""
publishDate: ${today}
authority: USCIS
category: family-based
tags:
  - REPLACE_ME
sourceUrl: https://www.uscis.gov/REPLACE_ME
readingMinutes: 6
draft: true
---

Lede paragraph — one-or-two sentences orienting the reader.

## What changed

The policy / memo / cable / rule in plain English. Include the
exact citation (PM-#, AFM ch., 89 FR #) and the effective date.

## Why it matters

Real-world impact. Who feels this first, what changes for filings
in flight, what the math is for the common case.

## Way forward

Three to five practitioner-side bullets — concrete, actionable,
TODAY. Link to the relevant forms / USCIS pages.

## Disclaimer

Fola Form is a software company, not a law firm. Nothing in
this article is legal advice. Verify against the linked primary
source and consult a licensed immigration attorney.
`;
writeFileSync(file, tpl, 'utf8');
console.log(`created ${file}`);
console.log('next: edit the frontmatter, replace REPLACE_ME tags, set draft: false');
