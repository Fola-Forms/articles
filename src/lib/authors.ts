/**
 * Author registry — feeds Person JSON-LD on every article page.
 *
 * <p>The March 2026 Google Core Update weighted author authority
 * heavily: "verifiable expert credentials" became one of the top
 * three citation factors for AI Overviews. Pages with Person
 * schema attached to a known byline are cited 2-3× more often
 * than equivalent pages with anonymous authorship.
 *
 * <p>Every article in src/content/articles/ has a `author`
 * frontmatter field. The Astro layout looks up that string here;
 * unknown bylines fall back to the default Fola Editorial entry.
 * To add a new contributor: add an entry below, set the
 * `author:` field in their article's frontmatter to match the
 * key, and the Person JSON-LD picks up automatically.
 */

export interface Author {
  /** Key matched against article frontmatter `author:` field
   *  (case-insensitive). */
  key: string;
  /** Person.name as rendered in the byline + JSON-LD. */
  name: string;
  /** One-paragraph bio that appears in the Person.description
   *  JSON-LD field. ~50-80 words is the sweet spot for AI-Overview
   *  citation of the author. */
  description: string;
  /** Professional title for Person.jobTitle. Optional but
   *  strongly recommended — "Founder", "Immigration Attorney",
   *  "Editor". */
  jobTitle?: string;
  /** Person.url — author profile page (or LinkedIn / firm site).
   *  Used by crawlers to verify the author exists across the
   *  web (E-E-A-T signal). */
  url?: string;
  /** Person.sameAs — cross-platform identity links. Add LinkedIn,
   *  the author's firm page, ORCID, etc. Each entry is one URL. */
  sameAs?: string[];
  /** Person.knowsAbout — array of Wikipedia-style topic strings
   *  the author has documented expertise in. Helps Google bind
   *  the author to a subject area for E-E-A-T signaling. */
  knowsAbout?: string[];
  /** Person.image — URL to a headshot. Optional. */
  image?: string;
}

/**
 * Default byline. Every article's `author:` defaults to
 * "Fola Editorial" in content.config.ts, so this is the fallback
 * Person used when no specific author key matches.
 */
const DEFAULT: Author = {
  key: 'fola-editorial',
  name: 'Fola Editorial',
  description:
    'The Fola Form editorial team — researchers and immigration '
    + 'professionals who track USCIS, Department of State, DHS, '
    + 'and EOIR policy updates and translate them into plain-'
    + 'English guides for filers and small-firm attorneys.',
  jobTitle: 'Editorial Team',
  // Resolves to the ProfilePage at /authors/fola-editorial — a
  // verifiable landing on our own domain is a much stronger
  // E-E-A-T signal than a generic /about page would be.
  url: 'https://articles.folaform.com/authors/fola-editorial',
  sameAs: [
    'https://folaform.com',
    'https://docs.folaform.com',
    'https://folaform.com/about',
  ],
  knowsAbout: [
    'United States immigration law',
    'USCIS form preparation',
    'Department of State consular processing',
    'Executive Office for Immigration Review (EOIR) procedure',
  ],
};

export const AUTHORS: ReadonlyArray<Author> = [
  DEFAULT,
  // Add named contributors here as they author bylines. The
  // /authors/<key>/ route in src/pages/authors/[slug].astro
  // renders an automatic profile page from each entry. Set the
  // `author:` field in the article frontmatter to the entry's
  // `key` (case-insensitive) and the Person JSON-LD + the
  // profile-page link both pick up automatically.
  //
  // Template:
  //
  // {
  //   key: 'jane-doe',
  //   name: 'Jane Doe',
  //   description:
  //     'Immigration attorney with 15+ years representing clients '
  //     + 'before USCIS and EOIR. Founder of Doe Immigration Law.',
  //   jobTitle: 'Immigration Attorney',
  //   url: 'https://articles.folaform.com/authors/jane-doe',
  //   sameAs: [
  //     'https://www.linkedin.com/in/janedoeimmigration/',
  //     'https://doeimmigrationlaw.com/attorneys/jane',
  //   ],
  //   knowsAbout: [
  //     'United States immigration law',
  //     'Removal defense',
  //     'Adjustment of status',
  //   ],
  //   image: 'https://articles.folaform.com/authors/jane-doe.jpg',
  // },
];

/** Case-insensitive lookup — Astro frontmatter is freeform string,
 *  so the registry uses the lowercased + hyphenated form. */
export function resolveAuthor(byline: string | undefined): Author {
  if (!byline) return DEFAULT;
  const key = byline.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return AUTHORS.find((a) => a.key === key) ?? {
    ...DEFAULT,
    // Use the raw byline as the display name, but keep the
    // default Fola description/jobTitle/url. Adding a real
    // Author entry above flips it into a fully-attributed
    // Person block.
    name: byline,
  };
}

/** Build the Schema.org Person block for one author. Drops empty
 *  optional fields so the JSON-LD stays tidy. */
export function personBlock(author: Author): Record<string, unknown> {
  const block: Record<string, unknown> = {
    '@type': 'Person',
    '@id': 'https://articles.folaform.com/#person-' + author.key,
    'name': author.name,
    'description': author.description,
  };
  if (author.jobTitle) block['jobTitle'] = author.jobTitle;
  if (author.url) block['url'] = author.url;
  if (author.sameAs && author.sameAs.length > 0) {
    block['sameAs'] = author.sameAs;
  }
  if (author.knowsAbout && author.knowsAbout.length > 0) {
    block['knowsAbout'] = author.knowsAbout;
  }
  if (author.image) block['image'] = author.image;
  // Tie the person to the publisher Organization for E-E-A-T
  // graph completeness.
  block['worksFor'] = {
    '@type': 'Organization',
    '@id': 'https://folaform.com/#org',
    'name': 'Fola Form',
    'url': 'https://folaform.com',
  };
  return block;
}
