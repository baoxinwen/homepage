import React, { useEffect, useState } from 'react';
import { Icons, TECH_GROUPS } from '../constants';
import {
  BLOG_REQUEST_TIMEOUT_MS,
  fetchBlogPosts,
  readBlogCache,
  writeBlogCache,
} from '../lib/blog';
import type { BlogPost } from '../types';
import FeaturedProjects from './FeaturedProjects';

const SectionHeading: React.FC<{
  index: string;
  label: string;
  title: string;
  titleId?: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ index, label, title, titleId, description, action }) => (
  <div className="section-heading">
    <div>
      <div className="section-kicker">
        <span>{index}</span>
        <i />
        <span>{label}</span>
      </div>
      <h2 id={titleId}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
    {action && <div className="section-action">{action}</div>}
  </div>
);

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
    let active = true;
    const { storage, cached } = initialBlogState;

    if (cached?.freshness === 'fresh') {
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
      } catch {
        if (active && !cached) setError(true);
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
        <SectionHeading
          index="02"
          label="Capabilities"
          title="专业能力"
          titleId="capabilities-title"
        />

        <div className="capability-matrix">
          <div className="capability-intro">
            <span className="matrix-code">TESTING / TOOLING</span>
            <strong>既验证单项功能，<br />也承担版本发布前的集中测试。</strong>
          </div>

          <div className="capability-grid">
            {TECH_GROUPS.map((group, index) => (
              <article key={group.title} className="capability-item">
                <div className="capability-item-head">
                  <span className="capability-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="capability-symbol">{group.icon}</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="capability-skills" aria-label={`${group.title}技术栈`}>
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjects />

      <section id="articles" className="articles-section" aria-labelledby="articles-title">
        <SectionHeading
          index="04"
          label="Recent posts"
          title="最近博客"
          titleId="articles-title"
          description="记录工程实践、工具开发，也记录生活中值得反复回看的片段。"
          action={(
            <a className="text-link" href="https://xsfly.com" target="_blank" rel="noopener noreferrer">
              查看全部文章 <Icons.ArrowRight className="inline-icon" />
            </a>
          )}
        />

        <div className="article-list" aria-live="polite">
          {loading && [1, 2, 3].map((item) => (
            <div key={item} className="article-row article-skeleton" aria-hidden="true">
              <span />
              <div><i /><i /></div>
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
              <span className="article-read-time">{post.readTimeMinutes} min read</span>
              <Icons.ArrowRight className="article-arrow" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default React.memo(Projects);
