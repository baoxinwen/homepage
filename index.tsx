import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (import.meta.env.DEV) {
  console.info(
    '%c浮生闲记 · Technical Field Notes%c\n代码与文字内容受版权保护，欢迎访问 https://xsfly.com 交流。',
    'color:#A63A24;font-size:18px;font-weight:700;',
    'color:#5F594C;font-size:12px;'
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 字体声明表走惰性入口（评审 M-4）：双 rAF 确保触发点晚于首帧，期间由
// --font-*-stack 兜底换装；rAF 在 bfcache 恢复后正常续跑，无 load 事件陷阱。
requestAnimationFrame(() => requestAnimationFrame(() => {
  void import('./fonts');
}));
