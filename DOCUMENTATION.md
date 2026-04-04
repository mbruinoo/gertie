# Gertie Project

## What is Gertie?

Gertie is a platform for the creation and experience of contemporary art, based in Chicago. Tagline: *"From the world to Chicago and Chicago to the world."*

The site serves two audiences:
- **General public** — browsing exhibitions, learning about Gertie, signing up for updates
- **Gertie staff** — editing and proposing content changes via Payload CMS admin

---

## Tech Stack

- **Frontend**: Next.js (App Router), deployed on Vercel
- **CMS**: Payload CMS v3, co-located in the Next.js repo
- **Database**: PostgreSQL via Neon (free tier, serverless)
- **Auth**: Payload built-in auth (staff only)
- **Styling**: Tailwind CSS, ported from existing Webflow site
- **Fonts**: Custom typefaces (files provided by Matt)
- **Transactional Email**: Resend (free tier, via `@payloadcms/email-resend`) — staff password resets only
- **Deployment**: Vercel (develop on default Vercel domain; custom domain exists for later)
- **Repo**: GitHub (Matt's personal account)

---

## Staff User Roles

Four-tier hierarchy:

- **Dev** — full access, system-level control
- **Admin** — full CMS access, can publish changes directly; multiple allowed
- **Manager** — can propose and accept/approve changes
- **Editor** — can only propose changes (drafts); cannot publish

Payload's draft/publish workflow handles the Manager and Editor distinction. No public-facing member login system in scope yet.

---

## "Coming Soon" Modal

Used in multiple places across the site. Triggers on:
- `/login` — member login page
- Membership CTA buttons (both Community and Immersive tiers)
- CXW 2026 nav item (hover/click)
- Immersive membership link (no external URL yet)

**Behavior:** Displays a modal with "Coming Soon" messaging and a Klaviyo email signup embed for updates. Build this as a single reusable modal component.

---

## Site Pages

- `/` — Homepage (hero, image collage, events ticker/marquee, Klaviyo email signup embed in footer)
- `/about` — About Gertie + team
- `/exhibitions` — Upcoming and past list
- `/exhibitions/[slug]` — Single exhibition detail
- `/membership` — Two-tier display; both CTAs trigger Coming Soon modal
- `/hub` — Gertie's public front page; full Hub content lives on third-party membership platform
- `/cxw-2026` — Chicago Exhibition Weekend 2026; nav item triggers Coming Soon on hover/click
- `/admin` — Payload CMS admin panel (staff only)

No `/login` route needed yet — login button triggers Coming Soon modal.

---

## Design Language & Webflow Port

**The design already exists as a complete, mobile-responsive Webflow site.** Matt will provide HTML/CSS exports page by page, plus font files. The job is to port these faithfully into Next.js as React components.

- Do not redesign. Match the Webflow output as closely as possible.
- Convert Webflow HTML/CSS into reusable React components with Tailwind
- Custom typefaces loaded via `next/font` or `@font-face` from provided files
- Yellow CTA accent and editorial aesthetic carry through exactly

**Workflow per page:**
1. Matt provides Webflow HTML/CSS export for that page
2. Break into React components
3. Wire up to Payload CMS data where applicable
4. Verify mobile responsiveness matches original

---

## Payload CMS Collections

Four collections only:

**Pages**
- title, slug, content (rich text / layout blocks)
- Covers: About, Hub, and any other static pages

**Exhibitions**
- title, slug, status (upcoming / past), date_start, date_end, venue, description, curators, cover_image

**Events**
- Matt has existing CSV files of past events to port in — request these files before building
- Fields TBD once CSVs are reviewed

**Users (Staff)**
- email, password, role (dev / admin / manager / editor)
- Payload's built-in Users collection, extended with role field

---

## Email & External Services

- **Resend** — transactional email for staff password resets only; free tier; native Payload plugin
- **Klaviyo** — email signup embeds in homepage footer and Coming Soon modal; no deep integration, embed code only
- **Membership platform** — external third-party site; Gertie Next.js site links out to it (links TBD)
- **Hub content** — managed entirely by third-party membership platform; `/hub` on this site is a public-facing front page only

---

## Project Phases

**Phase 1 — Foundation (current)**
Init Next.js + Payload repo → connect Neon DB → deploy to Vercel → Payload admin working → staff user roles configured → Resend connected

**Phase 2 — Coming Soon Modal**
Build reusable Coming Soon + Klaviyo modal component → wire up to all trigger points (login, membership CTAs, CXW nav item)

**Phase 3 — Content Pages (Webflow Port)**
For each page: receive HTML/CSS from Matt → convert to React components → wire to CMS → verify mobile

Order: Homepage → About → Exhibitions → Single Exhibition → Membership → Hub → CXW 2026

**Phase 4 — Events CSV Import**
Receive CSV files from Matt → define Events collection schema → import data → wire to frontend

**Phase 5 — Polish & Launch**
Custom domain cutover, final Klaviyo embed QA, SEO/OG images, final review

---

## Open Questions / TBD

- Events CSV files — request from Matt before building Events collection
- External membership platform URL (for when Coming Soon is retired)
- Hub page content direction — what should the public-facing front page say/show?
- Transactional email for any future member-facing flows (not in scope now)

---

## Conventions

- App Router, not Pages Router
- TypeScript throughout
- Payload co-located in Next.js repo (`/src/payload.config.ts`)
- Tailwind CSS — stay true to Webflow source
- `.env.local` for local secrets; Vercel dashboard for production
- Feature branches per major section; commit early and often
- **Verify before customizing.** When setting up a new framework, get a default installation working first — perhaps by finding a default implementation from the framework's documentation online — and only after getting the default to work, layer in customizations. Debugging a custom setup is much harder when you don't know if the baseline even works.

---

## CMS Editability Philosophy

The guiding principle: **if it could ever need to change, it should be editable in the CMS without a code deploy.** These are the patterns we use to enforce that.

### Prefer richText over text, always
Even for short fields like section labels, accordion item names, or photo captions — use `richText` rather than `text`. Plain `text` locks the content into a single style. `richText` lets the editor bold, italicize, link, or change the heading level without touching code. The overhead is minimal and the flexibility is worth it.

### Every richText field gets the full editor
All richText fields use the same `fullEditor` constant (defined once in the collection file), which includes:
- `FixedToolbarFeature` — toolbar always visible; no need to select text to discover options
- `ParagraphFeature` + `HeadingFeature` (H1–H6) — full type hierarchy available
- `BoldFeature`, `ItalicFeature`, `UnderlineFeature`
- `LinkFeature`
- `OrderedListFeature`, `UnorderedListFeature`
- `BlockquoteFeature`, `HorizontalRuleFeature`

Don't give some fields a limited subset "because they're short." The editor is the same size either way and limiting it just creates friction later.

### CSS sets the default; the editor lets you override
The frontend CSS styles raw output nodes (e.g. `.page-section-label p { font-size: 16px; font-weight: 700 }`) so the most common case looks right without any formatting applied in the editor. If a specific section needs to look different, the editor can override it by switching the node type (e.g. from Paragraph to H3). This means: **don't hardcode presentation in the component — put it in CSS so the editor's choices can override it.**

### Layout options belong on the block, not in the code
Any presentation toggle that might vary per-section — like `constrainWidth` — should be a field on the block itself (usually a checkbox with a sensible default). This keeps layout decisions out of code and in the hands of whoever is editing content.

### When in doubt, add the field
It's much cheaper to add a field that rarely gets used than to deploy code every time a piece of content needs to change shape. If there's a reasonable chance that a value will need to change per-page or per-section, it should be a CMS field.

---

## Lessons Learned

### Payload CMS: Globals use POST, not PATCH
Payload v3 REST API uses `POST /api/globals/{slug}` to update globals — not `PATCH`. This is unlike collections, which use `PATCH /api/collections/{slug}/{id}`.

### Payload CMS: Drafts hide documents from REST API
When `versions: { drafts: true }` is enabled on a collection, the REST API's `GET /api/{collection}` only returns published documents. If a document exists in the DB but doesn't appear in API results, it may be in draft state or the query may be hitting the wrong endpoint. Workaround: query by known ID directly, or use the Payload local API (server-side) instead of the REST API.

### Payload CMS: Field type changes require manual DB migration
`pnpm payload migrate:create` can fail in ESM environments. When adding new fields or changing a field's type (e.g. `text` → `richText`), add columns manually via SQL on the Neon DB. For type changes, drop the old column and add the new one — existing data is lost and must be re-pushed via script.

### Payload CMS: Changing a field from `text` to `richText`
The DB column type changes from `varchar` to `jsonb`. The REST API will return 500 errors until the column type matches. After the SQL migration, re-push content using a script that constructs proper Lexical JSON (see `lexical()` helper in push scripts).

### Payload CMS: richText fields must receive Lexical JSON, never plain strings
Always construct richText values as Lexical JSON objects, even for simple single-paragraph content. Plain strings cause "value passed to Lexical editor is not an object" errors in the admin. If old plain-string data is in the DB from a previous API call, null it out and re-push as proper Lexical JSON.

### Server/Client boundary: RichText is server-only
`RichText` from `@payloadcms/richtext-lexical/react` cannot be used in `'use client'` components. Pattern: make the parent a server component, extract any browser behavior (scroll listeners, DOM queries) into a thin `'use client'` child that renders `null` and queries the DOM by CSS class name rather than refs.

### CSS: Use classes for positioning that needs media query overrides
Don't use inline `style` props for values you may want to override with `@media` breakpoints — inline styles have higher specificity and `!important` becomes necessary. Move positioning into CSS classes so media queries work naturally.

### Payload admin credentials
Dev admin for Playwright / Puppeteer tests: `test@bruinooge.net` — password in `.env` as `PLAYWRIGHT_DEV_ADMIN_PASSWORD`. Agent/editor user: `agent@bruinooge.net` — password in `.env` as `PLAYWRIGHT_TEST_PASSWORD`.
