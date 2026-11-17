import { test, expect } from '@playwright/test';
import { builtFiles, readBuilt } from './built-site';

// The CV PDF is the only place the phone number is allowed (by Diego's choice);
// every text asset the site serves must leave it out.
const TEXT_ASSET = /\.(html|js|mjs|css|json|xml|txt|svg|webmanifest)$/i;
const PHONE = /8138[\s.-]*2022/;

test('the phone number appears nowhere in the built site', () => {
  const files = builtFiles().filter((f) => TEXT_ASSET.test(f));
  expect(files.length).toBeGreaterThan(0);
  for (const file of files) {
    expect(readBuilt(file), file).not.toMatch(PHONE);
  }
});
