import { afterEach, describe, expect, it } from 'vitest';

// M-1 回归守卫：blog.ts 的 dateFormatter 在模块导入时构造，其 timeZone 解析
// 取决于进程时区。必须先切换进程时区、再加载被测模块，测试才不依赖
// “CI 或本机的宿主时区碰巧正确”（GitHub Actions 为 UTC，本机为 UTC+8）。

describe('date label timezone pinning', () => {
  const previousTZ = process.env.TZ;

  afterEach(() => {
    process.env.TZ = previousTZ;
  });

  it('keeps the label on the blog-origin (UTC+8) date regardless of visitor timezone', async () => {
    process.env.TZ = 'America/New_York';
    const { parseRssResponse } = await import('./blog');
    // 17:00Z 在东八区已是次日 01:00（08/21），在纽约是当日 13:00（08/20）
    const [post] = parseRssResponse({
      status: 'ok',
      items: [{
        title: '时区不漂移',
        link: 'https://xsfly.com/posts/timezone',
        pubDate: '2026-08-20T17:00:00Z',
        description: '无论访客身处哪个时区，日期标签都必须与博客源站一致。',
      }],
    });
    expect(post.dateLabel).toBe('2026/08/21');
  });
});
