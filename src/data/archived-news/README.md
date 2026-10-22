# Reversible archive pilot

- Pilot: `vaca-muerta-demanda-infraestructura-habitacional` (Supabase ID 8), oldest published date: `2025-11-01`.
- JSON is the full original row, including all nulls, timestamps and unchanged body. No author is added: the original `author` is null.
- Original remains in Supabase. No writes, deletion, migration or production deployment are part of this pilot.
- Live rows take precedence; registered published archives fill missing slugs. Static lookup and SEO use the same archive registry. Existing presentation components and URLs are unchanged.
- The original image is project-owned `public/images/fabrica/fabrica-31.jpg`, not external. Preserve that file with the archive. External URLs in future archives must remain unchanged, but a successful check does not guarantee third-party permanence.

## Validation and rollback

Run `bun test scripts/newsSources.test.ts`. Preview checks must compare the normal page with a browser-only simulated response omitting ID 8, including body, metadata, image, list deduplication and another live article. The simulation must never modify Supabase.

Rollback: remove the pilot import/registration from `src/data/archivedNews.ts` (retain the JSON for audit). While the original remains published, live behavior is unchanged. Remove the integration files only if reverting the entire feature.

## Future removal gate — not performed

1. Re-read the complete original row and compare it deeply with the archived JSON; if the CMS changed, refresh the copy before proceeding.
2. Verify image availability, exact detail presentation, SEO outputs and missing-original preview again.
3. Obtain separate approval to deploy; deploy and confirm the actual public article and SEO are available from the archive.
4. Obtain explicit separate approval for any Supabase removal. Keep a complete backup; admin editing currently covers only Supabase records, not archived JSON.
5. After an approved removal, check the public URL, listings and SEO again following a fresh snapshot sync. Archive registration, not a stale snapshot or bundled copy, must supply the article.

To expand later, add complete validated row JSON files and explicit registry entries. No automatic deletions are implemented.

## Pilot verification — October 22, 2026

- Read-only live `SELECT *` comparison: all 19 JSON fields deeply equal the original Supabase row, including null author and unchanged creation/update timestamps.
- Six automated tests passed. SEO generated into temporary directories is identical with and without the original snapshot row (except the intentionally normalized RSS generation timestamp); sitemap/RSS/prerender contain the pilot once.
- Preview at `/novedades/vaca-muerta-demanda-infraestructura-habitacional`: full rendered root HTML, title, description, canonical, share image and structured data are identical to the baseline captured before integration, both with the real live response and a browser-only response omitting the original.
- Missing-original simulation: 13 unique public articles, pilot appears exactly once, one latest badge, and navigation to live `tipos-de-modulos-habitacionales` succeeds with its original heading and writer. Home shows three news links. Mobile pilot at 390 × 844 has no horizontal overflow; desktop verified at 1280 × 1800. No uncaught browser runtime errors.
- Pilot cover: original local JPEG, 1280 × 789; preview and public image requests both return HTTP 200 image/jpeg. No external images belong to this pilot.
- Existing unrelated problem observed before and after integration: the cover of `tipos-de-modulos-habitacionales` fails to load in local preview. Its text, writer and magazine load; this pilot did not change or fix that image.
- Preview initially served stale transformed hook code despite successful builds; after recovery it served the new integration and the complete simulation passed. Latest automatic build reports `build OK`.
- No Supabase writes or production deployment performed. Production archive resolution remains unverified until a separately approved deployment.

## Changed source files

- `src/data/archived-news/vaca-muerta-demanda-infraestructura-habitacional.json`: full original row.
- `src/data/archivedNews.ts`: explicit archive registry and existing row conversion.
- `src/data/newsSources.ts`: shared slug merge and unchanged publication sorting logic extracted from the hook.
- `src/hooks/useNews.ts`: live + archived list/detail fallback; admin reads unchanged.
- `scripts/generate-seo.ts`: archive-aware SEO sources and shared deterministic ordering.
- `scripts/newsSources.test.ts`: six focused regression tests.
- `src/data/archived-news/README.md`: removal gate, rollback and verification report.
- `AGENTS.md`, `roadmap.md`: architecture rules and completed task checklist.

The supervised preview's startup synchronization may refresh the existing generated snapshot/SEO files from read-only Supabase data; these are generated outputs, not database mutations.