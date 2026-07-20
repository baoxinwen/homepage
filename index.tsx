import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.info(
  '%c浮生闲记 · Technical Field Notes%c\n代码与文字内容受版权保护，欢迎访问 https://xsfly.com 交流。',
  'color:#E85D2A;font-size:18px;font-weight:700;',
  'color:#676258;font-size:12px;'
);

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
