export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

type ThemeStorage = Pick<Storage, 'getItem' | 'setItem'>;

export const getBrowserStorage = (): ThemeStorage | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const readStoredTheme = (storage: Pick<ThemeStorage, 'getItem'> | null): Theme | null => {
  if (!storage) return null;
  try {
    const value = storage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

export const writeStoredTheme = (
  storage: Pick<ThemeStorage, 'setItem'> | null,
  theme: Theme,
): boolean => {
  if (!storage) return false;
  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
};

export const resolveTheme = (storedTheme: Theme | null, prefersDark: boolean): Theme => (
  storedTheme ?? (prefersDark ? 'dark' : 'light')
);

export const applyTheme = (theme: Theme, targetDocument: Document = document): void => {
  const isDark = theme === 'dark';
  targetDocument.documentElement.classList.toggle('dark', isDark);
  targetDocument
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? '#171611' : '#F3F0E8');
};
