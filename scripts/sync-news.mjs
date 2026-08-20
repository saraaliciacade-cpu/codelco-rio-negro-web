#!/usr/bin/env node
// Pulls the published rows of the Supabase `news` table into
// src/data/news.remote.json so the sitemap, RSS and SSG prerender can see
// articles created from the /user panel.
//
// Never fails the build: on any error it logs a warning and leaves the
// existing snapshot untouched (creating it with `[]` when missing).

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outPath = resolve(root, 'src/data/news.remote.json');

const NEWS_COLUMNS =
  'id,slug,title,seo_title,category,date_label,date_iso,summary,meta_description,image,image_position,body,cta_question,source_url,source_label,status,created_at,updated_at';

function warn(message) {
  console.warn(`[sync-news] ${message} — se mantiene el snapshot actual.`);
}

async function ensureFile() {
  if (!existsSync(outPath)) {
    await writeFile(outPath, '[]\n', 'utf8');
  }
}

async function readEnv() {
  const env = { ...process.env };
  try {
    const raw = await readFile(resolve(root, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const key = m[1];
      let value = m[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!env[key]) env[key] = value;
    }
  } catch {
    // .env is optional; env vars may already be present.
  }
  return env;
}

async function main() {
  await ensureFile();

  const env = await readEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    warn('faltan VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY');
    return;
  }

  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/news?select=${NEWS_COLUMNS}&status=eq.published`;

  let res;
  try {
    res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
  } catch (err) {
    warn(`no se pudo conectar a Supabase (${err?.message ?? err})`);
    return;
  }

  if (!res.ok) {
    warn(`Supabase respondió ${res.status} ${res.statusText}`);
    return;
  }

  let rows;
  try {
    rows = await res.json();
  } catch (err) {
    warn(`JSON inválido (${err?.message ?? err})`);
    return;
  }

  if (!Array.isArray(rows)) {
    warn('la respuesta no es un array');
    return;
  }

  const published = rows.filter((r) => r && r.slug && r.status !== 'draft');
  await writeFile(outPath, `${JSON.stringify(published, null, 2)}\n`, 'utf8');
  console.log(`[sync-news] news.remote.json actualizado (${published.length} noticias publicadas)`);
}

main().catch(async (err) => {
  warn(`error inesperado (${err?.message ?? err})`);
  try {
    await ensureFile();
  } catch {
    // ignore
  }
  process.exit(0);
});
