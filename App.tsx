import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import { Icons, SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check local storage or system preference on load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Scroll listener with throttle for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

          setScrollProgress((currentScroll / totalHeight) * 100);
          setIsScrolled(currentScroll > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100 transition-colors duration-700 pb-20 relative overflow-x-hidden font-sans selection:bg-teal-500/30 selection:text-teal-900 dark:selection:text-teal-100">

      {/* 1. Enhanced Scroll Progress Bar with glow effect */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6),0_0_24px_rgba(16,185,129,0.4)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Enhanced Fixed Background Layers */}
      {/* Base Background Color with subtle gradient */}
      <div className="fixed inset-0 -z-50 bg-stone-50 dark:bg-stone-950 transition-colors duration-700" />

      {/* Enhanced Ambient Elements Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-40">
        <div className="bg-dot-pattern absolute inset-0 opacity-[0.25] dark:opacity-[0.04]" />
        {/* Single subtle gradient orb */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-teal-500/4 to-emerald-500/3 dark:from-teal-600/4 dark:to-emerald-600/3 blur-[120px] rounded-full"></div>
      </div>

      {/* Enhanced Navigation - Full Width */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-white/70 dark:bg-stone-950/70 backdrop-blur-xl border-stone-200/50 dark:border-stone-800/50 shadow-lg shadow-stone-200/50 dark:shadow-black/20'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 dark:from-teal-400 dark:to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <span className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100 hidden sm:block">
                浮生闲记
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center bg-white/60 dark:bg-white/5 p-1.5 rounded-xl border border-stone-200/60 dark:border-stone-700/50 backdrop-blur-md shadow-sm">
                <a
                  href="https://xsfly.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-teal-600 dark:hover:text-stone-100 transition-all rounded-lg hover:bg-white/80 dark:hover:bg-white/10"
                >
                  博客
                </a>
                <a
                  href="https://github.com/baoxinwen"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-teal-600 dark:hover:text-stone-100 transition-all rounded-lg hover:bg-white/80 dark:hover:bg-white/10"
                >
                  GitHub
                </a>
              </div>

              <button
                onClick={toggleTheme}
                className="group relative p-2.5 rounded-xl bg-white/80 dark:bg-white/10 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/50 backdrop-blur-md hover:bg-white dark:hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-sm"
                aria-label="Toggle Dark Mode"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-emerald-500/0 group-hover:from-teal-500/10 group-hover:to-emerald-500/10 rounded-xl transition-all duration-300"></div>
                {isDark ? <Icons.Sun className="w-4 h-4 relative z-10 transition-transform group-hover:rotate-45" /> : <Icons.Moon className="w-4 h-4 relative z-10 transition-transform group-hover:-rotate-12" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-24 z-10">
        <Hero />
        <Projects />

        {/* Enhanced Footer */}
        <footer className="mt-32 py-20 text-center border-t border-stone-200/50 dark:border-white/5 bg-gradient-to-b from-stone-50/50 to-transparent dark:from-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            {/* Enhanced Social Links Footer */}
            <div className="flex items-center gap-8 mb-10">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative text-stone-400 dark:text-stone-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all hover:scale-110"
                  title={link.description}
                >
                  <div className="absolute inset-0 bg-teal-500/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="relative w-6 h-6 block">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>

            <p className="text-stone-400 dark:text-stone-500 text-sm font-medium tracking-wide mb-2">
              © {new Date().getFullYear()} <span className="text-stone-900 dark:text-stone-100 font-bold">浮生闲记</span>
            </p>
            <p className="text-stone-400 dark:text-stone-500 text-xs opacity-60">
              让每一次交付都值得信赖
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
