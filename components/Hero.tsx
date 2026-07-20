import React from 'react';
import { Icons, SOCIAL_LINKS } from '../constants';

const PROFILE_DIRECTORY = [
  { code: 'ABOUT', label: '关于我', href: '#about' },
  { code: 'CAP', label: '专业能力', href: '#capabilities' },
  { code: 'WORK', label: '开源项目', href: '#projects' },
  { code: 'NOTE', label: '最近博客', href: '#articles' },
];

const Hero: React.FC = () => {
  const githubLink = SOCIAL_LINKS.find((link) => link.name === 'GitHub');
  const emailLink = SOCIAL_LINKS.find((link) => link.name === 'Email');
  const blogLink = SOCIAL_LINKS.find((link) => link.primary);

  return (
    <section id="about" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="section-kicker reveal reveal-delay-1">
            <span>01</span>
            <i />
            <span>ABOUT ME</span>
          </div>

          <h1 id="hero-title" className="hero-title reveal reveal-delay-2">
            <span>把复杂系统，</span>
            <span>测得更可靠。</span>
            <span className="hero-title-accent">也把真实问题，</span>
            <span className="hero-title-accent">做成好用的工具。</span>
          </h1>

          <p className="hero-intro reveal reveal-delay-3">
            你好，我是浮生闲记，一名测试工程师与独立开发者。这里集中展示我的专业能力、开源项目和技术文章。
          </p>

          <ul className="role-list reveal reveal-delay-4" aria-label="职业方向">
            <li>测试工程师</li>
            <li>独立开发</li>
            <li>技术记录</li>
          </ul>

          <div className="hero-actions reveal reveal-delay-5">
            <a className="button-primary" href="#projects">
              查看项目
              <Icons.ArrowRight className="button-icon" />
            </a>
            {githubLink && (
              <a className="button-secondary" href={githubLink.url} target="_blank" rel="noopener noreferrer">
                <Icons.Github className="button-icon" />
                GitHub
              </a>
            )}
            {emailLink && (
              <a className="button-text" href={emailLink.url}>
                联系我
              </a>
            )}
          </div>
        </div>

        <aside className="profile-wrap reveal reveal-delay-profile" aria-label="个人名片与页面导览">
          <div className="profile-grid-bg engineering-grid" aria-hidden="true" />
          <div className="field-card profile-card">
            <div className="profile-header">
              <div>
                <p className="profile-overline">BAOXINWEN / PERSONAL CARD</p>
                <p className="profile-role">浮生闲记</p>
                <p className="profile-subtitle">测试工程师与独立开发者</p>
              </div>
              <span className="availability"><i /> OPEN</span>
            </div>

            <nav className="profile-directory" aria-label="页面内容导览">
              {PROFILE_DIRECTORY.map((item, index) => (
                <a key={item.code} className="profile-directory-link" href={item.href}>
                  <span>{String(index + 1).padStart(2, '0')} / {item.code}</span>
                  <strong>{item.label}</strong>
                  <Icons.ArrowRight className="profile-directory-arrow" />
                </a>
              ))}
            </nav>

            <div className="profile-connect">
              <span>CONNECT</span>
              <div className="profile-connect-links">
                {blogLink && <a href={blogLink.url} target="_blank" rel="noopener noreferrer">BLOG</a>}
                {githubLink && <a href={githubLink.url} target="_blank" rel="noopener noreferrer">GITHUB</a>}
                {emailLink && <a href={emailLink.url}>EMAIL</a>}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default React.memo(Hero);
