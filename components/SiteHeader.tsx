import React, { useEffect, useState } from 'react';
import { Icons, SOCIAL_LINKS } from '../constants';

const NAV_ITEMS = [
  { label: '关于我', href: '#about', secondary: true },
  { label: '专业能力', href: '#capabilities', secondary: true },
  { label: '开源项目', href: '#projects', secondary: false },
  { label: '最近博客', href: '#articles', secondary: false },
];

interface SiteHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ isDark, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const blogLink = SOCIAL_LINKS.find((link) => link.primary);
  const githubLink = SOCIAL_LINKS.find((link) => link.name === 'GitHub');

  // 菜单展开时允许 Esc 关闭，与「点击链接即收起」形成一致的退出路径
  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // 视口跨过移动断点后复位展开态：按钮与面板都已随 CSS 隐藏，留着只会造成隐形的 aria-expanded
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (!event.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', handleBreakpoint);
    return () => mq.removeEventListener('change', handleBreakpoint);
  }, []);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#about" aria-label="返回个人介绍">
          <span className="brand-mark" aria-hidden="true">浮</span>
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
            onClick={onToggleTheme}
            aria-label="切换配色主题"
            aria-pressed={isDark}
          >
            {isDark ? <Icons.Sun className="nav-icon" /> : <Icons.Moon className="nav-icon" />}
          </button>
          <button
            type="button"
            className="nav-icon-button nav-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
          >
            {menuOpen ? <Icons.Close className="nav-icon" /> : <Icons.Menu className="nav-icon" />}
          </button>
        </div>
      </div>

      {/* 移动端导航面板：小屏收纳被隐藏的锚点与外链，点击任意项即收起 */}
      <nav
        id="mobile-nav-panel"
        className="mobile-nav"
        data-open={menuOpen}
        aria-label="全站导航"
      >
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={item.secondary ? 'mobile-nav-link mobile-nav-link--secondary' : 'mobile-nav-link'}
            onClick={() => setMenuOpen(false)}
          >
            <span>{item.label}</span>
            <i aria-hidden="true">{String(index + 1).padStart(2, '0')}</i>
          </a>
        ))}
        {blogLink && (
          <a
            className="mobile-nav-link"
            href={blogLink.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <span>博客</span>
            <i aria-hidden="true">↗</i>
          </a>
        )}
      </nav>
    </header>
  );
};

export default React.memo(SiteHeader);
