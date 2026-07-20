import { beforeEach, describe, expect, it } from 'vitest';
import {
  applyTheme,
  readStoredTheme,
  resolveTheme,
  writeStoredTheme,
} from './theme';

describe('theme preferences', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    document.head.innerHTML = '<meta name="theme-color" content="#F3F0E8">';
  });

  it('prefers an explicit valid choice over the system theme', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme(null, true)).toBe('dark');
  });

  it('ignores invalid values and survives blocked storage', () => {
    expect(readStoredTheme({ getItem: () => 'sepia' })).toBeNull();
    expect(readStoredTheme({ getItem: () => { throw new Error('blocked'); } })).toBeNull();
    expect(writeStoredTheme({ setItem: () => { throw new Error('blocked'); } }, 'dark')).toBe(false);
  });

  it('persists valid choices and applies document state', () => {
    let stored = '';
    expect(writeStoredTheme({ setItem: (_key, value) => { stored = value; } }, 'dark')).toBe(true);
    expect(stored).toBe('dark');

    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#171611');

    applyTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
