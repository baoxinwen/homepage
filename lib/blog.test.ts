import { describe, expect, it, vi } from 'vitest';
import {
  BLOG_CACHE_FRESH_MS,
  BLOG_CACHE_KEY,
  BLOG_CACHE_MAX_AGE_MS,
  BLOG_REQUEST_TIMEOUT_MS,
  fetchBlogPosts,
  parseRssResponse,
  readBlogCache,
  writeBlogCache,
} from './blog';

const createFeed = (overrides: Record<string, unknown> = {}) => ({
  status: 'ok',
  items: [{
    title: '可靠的软件交付',
    link: 'https://xsfly.com/posts/reliable-delivery',
    pubDate: '2026-07-20T08:00:00Z',
    description: '<p>从测试策略到持续交付的完整实践。</p>',
    ...overrides,
  }],
});

const createStorage = () => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
};

describe('RSS normalization', () => {
  it('normalizes trusted posts and strips HTML', () => {
    const [post] = parseRssResponse(createFeed());
    expect(post).toMatchObject({
      title: '可靠的软件交付',
      link: 'https://xsfly.com/posts/reliable-delivery',
      description: '从测试策略到持续交付的完整实践。',
      readTimeMinutes: 1,
    });
    expect(post.pubDate).toBe('2026-07-20T08:00:00.000Z');
    expect(post.dateLabel).not.toBe('—');
  });

  it('calculates reading time before truncating the excerpt', () => {
    const description = `<p>${'测'.repeat(901)}</p>`;
    const [post] = parseRssResponse(createFeed({ description }));
    expect(post.readTimeMinutes).toBe(3);
    expect(post.description).toHaveLength(121);
    expect(post.description.endsWith('…')).toBe(true);
  });

  it('rejects hostile links and keeps later trusted entries', () => {
    const validItem = createFeed().items[0];
    const posts = parseRssResponse({
      status: 'ok',
      items: [
        { ...validItem, link: 'javascript:alert(1)' },
        { ...validItem, link: 'https://example.com/phishing' },
        validItem,
      ],
    });
    expect(posts).toHaveLength(1);
    expect(posts[0].link).toContain('xsfly.com');
  });

  it('uses a neutral label for invalid dates', () => {
    const [post] = parseRssResponse(createFeed({ pubDate: 'not-a-date' }));
    expect(post.pubDate).toBe('');
    expect(post.dateLabel).toBe('—');
  });

  it('rejects malformed and empty responses', () => {
    expect(() => parseRssResponse({ status: 'error' })).toThrow('Invalid RSS response');
    expect(() => parseRssResponse({ status: 'ok', items: [] })).toThrow('no valid posts');
  });
});

describe('RSS cache', () => {
  it('distinguishes fresh, stale, and expired data', () => {
    const storage = createStorage();
    const now = 10_000_000;
    const posts = parseRssResponse(createFeed());
    expect(writeBlogCache(storage, posts, now)).toBe(true);
    expect(readBlogCache(storage, now)?.freshness).toBe('fresh');
    expect(readBlogCache(storage, now + BLOG_CACHE_FRESH_MS + 1)?.freshness).toBe('stale');
    expect(readBlogCache(storage, now + BLOG_CACHE_MAX_AGE_MS + 1)).toBeNull();
  });

  it('ignores corrupt data and storage failures', () => {
    const corruptStorage = {
      getItem: () => '{broken',
      setItem: () => {
        throw new Error('blocked');
      },
    };
    expect(readBlogCache(corruptStorage)).toBeNull();
    expect(writeBlogCache(corruptStorage, parseRssResponse(createFeed()))).toBe(false);
    expect(BLOG_CACHE_KEY).toBe('homepage.blogPosts.v1');
  });
});

describe('RSS request', () => {
  it('forwards abort signals and uses the configured timeout contract', async () => {
    const controller = new AbortController();
    const fetchImplementation = vi.fn((_input: RequestInfo | URL, init?: RequestInit) => (
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      })
    ));

    const request = fetchBlogPosts(controller.signal, fetchImplementation as typeof fetch);
    controller.abort();
    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetchImplementation).toHaveBeenCalledOnce();
    expect(BLOG_REQUEST_TIMEOUT_MS).toBe(8_000);
  });
});

describe('cache read-path hardening', () => {
  const writeRawCache = (storage: ReturnType<typeof createStorage>, posts: unknown[]) => {
    storage.setItem(BLOG_CACHE_KEY, JSON.stringify({
      version: 1,
      fetchedAt: Date.now(),
      posts,
    }));
  };

  const trustedPost = (overrides: Record<string, unknown> = {}) => ({
    title: '正常标题',
    link: 'https://xsfly.com/posts/trusted',
    pubDate: '2026-07-20T08:00:00Z',
    dateLabel: '2026/07/20',
    description: '正常摘要。',
    readTimeMinutes: 1,
    ...overrides,
  });

  it('caps cached posts at three regardless of stored size', () => {
    const storage = createStorage();
    writeRawCache(storage, Array.from({ length: 500 }, (_, index) => trustedPost({
      link: `https://xsfly.com/posts/${index}`,
    })));

    expect(readBlogCache(storage)?.posts).toHaveLength(3);
  });

  it('strips markup injected into cached titles and descriptions', () => {
    const storage = createStorage();
    writeRawCache(storage, [trustedPost({
      title: '<img src=x onerror=alert(1)>被篡改的标题',
      description: '<b>加粗</b>的摘要正文',
    })]);

    const [post] = readBlogCache(storage)?.posts ?? [];
    expect(post?.title).toBe('被篡改的标题');
    expect(post?.description).toBe('加粗的摘要正文');
    expect(post?.title).not.toContain('<');
    expect(post?.description).not.toContain('<');
  });
});
