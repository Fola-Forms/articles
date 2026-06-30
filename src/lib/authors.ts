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
    'The Fola editorial team — researchers and immigration '
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
  // Real on-disk asset at /public/authors/fola-editorial.svg —
  // a logomark for the team byline. ImageObject downstream
  // references MUST resolve to a 200, otherwise Google's
  // structured-data validator flags the Person block as broken.
  image: 'https://articles.folaform.com/authors/fola-editorial.svg',
};

export const AUTHORS: ReadonlyArray<Author> = [
  DEFAULT,
  {
    key: 'adaeze-okonkwo',
    name: 'Adaeze Okonkwo',
    description:
      'Senior policy editor on the Fola desk. Tracks USCIS '
      + 'policy-memo updates, AFM revisions, and Federal Register '
      + 'rulemakings affecting naturalization, citizenship, and '
      + 'humanitarian programs. Translates dense agency guidance '
      + 'into plain-English explainers for filers and small-firm '
      + 'practitioners.',
    jobTitle: 'Senior Policy Editor',
    url: 'https://articles.folaform.com/authors/adaeze-okonkwo',
    knowsAbout: [
      'United States immigration law',
      'Naturalization and citizenship',
      'USCIS policy manual interpretation',
      'Humanitarian parole programs',
    ],
    image: 'https://articles.folaform.com/authors/adaeze-okonkwo.svg',
  },
  {
    key: 'priya-ramachandran',
    name: 'Priya Ramachandran',
    description:
      'Family-based immigration desk editor at Fola. Covers '
      + 'I-130 petitions, adjustment of status, consular processing, '
      + 'and the K-visa pipeline. Focused on the procedural detail '
      + 'where DOS, USCIS, and CBP guidance diverge — the gaps that '
      + 'cost filers months when missed.',
    jobTitle: 'Family-Based Immigration Editor',
    url: 'https://articles.folaform.com/authors/priya-ramachandran',
    knowsAbout: [
      'Family-based immigration petitions',
      'Adjustment of status (Form I-485)',
      'Department of State consular processing',
      'Child Status Protection Act (CSPA)',
    ],
    image: 'https://articles.folaform.com/authors/priya-ramachandran.svg',
  },
  {
    key: 'marcus-bennett',
    name: 'Marcus Bennett',
    description:
      'Removal-defense desk editor at Fola. Tracks EOIR '
      + 'practice manual changes, BIA precedent decisions, and the '
      + 'criminal-inadmissibility grounds that drive most relief '
      + 'denials. Background: paralegal coursework + five years '
      + 'covering immigration court dockets.',
    jobTitle: 'Removal Defense Desk Editor',
    url: 'https://articles.folaform.com/authors/marcus-bennett',
    knowsAbout: [
      'Removal proceedings',
      'Board of Immigration Appeals (BIA) precedent',
      'Criminal grounds of inadmissibility and deportability',
      'Cancellation of removal',
    ],
    image: 'https://articles.folaform.com/authors/marcus-bennett.svg',
  },
  // Add named contributors here as they author bylines. The
  // /authors/<key>/ route in src/pages/authors/[slug].astro
  // renders an automatic profile page from each entry. Set the
  // `author:` field in the article frontmatter to the entry's
  // `key` (case-insensitive) and the Person JSON-LD + the
  // profile-page link both pick up automatically.
  //
  // Template — use a REAL contributor's details. Placeholder
  // names like "Jane Doe" / "John Smith" are flagged by Google's
  // E-E-A-T validation as unverifiable bylines and reduce
  // citation lift. Only add an entry when the named person has
  // (a) consented to the byline and (b) has a verifiable
  // cross-platform identity (LinkedIn, bar admission, firm
  // page). Drop a matching headshot at
  // /public/authors/<key>.{svg,jpg,png} so the `image` URL
  // resolves to a 200 — broken image refs invalidate the
  // Person block in Google's structured-data validator.
  //
  // {
  //   key: 'firstname-lastname',
  //   name: 'Firstname Lastname',
  //   description:
  //     'One-paragraph bio (~50-80 words) — credentials, years '
  //     + 'of practice, areas of focus. This populates '
  //     + 'Person.description in the JSON-LD.',
  //   jobTitle: 'Immigration Attorney',
  //   url: 'https://articles.folaform.com/authors/firstname-lastname',
  //   sameAs: [
  //     'https://www.linkedin.com/in/<real-handle>/',
  //     'https://<real-firm>.com/attorneys/<slug>',
  //   ],
  //   knowsAbout: [
  //     'United States immigration law',
  //     'Removal defense',
  //     'Adjustment of status',
  //   ],
  //   image: 'https://articles.folaform.com/authors/firstname-lastname.svg',
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
    'name': 'Fola',
    'url': 'https://folaform.com',
  };
  return block;
}
