import { useEffect, useState } from 'react';
import { Moon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { THEME_STORAGE_KEY, type Theme } from './theme-storage';

const systemDark = () => matchMedia('(prefers-color-scheme: dark)');

/** The theme on screen: the explicit choice if there is one, else the system's. */
function showing(): Theme {
  const pinned = document.documentElement.dataset.theme;
  if (pinned === 'light' || pinned === 'dark') return pinned;
  return systemDark().matches ? 'dark' : 'light';
}

/**
 * A two-state toggle: pressed means the dark theme is showing. Pressing it pins
 * the opposite of what is showing now and remembers it. It stays hidden until it
 * hydrates, so it can never be pressed before it works; without JavaScript the
 * theme simply follows the system. ThemeInit applies the saved choice before
 * first paint.
 */
export default function ThemeToggle({ label }: { label: string }) {
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => setDark(showing() === 'dark');
    const media = systemDark();
    media.addEventListener('change', sync);
    sync();
    setReady(true);
    return () => media.removeEventListener('change', sync);
  }, []);

  const choose = (wantDark: boolean) => {
    const next: Theme = wantDark ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice lasts for this page view only.
    }
    setDark(wantDark);
  };

  return (
    <Toggle variant="outline" size="sm" pressed={dark} onPressedChange={choose} hidden={!ready}>
      <Moon aria-hidden="true" />
      {label}
    </Toggle>
  );
}
