import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = join(process.cwd(), 'dist');

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** Every file in the production build, as absolute paths. */
export function builtFiles(): string[] {
  return walk(DIST);
}

/** Every page route in the production build, e.g. "/", "/pt/", "/projects/x/". */
export function builtRoutes(): string[] {
  return builtFiles()
    .filter((f) => f.endsWith('index.html'))
    .map((f) => {
      const rel = relative(DIST, f).split(sep).slice(0, -1).join('/');
      return rel ? `/${rel}/` : '/';
    })
    .filter((r) => r !== '/404/');
}

export function readBuilt(file: string): string {
  return readFileSync(file, 'utf8');
}
