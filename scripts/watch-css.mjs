#!/usr/bin/env node
/**
 * scripts/watch-css.mjs
 *
 * Watches src/styles/global.css and re-copies to public/global.css on
 * every change. Run in a separate terminal while developing:
 *
 *   # terminal 1
 *   npm run watch:css
 *
 *   # terminal 2
 *   npm run dev
 *
 * Debounced to avoid rapid-fire copies on save-bursts.
 */
import { copyFileSync, statSync, watch } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src/styles/global.css');
const DEST = resolve(ROOT, 'public/global.css');

// Initial copy
copyFileSync(SRC, DEST);
const s = statSync(SRC);
console.log(`[watch-css] initial copy: ${s.size} bytes at ${new Date().toLocaleTimeString()}`);
console.log('[watch-css] watching src/styles/global.css — Ctrl+C to stop');

let timer = null;
const debounceMs = 100;

watch(SRC, { persistent: true }, (eventType) => {
  if (eventType === 'change' || eventType === 'rename') {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        copyFileSync(SRC, DEST);
        const s2 = statSync(SRC);
        console.log(`[watch-css] synced (${s2.size} bytes) at ${new Date().toLocaleTimeString()}`);
      } catch (err) {
        console.error(`[watch-css] copy failed: ${err.message}`);
      }
    }, debounceMs);
  }
});
