import React, { useCallback, useEffect, useState } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SiteHeader from './components/SiteHeader';
import { SOCIAL_LINKS } from './constants';
import { markMilestone } from './lib/smoke';
import {
  applyTheme,
  getBrowserStorage,
  readStoredTheme,
  resolveTheme,
  writeStoredTheme,
  type Theme,
} from './lib/theme';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return resolveTheme(
    readStoredTheme(getBrowserStorage()),
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [hasExplicitTheme, setHasExplicitTheme] = useState(
    () => readStoredTheme(getBrowserStorage()) !== null,
  );
  const isDark = theme === 'dark';

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // 首帧后启用主题颜色过渡，避免加载时的闪变；同时上报 THEME 里程碑
  useEffect(() => {
    markMilestone('THEME');
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-ready');
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (hasExplicitTheme) return undefined;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [hasExplicitTheme]);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    setHasExplicitTheme(true);
    writeStoredTheme(getBrowserStorage(), nextTheme);
    setTheme(nextTheme);
  }, [isDark]);

  return (
    <div className="site-shell">
      <SiteHeader isDark={isDark} onToggleTheme={toggleTheme} />

      <main>
        <Hero />
        <Projects />
      </main>

      <footer className="site-footer">
        <div className="footer-shell">
          <div>
            <p className="footer-brand">浮生闲记</p>
          </div>

          <div className="footer-links" aria-label="联系方式">
            {SOCIAL_LINKS.map((link) => {
              const isExternal = link.url.startsWith('http');
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <p className="footer-copyright">© {new Date().getFullYear()} BAOXINWEN</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
