## News identity and ordering
- Use article slugs for public list keys, latest-news badges, and related-item exclusion because code-only and database articles can share numeric IDs.
- Sort public news by publication date descending, with deterministic tie breakers, so the most recent article is first regardless of its source.

## Reversible news archives
- Store complete unmodified Supabase row JSON in `src/data/archived-news/` and explicitly register it in `archivedNews.ts`; this keeps archival copies versioned and independent from snapshot synchronization.
- Public runtime and SEO use `newsSources.ts` with first-slug-wins precedence: live data/build snapshot, published archives, existing bundled fallback; this preserves CMS edits until separately approved removal and prevents duplicate URLs.
- Admin news remains Supabase-only; archive registration never writes, deletes, or changes publication permissions, so pilot rollback is removing the registration while the original remains intact.