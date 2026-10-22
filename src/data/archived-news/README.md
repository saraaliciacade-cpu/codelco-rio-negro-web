# Reversible archive pilot

- Pilot: `vaca-muerta-demanda-infraestructura-habitacional` (Supabase ID 8), oldest published date: `2025-11-01`.
- JSON is the full original row, including all nulls, timestamps and unchanged body. No author is added: the original `author` is null.
- Original remains in Supabase. No writes, deletion, migration or production deployment are part of this pilot.
- Live rows take precedence; registered published archives fill missing slugs. Static lookup and SEO use the same archive registry. Existing presentation components and URLs are unchanged.
- The original image is project-owned `public/images/fabrica/fabrica-31.jpg`, not external. Preserve that file with the archive. External URLs in future archives must remain unchanged, but a successful check does not guarantee third-party permanence.

## Validation and rollback

Run `bun test src/data/newsSources.test.ts`. Preview checks must compare the normal page with a browser-only simulated response omitting ID 8, including body, metadata, image, list deduplication and another live article. The simulation must never modify Supabase.

Rollback: remove the pilot import/registration from `src/data/archivedNews.ts` (retain the JSON for audit). While the original remains published, live behavior is unchanged. Remove the integration files only if reverting the entire feature.

## Future removal gate — not performed

1. Re-read the complete original row and compare it deeply with the archived JSON; if the CMS changed, refresh the copy before proceeding.
2. Verify image availability, exact detail presentation, SEO outputs and missing-original preview again.
3. Obtain separate approval to deploy; deploy and confirm the actual public article and SEO are available from the archive.
4. Obtain explicit separate approval for any Supabase removal. Keep a complete backup; admin editing currently covers only Supabase records, not archived JSON.
5. After an approved removal, check the public URL, listings and SEO again following a fresh snapshot sync. Archive registration, not a stale snapshot or bundled copy, must supply the article.

To expand later, add complete validated row JSON files and explicit registry entries. No automatic deletions are implemented.