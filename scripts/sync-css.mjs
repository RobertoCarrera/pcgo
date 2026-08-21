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
 * Sync safety:
 *   - If public/global.css was manually edited since the last sync, the
 *     script ABORTS by default. This protects your hand-tweaks.
 *   - Pass --force to overwrite anyway.
 *   - The hash of the last successfully-synced content is stored in
 *     .sync-css-hash (gitignored). If public/global.css matches that hash,
 *     it's safe to overwrite.
 *
 * Exit codes:
 *   0 = ok (no-op or successful copy)
 *   1 = source missing OR manual edit detected without --force
 */
import {
  copyFileSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SRC = resolve(ROOT, 'src/styles/global.css');
const DEST = resolve(ROOT, 'public/global.css');
const STATE = resolve(ROOT, '.sync-css-hash');

const force = process.argv.includes('--force');

if (!existsSync(SRC)) {
  console.error(`[sync-css] source not found: ${SRC}`);
  process.exit(1);
}

const src = readFileSync(SRC, 'utf8');
const srcHash = createHash('sha256').update(src).digest('hex');
const srcBytes = Buffer.byteLength(src, 'utf8');

if (existsSync(DEST)) {
  const dest = readFileSync(DEST, 'utf8');
  const destHash = createHash('sha256').update(dest).digest('hex');

  // Already in sync
  if (destHash === srcHash) {
    writeFileSync(STATE, srcHash);
    console.log('[sync-css] up to date.');
    process.exit(0);
  }

  // Files differ. Detect manual edits via the state file.
  if (existsSync(STATE)) {
    const lastHash = readFileSync(STATE, 'utf8').trim();
    if (lastHash !== destHash) {
      // public/ has been touched since the last successful sync
      if (!force) {
        console.error(
          '\n[sync-css] ABORT: public/global.css has manual edits since the last sync.',
        );
        console.error(
          '         Either: (a) re-apply your edits to src/styles/global.css and re-run,',
        );
        console.error(
          '                 (b) pass --force to overwrite your public/ edits,',
        );
        console.error(
          '                 (c) git checkout -- public/global.css to discard them.\n',
        );
        process.exit(1);
      }
      console.log(
        '[sync-css] manual edit detected in public/global.css; --force given, overwriting.',
      );
    }
  } else {
    // Legacy project (no state file yet). First run of the new safe mode.
    // If public and src differ and we have no record of a prior sync, the
    // safe choice is to assume the user might have edited public/ — so
    // require --force.
    if (!force) {
      console.error(
        '\n[sync-css] First run of safe mode: no .sync-css-hash state found.',
      );
      console.error(
        '         If public/global.css is in sync with your intent, pass --force once',
      );
      console.error(
        '         to seed the state. Otherwise apply your edits to src/styles/global.css.\n',
      );
      process.exit(1);
    }
    console.log('[sync-css] first safe-mode run; --force given, seeding state.');
  }
}

copyFileSync(SRC, DEST);
writeFileSync(STATE, srcHash);
console.log(
  `[sync-css] copied global.css (${srcBytes} bytes) at ${new Date().toLocaleTimeString()}`,
);
