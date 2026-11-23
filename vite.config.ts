import { randomUUID } from 'node:crypto';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// dev 下 @vitejs/plugin-react 注入的内联 preamble script 与 vite/client 运行时注入的
// <style> 必须携带 nonce，否则被 index.html 的 CSP（script-src/style-src 'self'）拦截，
// npm run dev 直接白屏（评审 C-1）。nonce 仅存在于 dev 会话；生产构建不注入任何
// nonce，CSP 策略与产物保持原样。
export default defineConfig(({ mode }) => {
  const devNonce = randomUUID();

  const devCspNoncePlugin: Plugin = {
    name: 'dev-csp-nonce',
    transformIndexHtml(html) {
      return html
        .replace("script-src 'self'", `script-src 'self' 'nonce-${devNonce}'`)
        .replace("style-src 'self'", `style-src 'self' 'nonce-${devNonce}'`);
    },
  };

  return {
    server: {
      port: 3000,
    },
    plugins: mode === 'development' ? [react(), devCspNoncePlugin] : [react()],
    html: mode === 'development' ? { cspNonce: devNonce } : undefined,
  };
});
