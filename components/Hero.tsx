import React, { useState, useEffect } from 'react';
import { Icons, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const blogLink = SOCIAL_LINKS.find(link => link.primary) || SOCIAL_LINKS[0];
  const githubLink = SOCIAL_LINKS.find(link => link.name === 'GitHub');
  const emailLink = SOCIAL_LINKS.find(link => link.name === 'Email');

  return (
    <section className={`relative pt-32 pb-16 px-6 lg:px-8 max-w-6xl mx-auto transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl">
        {/* Status Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-700/50 mb-8 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-xs font-medium text-stone-600 dark:text-stone-400">Open to opportunities</span>
        </div>

        {/* Main Headline */}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.1] mb-8 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          专注于软件质量保障的
          <span className="block mt-2">
            <span className="text-teal-600 dark:text-teal-400">测试工程师</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`text-lg sm:text-xl text-stone-600 dark:text-stone-400 leading-relaxed mb-12 max-w-2xl transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          热衷于用代码提升测试效率，让质量保障更简单、更可靠。
          <br className="hidden sm:block" />
          熟练使用 Python、Selenium、Docker 等工具构建自动化解决方案。
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-wrap items-center gap-3 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          <a
            href={blogLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-stone-900/90 dark:bg-stone-100/90 backdrop-blur-sm text-white dark:text-stone-900 rounded-xl font-medium transition-all duration-300 hover:bg-stone-900 dark:hover:bg-stone-100 hover:shadow-lg hover:shadow-stone-900/10 hover:-translate-y-0.5"
          >
            <Icons.Globe className="w-4 h-4 transition-transform group-hover:rotate-12" />
            访问博客
          </a>

          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-stone-900/60 backdrop-blur-md text-stone-900 dark:text-stone-100 rounded-xl font-medium border border-stone-200/60 dark:border-stone-700/50 transition-all duration-300 hover:bg-white/90 dark:hover:bg-stone-900/80 hover:border-stone-300/80 dark:hover:border-stone-600/80 hover:shadow-lg hover:shadow-stone-200/50 hover:-translate-y-0.5"
            >
              <Icons.Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              GitHub
            </a>
          )}

          {emailLink && (
            <a
              href={emailLink.url}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-stone-900/60 backdrop-blur-md text-stone-900 dark:text-stone-100 rounded-xl font-medium border border-stone-200/60 dark:border-stone-700/50 transition-all duration-300 hover:bg-white/90 dark:hover:bg-stone-900/80 hover:border-stone-300/80 dark:hover:border-stone-600/80 hover:shadow-lg hover:shadow-stone-200/50 hover:-translate-y-0.5"
            >
              <Icons.Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
              联系我
            </a>
          )}
        </div>

        {/* Quick Stats */}
        <div className={`mt-16 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              自动化测试
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              性能测试
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              持续集成
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              测试开发
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default React.memo(Hero);
