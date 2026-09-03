import React from 'react';
import ReactDOM from 'react-dom/client';
// 自托管字体（CSP font-src 'self'）：宋体衬线做显示层，等宽做数据层
import '@fontsource/noto-serif-sc/600.css';
import '@fontsource/noto-serif-sc/900.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
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
