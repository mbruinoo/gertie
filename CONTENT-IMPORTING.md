# Content Importing Log

Track every media file imported into Payload: original filename, clean filename, and context.

## Naming conventions
- kebab-case, lowercase
- Descriptive: `[exhibition-or-event-slug]-[descriptor].[ext]`
- No redundant prefixes like "gertie-" since it's already the Gertie site
- Year included when relevant to distinguish versions
- Examples: `over-my-head-2025-installation.jpg`, `cxw-2024-dinner.jpg`

## Redirect policy
If a file is renamed or a page URL changes during the port, the old URL must be
added to `next.config.js` redirects before the change is merged. The media import
tracking tests in `tests/e2e/content.spec.ts` will break on any URL change,
which is the intended signal to add the redirect.

---

## Imports

| Original filename | Clean filename | Payload ID | Context | Date |
|---|---|---|---|---|
| `Gertie-Over-My-Head-2025-Thumbnail.jpg` | `over-my-head-2025-installation.jpg` | 8 | Masthead photo A | 2026-04-04 |
| `Gertie-Over-My-Head-2025-Thumbnail-2.jpg` | `elvis-lives-2025.jpg` | 9 | Masthead photo B | 2026-04-04 |
| `Gertie-Exhibition-Thumbnail-3.jpg` | `gertie-dinner.jpg` | 10 | Masthead photo C | 2026-04-04 |
