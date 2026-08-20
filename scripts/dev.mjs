#!/usr/bin/env node
/**
 * scripts/dev.mjs
 *
 * Combined dev command:
 *   1. syncs src/styles/global.css -> public/global.css once
 *   2. starts a CSS watcher in the background (auto-sync on edit)
 *   3. spawns `astro dev`, forwarding stdout/stderr and signals
 *
 * Replaces the simple "astro dev" with a single command that always
 * keeps public/global.css fresh. No more "I edited the CSS but the
 * browser still shows the old version" surprises.
 */
import { spawn } from 'node:child_process';
import { copyFileSync, watch } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'src/styles/global.css');
const DEST = resolve(ROOT, 'public/global.css');

function syncCss() {
  copyFileSync(SRC, DEST);
  console.log(`[dev] CSS synced at ${new Date().toLocaleTimeString()}`);
}

// 1. Initial sync
syncCss();

// 2. Watcher in background
let timer = null;
watch(SRC, { persistent: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(syncCss, 100);
});
console.log('[dev] watching src/styles/global.css');

// 3. Spawn astro dev
const astro = spawn('npx', ['astro', 'dev'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

// Forward signals
const forward = (sig) => () => {
  astro.kill(sig);
};
process.on('SIGINT', forward('SIGINT'));
process.on('SIGTERM', forward('SIGTERM'));

astro.on('exit', (code) => {
  process.exit(code ?? 0);
});
