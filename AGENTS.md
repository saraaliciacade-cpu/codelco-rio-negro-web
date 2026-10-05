## News identity and ordering
- Use article slugs for public list keys, latest-news badges, and related-item exclusion because code-only and database articles can share numeric IDs.
- Sort public news by publication date descending, with deterministic tie breakers, so the most recent article is first regardless of its source.