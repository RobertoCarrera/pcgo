#!/usr/bin/env node
/**
 * scripts/sync-css.mjs
 *
 * One-shot copy of src/styles/global.css -> public/global.css.
 * Required because BaseLayout.astro references /global.css (which Astro
 * serves from public/ at build time), but the source of truth lives in
 * src/styles/global.css. Astro 5's Vite pipeline silently drops the
 * `import 'src/styles/global.css'` so we copy manually.
 *
 * Idempotent. Exits 0 on success, 1 if the source is missing.
 */
import { copyFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SRC = resolve(ROOT, 'src/styles/global.css');
const DEST = resolve(ROOT, 'public/global.css');

if (!existsSync(SRC)) {
  console.error(`[sync-css] source not found: ${SRC}`);
  process.exit(1);
}

const srcStat = statSync(SRC);
let needsCopy = true;
try {
  const destStat = statSync(DEST);
  if (destStat.mtimeMs >= srcStat.mtimeMs && destStat.size === srcStat.size) {
    needsCopy = false;
  }
} catch { /* dest doesn't exist yet */ }

if (needsCopy) {
  copyFileSync(SRC, DEST);
  console.log(`[sync-css] copied global.css (${srcStat.size} bytes) at ${new Date().toLocaleTimeString()}`);
} else {
  console.log('[sync-css] up to date.');
}
