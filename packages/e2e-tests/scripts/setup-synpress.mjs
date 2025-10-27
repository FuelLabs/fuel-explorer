#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MM_VERSION = process.env.METAMASK_VERSION || '11.9.1';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cacheRoots = [
  path.join(process.cwd(), 'node_modules', '.cache', 'synpress'),
  path.join(os.homedir(), '.cache', 'synpress'),
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function candidatePaths() {
  return cacheRoots.map((root) =>
    path.join(root, 'chrome-extension', 'metamask', MM_VERSION),
  );
}

async function main() {
  const existing = candidatePaths().find((p) => fs.existsSync(p));
  if (existing) {
    console.log('[setup:synpress] Using cached MetaMask at', existing);
    // Emit GITHUB_ENV assignment if running in GitHub Actions
    if (process.env.GITHUB_ENV) {
      fs.appendFileSync(
        process.env.GITHUB_ENV,
        `\nSYNPRESS_METAMASK_PATH=${existing}\n`,
      );
    } else {
      process.env.SYNPRESS_METAMASK_PATH = existing;
    }
    return;
  }

  const projectCache = path.join(
    __dirname,
    '..',
    '..',
    'cache',
    'metamask',
    MM_VERSION,
  );
  if (fs.existsSync(projectCache)) {
    const target = candidatePaths()[0];
    ensureDir(path.dirname(target));
    fs.cpSync(projectCache, target, { recursive: true });
    console.log(
      '[setup:synpress] Copied MetaMask from project cache to',
      target,
    );
    if (process.env.GITHUB_ENV) {
      fs.appendFileSync(
        process.env.GITHUB_ENV,
        `\nSYNPRESS_METAMASK_PATH=${target}\n`,
      );
    } else {
      process.env.SYNPRESS_METAMASK_PATH = target;
    }
    return;
  }

  // Attempt to download MetaMask release from GitHub (follow redirects)
  const url = `https://github.com/MetaMask/metamask-extension/releases/download/v${MM_VERSION}/metamask-chrome-${MM_VERSION}.zip`;
  const tmpZip = path.join(os.tmpdir(), `metamask-${MM_VERSION}.zip`);
  console.log('[setup:synpress] Downloading MetaMask from', url);
  const downloadWithRedirects = (downloadUrl, destination, maxRedirects = 5) =>
    new Promise((resolve, reject) => {
      if (maxRedirects < 0) return reject(new Error('Too many redirects'));
      const client = downloadUrl.startsWith('https:') ? https : http;
      const req = client.get(
        downloadUrl,
        { headers: { 'User-Agent': 'Mozilla/5.0' } },
        (res) => {
          if (
            res.statusCode &&
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            const next = new URL(res.headers.location, downloadUrl).toString();
            res.resume();
            downloadWithRedirects(next, destination, maxRedirects - 1)
              .then(resolve)
              .catch(reject);
            return;
          }
          if (res.statusCode !== 200) {
            reject(
              new Error(`Failed to download MetaMask: HTTP ${res.statusCode}`),
            );
            return;
          }
          const file = fs.createWriteStream(destination);
          res.pipe(file);
          file.on('finish', () => file.close(resolve));
          file.on('error', (err) => {
            try {
              file.close();
            } catch {}
            reject(err);
          });
        },
      );
      req.on('error', reject);
    });

  await downloadWithRedirects(url, tmpZip).catch((e) => {
    console.warn('[setup:synpress] Download failed:', e.message);
  });

  if (fs.existsSync(tmpZip)) {
    const target = candidatePaths()[0];
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mm-unzip-'));
    ensureDir(tmpDir);
    console.log('[setup:synpress] Unzipping MetaMask to', tmpDir);
    const unzip = spawnSync('unzip', ['-o', '-q', tmpZip, '-d', tmpDir], {
      stdio: 'inherit',
    });
    if (unzip.status !== 0) {
      console.warn('[setup:synpress] unzip failed with code', unzip.status);
    }
    fs.rmSync(tmpZip, { force: true });
    // Find directory containing manifest.json
    function findManifestDir(root) {
      const entries = fs.readdirSync(root, { withFileTypes: true });
      // Direct hit
      if (entries.find((e) => e.isFile && e.name === 'manifest.json'))
        return root;
      for (const e of entries) {
        if (e.isDirectory()) {
          const p = path.join(root, e.name);
          try {
            const found = findManifestDir(p);
            if (found) return found;
          } catch {}
        }
      }
      return null;
    }
    const manifestDir = findManifestDir(tmpDir);
    if (manifestDir) {
      ensureDir(path.dirname(target));
      if (fs.existsSync(target))
        fs.rmSync(target, { recursive: true, force: true });
      fs.cpSync(manifestDir, target, { recursive: true });
      fs.rmSync(tmpDir, { recursive: true, force: true });
      if (process.env.GITHUB_ENV) {
        fs.appendFileSync(
          process.env.GITHUB_ENV,
          `\nSYNPRESS_METAMASK_PATH=${target}\n`,
        );
      } else {
        process.env.SYNPRESS_METAMASK_PATH = target;
      }
      console.log('[setup:synpress] MetaMask ready at', target);
      return;
    }
    // Cleanup temp directory if manifest not found
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  console.warn(
    '[setup:synpress] MetaMask not cached and download failed. Provide SYNPRESS_METAMASK_PATH or pre-cache MetaMask.',
  );
}

main().catch((e) => {
  console.error('[setup:synpress] failed', e);
  process.exit(1);
});
