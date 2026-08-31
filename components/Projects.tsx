import React, { useEffect, useState } from 'react';
import { Icons, TECH_GROUPS } from '../constants';
import SectionHeading from './SectionHeading';
import { markMilestone } from '../lib/smoke';
import {
  BLOG_REQUEST_TIMEOUT_MS,
  fetchBlogPosts,
  readBlogCache,
  writeBlogCache,
} from '../lib/blog';
import type { BlogPost } from '../types';
import FeaturedProjects from './FeaturedProjects';

const getBlogStorage = (): Storage | null => {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const Projects: React.FC = () => {
  const [initialBlogState] = useState(() => {
    const storage = getBlogStorage();
    return { storage, cached: readBlogCache(storage) };
  });
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogState.cached?.posts ?? []);
  const [loading, setLoading] = useState(!initialBlogState.cached);
  const [error, setError] = useState(false);

  useEffect(() => {
    markMilestone('RENDER');
    let active = true;
    const { storage, cached } = initialBlogState;

    if (cached?.freshness === 'fresh') {
      markMilestone('RSS');
      return () => {
        active = false;
      };
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), BLOG_REQUEST_TIMEOUT_MS);

    const fetchPosts = async () => {
      try {
        const nextPosts = await fetchBlogPosts(controller.signal);
        if (!active) return;
        setPosts(nextPosts);
        setError(false);
        writeBlogCache(storage, nextPosts);
        markMilestone('RSS');
      } catch {
        if (!active) return;
        // 有陈旧缓存兜底时页面仍正常展示，自检不判失败
        if (cached) {
          markMilestone('RSS');
        } else {
          setError(true);
          markMilestone('RSS', 'fail');
        }
      } finally {
        window.clearTimeout(timeoutId);
        if (active) setLoading(false);
      }
    };

    void fetchPosts();
    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [initialBlogState]);

  return (
    <div className="content-shell">
      <section id="capabilities" className="capabilities-section" aria-labelledby="capabilities-title">
        <SectionHeading index="02" label="Capabilities" title="专业能力" titleId="capabilities-title" />

        <div className="capability-list">
          {TECH_GROUPS.map((group) => (
            <article key={group.title} className="capability-row">
              <span className="capability-symbol">{group.icon}</span>
              <div className="capability-body">
                <h3>{group.title}</h3>
                <p className="capability-desc">{group.desc}</p>
              </div>
              <div className="capability-skills" aria-label={`${group.title}技术栈`}>
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <FeaturedProjects />

      <section id="articles" className="articles-section" aria-labelledby="articles-title">
        <SectionHeading
          index="04"
          label="Recent posts"
          title="最近博客"
          titleId="articles-title"
          action={(
            <a className="text-link" href="https://xsfly.com" target="_blank" rel="noopener noreferrer">
              查看全部文章 <Icons.ArrowRight className="inline-icon" />
            </a>
          )}
        />

        <div className="article-list">
          <p className="sr-only" role="status">
            {loading
              ? '正在加载最新文章…'
              : error
                ? '最新文章暂时无法读取'
                : `已加载 ${posts.length} 篇最新文章`}
          </p>
          {loading && [1, 2, 3].map((item) => (
            <div key={item} className="article-row article-skeleton" aria-hidden="true">
              <span />
              <i />
            </div>
          ))}

          {!loading && (error || posts.length === 0) && (
            <div className="article-empty">
              <span>RSS / OFFLINE</span>
              <p>暂时无法读取最新文章，博客本身仍可正常访问。</p>
              <a className="button-secondary" href="https://xsfly.com" target="_blank" rel="noopener noreferrer">
                前往博客 <Icons.ArrowRight className="button-icon" />
              </a>
            </div>
          )}

          {!loading && !error && posts.map((post, index) => (
            <a
              key={post.link}
              className="article-row"
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="article-index">{String(index + 1).padStart(2, '0')}</span>
              <time dateTime={post.pubDate || undefined}>{post.dateLabel}</time>
              <div className="article-copy">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
              <span className="article-read-time">约 {post.readTimeMinutes} 分钟</span>
              <Icons.ArrowRight className="article-arrow" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default React.memo(Projects);
