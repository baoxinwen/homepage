import type { BlogPost } from '../types';

export const BLOG_ORIGIN = 'https://xsfly.com';
export const RSS_URL = `${BLOG_ORIGIN}/rss.xml`;
export const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;
export const BLOG_CACHE_KEY = 'homepage.blogPosts.v1';
export const BLOG_CACHE_FRESH_MS = 60 * 60 * 1000;
export const BLOG_CACHE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export const BLOG_REQUEST_TIMEOUT_MS = 8_000;

interface RssItem {
  title?: unknown;
  link?: unknown;
  pubDate?: unknown;
  description?: unknown;
}

interface BlogCachePayload {
  version: 1;
  fetchedAt: number;
  posts: BlogPost[];
}

export interface BlogCacheResult {
  posts: BlogPost[];
  freshness: 'fresh' | 'stale';
}

type ReadableStorage = Pick<Storage, 'getItem'>;
type WritableStorage = Pick<Storage, 'setItem'>;

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null
);

// 使用 inert 的 DOMParser 文档剥离 HTML：不会加载图片、不触发事件处理器、
// 不执行脚本（innerHTML 在游离节点上仍会发起图片请求并可能触发 onerror）。
const htmlToPlainText = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.documentElement.textContent ?? '').replace(/\s+/g, ' ').trim();
};

const normalizeBlogLink = (value: unknown): string | null => {
  if (typeof value !== 'string' || value.trim() === '') return null;

  try {
    const url = new URL(value, BLOG_ORIGIN);
    const isTrustedHost = url.hostname === 'xsfly.com' || url.hostname.endsWith('.xsfly.com');
    if (url.protocol !== 'https:' || !isTrustedHost || url.port || url.username || url.password) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
};

const normalizeDate = (value: unknown): Pick<BlogPost, 'pubDate' | 'dateLabel'> => {
  if (typeof value !== 'string' || value.trim() === '') {
    return { pubDate: '', dateLabel: '—' };
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return { pubDate: '', dateLabel: '—' };
  }

  return {
    pubDate: date.toISOString(),
    dateLabel: dateFormatter.format(date),
  };
};

export const calculateReadTime = (text: string): number => (
  Math.max(1, Math.ceil(text.length / 400))
);

const createExcerpt = (text: string): string => (
  text.length > 120 ? `${text.slice(0, 120).trimEnd()}…` : text
);

export const parseRssResponse = (value: unknown): BlogPost[] => {
  if (!isRecord(value) || value.status !== 'ok' || !Array.isArray(value.items)) {
    throw new Error('Invalid RSS response');
  }

  const posts: BlogPost[] = [];

  for (const rawItem of value.items) {
    if (!isRecord(rawItem)) continue;
    const item = rawItem as RssItem;
    const link = normalizeBlogLink(item.link);
    if (!link) continue;

    const title = typeof item.title === 'string'
      ? htmlToPlainText(item.title) || '未命名文章'
      : '未命名文章';
    const fullDescription = typeof item.description === 'string'
      ? htmlToPlainText(item.description)
      : '';
    const date = normalizeDate(item.pubDate);

    posts.push({
      title,
      link,
      ...date,
      description: createExcerpt(fullDescription),
      readTimeMinutes: calculateReadTime(fullDescription),
    });

    if (posts.length === 3) break;
  }

  if (posts.length === 0) {
    throw new Error('RSS response contains no valid posts');
  }

  return posts;
};

const isBlogPost = (value: unknown): value is BlogPost => {
  if (!isRecord(value)) return false;
  return typeof value.title === 'string'
    && typeof value.link === 'string'
    && normalizeBlogLink(value.link) === value.link
    && typeof value.pubDate === 'string'
    && typeof value.dateLabel === 'string'
    && typeof value.description === 'string'
    && Number.isInteger(value.readTimeMinutes)
    && Number(value.readTimeMinutes) >= 1;
};

// 缓存读路径与 RSS 解析路径执行同一套净化：上限 3 条，标题/摘要重新剥 HTML
// 并截断。防止被篡改的 localStorage 数据绕过写路径限制，放大成持久化的
// 页面内容伪装或超量 DOM 渲染。
const sanitizeCachedPosts = (posts: BlogPost[]): BlogPost[] => (
  posts.slice(0, 3).map((post) => {
    const description = createExcerpt(htmlToPlainText(post.description));
    return {
      ...post,
      title: htmlToPlainText(post.title) || '未命名文章',
      description,
      readTimeMinutes: (
        Number.isInteger(post.readTimeMinutes) && post.readTimeMinutes >= 1
          ? post.readTimeMinutes
          : calculateReadTime(description)
      ),
    };
  })
);

export const readBlogCache = (
  storage: ReadableStorage | null,
  now = Date.now(),
): BlogCacheResult | null => {
  if (!storage) return null;

  try {
    const rawValue = storage.getItem(BLOG_CACHE_KEY);
    if (!rawValue) return null;
    const value: unknown = JSON.parse(rawValue);
    if (!isRecord(value)
      || value.version !== 1
      || typeof value.fetchedAt !== 'number'
      || !Array.isArray(value.posts)
      || value.posts.length === 0
      || !value.posts.every(isBlogPost)) {
      return null;
    }

    const age = now - value.fetchedAt;
    if (age < 0 || age > BLOG_CACHE_MAX_AGE_MS) return null;

    return {
      posts: sanitizeCachedPosts(value.posts),
      freshness: age <= BLOG_CACHE_FRESH_MS ? 'fresh' : 'stale',
    };
  } catch {
    return null;
  }
};

export const writeBlogCache = (
  storage: WritableStorage | null,
  posts: BlogPost[],
  now = Date.now(),
): boolean => {
  if (!storage || posts.length === 0) return false;

  const payload: BlogCachePayload = {
    version: 1,
    fetchedAt: now,
    posts,
  };

  try {
    storage.setItem(BLOG_CACHE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
};

export const fetchBlogPosts = async (
  signal: AbortSignal,
  fetchImplementation: typeof fetch = fetch,
): Promise<BlogPost[]> => {
  const response = await fetchImplementation(RSS_API_URL, {
    signal,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  return parseRssResponse(await response.json());
};
