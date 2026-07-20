import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { Icons, SOCIAL_LINKS } from './constants';
import {
  applyTheme,
  getBrowserStorage,
  readStoredTheme,
  resolveTheme,
  writeStoredTheme,
  type Theme,
} from './lib/theme';

const NAV_ITEMS = [
  { label: '关于我', href: '#about', secondary: true },
  { label: '专业能力', href: '#capabilities', secondary: true },
  { label: '开源项目', href: '#projects', secondary: false },
  { label: '最近博客', href: '#articles', secondary: false },
];

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

  useEffect(() => {
    if (hasExplicitTheme) return undefined;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [hasExplicitTheme]);

  const toggleTheme = () => {
    const nextTheme: Theme = isDark ? 'light' : 'dark';
    setHasExplicitTheme(true);
    writeStoredTheme(getBrowserStorage(), nextTheme);
    setTheme(nextTheme);
  };

  const blogLink = SOCIAL_LINKS.find((link) => link.primary);
  const githubLink = SOCIAL_LINKS.find((link) => link.name === 'GitHub');

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#about" aria-label="返回个人介绍">
            <span className="brand-mark" aria-hidden="true">
              <span>BXW</span>
              <i />
            </span>
            <span className="brand-name">浮生闲记</span>
          </a>

          <nav className="primary-nav" aria-label="页面导航">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={item.secondary ? 'nav-link nav-link--secondary' : 'nav-link'}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            {blogLink && (
              <a className="nav-external" href={blogLink.url} target="_blank" rel="noopener noreferrer">
                博客
              </a>
            )}
            {githubLink && (
              <a
                className="nav-icon-button"
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="访问 GitHub"
              >
                <Icons.Github className="nav-icon" />
              </a>
            )}
            <button
              type="button"
              className="nav-icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? '切换至浅色主题' : '切换至深色主题'}
              aria-pressed={isDark}
            >
              {isDark ? <Icons.Sun className="nav-icon" /> : <Icons.Moon className="nav-icon" />}
            </button>
          </div>
        </div>
      </header>

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
