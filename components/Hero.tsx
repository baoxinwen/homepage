import React from 'react';
import { Icons, SOCIAL_LINKS } from '../constants';
import SmokeTest from './SmokeTest';
import TerminalIntro from './TerminalIntro';

const Hero: React.FC = () => {
  const githubLink = SOCIAL_LINKS.find((link) => link.name === 'GitHub');
  const emailLink = SOCIAL_LINKS.find((link) => link.name === 'Email');

  return (
    <section id="about" className="hero-section" aria-labelledby="hero-title">
      {/* 标题通栏：长句需要整个页面宽度才撑得起字号 */}
      <div className="hero-columns">
        <div className="hero-copy">
          <div className="section-kicker reveal reveal-delay-1">
            <span>01</span>
            <i />
            <span>ABOUT ME</span>
          </div>

          {/* 四短行阶梯断句：半栏内保住大字号 */}
          <h1 id="hero-title" className="hero-title reveal reveal-delay-2">
            <span>在复杂的系统里</span>
            <span>测试可靠性，</span>
            <span>在真实的生活中</span>
            <span>
              记录<span className="hero-accent">浮生闲趣</span>。
            </span>
          </h1>

          {/* 一句话定位：让不了解的访客 3 秒内明白「做什么、这里有什么」 */}
          <p className="hero-intro reveal reveal-delay-3">
            测试工程师，为复杂系统守护可靠性；独立开发者，把日常灵感做成开源小工具。这里记录两者的交集——技术与闲趣。
          </p>

          <div className="hero-actions reveal reveal-delay-4">
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

          <div className="reveal reveal-delay-4">
            <SmokeTest />
          </div>
        </div>

        <div className="hero-terminal reveal reveal-delay-3">
          <TerminalIntro />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
