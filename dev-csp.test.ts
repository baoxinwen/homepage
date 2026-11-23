// @vitest-environment node
// （dev server 探测是纯 Node 流程；jsdom 环境的跨 realm Uint8Array 会破坏 esbuild 不变量）
import { createServer, type ViteDevServer } from 'vite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// C-1 回归守卫：dev server 返回的 HTML 必须与其自身的 CSP 元策略自洽。
// @vitejs/plugin-react 会在 dev 时注入内联 preamble script（设置 window.$RefreshReg$），
// 若它不带 nonce，会被 index.html 的 script-src 'self' 拒绝执行，随后所有被
// React Refresh 转换的模块在求值时抛错，root.render 永不执行 —— npm run dev 白屏。

let server: ViteDevServer;
let html: string;

beforeAll(async () => {
  // 显式端口 0：随机空闲端口，避免与本机 3000 或并行任务冲突；
  // noDiscovery：本探测只取 dev HTML 验证 CSP 自洽，无需依赖预扫描（否则
  // afterAll 快速关停会留下 "Request is outdated" 的扫描噪音）
  server = await createServer({
    logLevel: 'error',
    server: { port: 0 },
    optimizeDeps: { noDiscovery: true },
  });
  await server.listen();
  const localUrl = server.resolvedUrls?.local[0];
  if (!localUrl) throw new Error('dev server 未报告本地地址');
  html = await (await fetch(localUrl)).text();
});

afterAll(async () => {
  await server?.close();
});

const cspContent = () => (
  html.match(
    /<meta[^>]*http-equiv="Content-Security-Policy"[^>]*content="([^"]*)"|<meta[^>]*content="([^"]*)"[^>]*http-equiv="Content-Security-Policy"/,
  )?.slice(1).find(Boolean) ?? ''
);

const directive = (name: string) => (
  cspContent()
    .split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${name} `)) ?? ''
);

const devNonce = () => (
  html.match(/<meta[^>]*property="csp-nonce"[^>]*nonce="([^"]+)"/)?.[1]
);

const inlineScriptTags = () => (
  (html.match(/<script\b[^>]*>/g) ?? []).filter((tag) => !/\bsrc=/.test(tag))
);

describe('dev server CSP self-consistency', () => {
  it('declares the dev session nonce in script-src and style-src', () => {
    const nonce = devNonce();
    expect(
      nonce,
      'dev HTML 未注入 meta[property=csp-nonce]（html.cspNonce 未生效）',
    ).toBeTruthy();
    expect(directive('script-src')).toContain(`'nonce-${nonce}'`);
    expect(directive('style-src')).toContain(`'nonce-${nonce}'`);
  });

  it('nonces every inline script tag, including the React preamble', () => {
    const nonce = devNonce() ?? '';
    const unnonced = inlineScriptTags()
      .filter((tag) => !tag.includes(`nonce="${nonce}"`));
    expect(
      unnonced,
      `以下内联 script 缺少 nonce，将被 CSP 拦截：${unnonced.join(' | ')}`,
    ).toEqual([]);
    // dev 转换后的组件模块依赖 preamble，它必须真实出现在 dev HTML 里
    expect(inlineScriptTags().length).toBeGreaterThan(0);
  });
});
