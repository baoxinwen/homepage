import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TECH_GROUPS, TECH_DESCRIPTION, Icons } from '../constants';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

const Projects: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const RSS_URL = 'https://xsfly.com/rss.xml';
    const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Network error: ${response.status}`);
        const data = await response.json();

        if (data.status === 'ok' && Array.isArray(data.items)) {
          const processedPosts = data.items.map((item: any) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.description || '';
            const plainText = tempDiv.textContent || tempDiv.innerText || '';

            return {
              title: item.title,
              link: item.link,
              pubDate: item.pubDate,
              description: plainText.slice(0, 100) + (plainText.length > 100 ? '...' : ''),
            };
          });
          setPosts(processedPosts.slice(0, 3));
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getTagStyles = useCallback((color: string) => {
    const baseStyle = "bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400";

    const hoverStyles: Record<string, string> = {
      teal: "hover:bg-teal-100 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-300",
      emerald: "hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300",
      amber: "hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300",
      rose: "hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-700 dark:hover:text-rose-300",
    };

    return `${baseStyle} ${hoverStyles[color] || hoverStyles.teal}`;
  }, []);

  const calculateReadTime = useCallback((text: string): string => {
    const wordsPerMinute = 200;
    const words = text.length / 2;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }, []);

  const getArticleTags = useCallback((title: string): string[] => {
    const tags: string[] = [];
    if (title.includes('测试') || title.includes('Test')) tags.push('测试');
    if (title.includes('自动化') || title.includes('Auto')) tags.push('自动化');
    if (title.includes('Python') || title.includes('Selenium')) tags.push('Python');
    if (title.includes('Docker') || title.includes('Jenkins')) tags.push('DevOps');
    if (tags.length === 0) tags.push('技术');
    return tags.slice(0, 2);
  }, []);

  const shimmerClass = useMemo(() => "bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-white/5 dark:via-white/10 dark:to-white/5 bg-[length:200%_100%] animate-shimmer rounded", []);

  return (
    <div className="flex flex-col gap-16 pb-20 px-6 lg:px-8 max-w-6xl mx-auto">

      {/* SECTION 1: TECH STACK */}
      <section className="pt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            专业技能
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-2xl">
            {TECH_DESCRIPTION}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TECH_GROUPS.map((group) => (
            <div
              key={group.title}
              className="group relative bg-white/70 dark:bg-stone-900/60 backdrop-blur-md p-5 rounded-2xl border border-stone-200/60 dark:border-stone-700/50 hover:border-teal-400/50 dark:hover:border-teal-500/40 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1"
            >
              {/* Glassmorphism shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>

              {/* Subtle background glow on hover */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-teal-500/8 to-emerald-500/6 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-lg bg-white/80 dark:bg-white/10 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {group.icon}
                  </div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 ${getTagStyles(group.color || 'teal')}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: LATEST ARTICLES */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            最新文章
          </h2>
          <a
             href="https://xsfly.com"
             target="_blank"
             rel="noopener noreferrer"
             className="text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
          >
            查看全部
            <Icons.ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/50 dark:bg-stone-900/40 backdrop-blur-sm rounded-xl p-5 h-56 border border-stone-200/40 dark:border-stone-800/30">
                <div className={`h-4 w-16 mb-4 ${shimmerClass}`}></div>
                <div className={`h-5 w-3/4 mb-2 ${shimmerClass}`}></div>
                <div className={`h-5 w-1/2 mb-6 ${shimmerClass}`}></div>
                <div className="space-y-2">
                  <div className={`h-3 w-full ${shimmerClass}`}></div>
                  <div className={`h-3 w-5/6 ${shimmerClass}`}></div>
                </div>
              </div>
            ))}
          </div>
        ) : error || posts.length === 0 ? (
          <div className="bg-white/50 dark:bg-stone-900/40 backdrop-blur-sm rounded-xl p-12 text-center border border-stone-200/40 dark:border-stone-800/30">
            <p className="text-stone-500 dark:text-stone-400 mb-4">暂时无法获取文章，请直接访问博客。</p>
            <a href="https://xsfly.com" target="_blank" className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline">
              <Icons.Globe className="w-4 h-4" />
              前往 xsfly.com
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => {
              const tags = getArticleTags(post.title);
              return (
                <a
                  key={post.link}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white/70 dark:bg-stone-900/60 backdrop-blur-md rounded-xl p-5 border border-stone-200/60 dark:border-stone-700/50 hover:border-teal-400/40 dark:hover:border-teal-500/30 transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Glassmorphism shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50/80 dark:bg-teal-900/30 backdrop-blur-sm px-2 py-0.5 rounded">
                        ARTICLE
                      </span>
                      <span className="text-[10px] font-medium text-stone-400 dark:text-stone-500">
                        {new Date(post.pubDate).toLocaleDateString('zh-CN')}
                      </span>
                    </div>

                    <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-3 mb-4 flex-1">
                      {post.description}
                    </p>

                    <div className="pt-3 border-t border-stone-200/50 dark:border-stone-700/50 flex items-center justify-between text-xs">
                      <span className="text-stone-400 dark:text-stone-500">
                        {calculateReadTime(post.description)}
                      </span>
                      <span className="font-medium text-stone-500 dark:text-stone-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors flex items-center gap-1 group-hover:gap-2">
                        阅读
                        <Icons.ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default React.memo(Projects);
