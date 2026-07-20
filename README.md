# 浮生闲记 · 个人主页

面向软件测试、自动化实践和开源工具开发的个人主页。

![License](https://img.shields.io/badge/license-MIT-191813.svg)
![React](https://img.shields.io/badge/react-19.2-E85D2A.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.8-2F7657.svg)
![Vite](https://img.shields.io/badge/vite-6.4-676258.svg)

## 页面内容

- 关于我：测试工程师与独立开发者的个人介绍
- 专业能力：编程开发、自动化、运维工具与协作平台
- 开源项目：MemeMaker、Ledger、CopyTree、footprint、hotsearch-monitor
- 最近博客：通过 RSS 展示最新文章
- 深色/浅色主题与响应式布局

## 视觉系统

页面采用“Technical Field Notes / 工程手记”方向，以暖纸色、墨黑、信号橙和工程绿构成统一的编辑式界面。

| 语义 | 浅色模式 | 深色模式 |
| --- | --- | --- |
| 页面背景 | `#F3F0E8` | `#171611` |
| 主要文字 | `#191813` | `#EDE8DC` |
| 主强调色 | `#E85D2A` | `#FF7043` |
| 小字号强调文字 | `#BD4218` | `#FF7043` |
| 成功状态 | `#2F7657` | `#5AAA7C` |
| 边框 | `#CCC7B9` | `#37342B` |

全站样式由 `styles.css` 中的语义变量和组件类维护，不依赖运行时 CSS CDN。标题、正文与技术标签分别使用本机宋体、黑体和等宽字体栈，无需下载字体资源。

社交分享图位于 `public/og-image.png`。如需改版，可使用 Python 3 与 Pillow 运行 `scripts/generate_og_image.py` 重新生成。

## 技术栈

- React 19
- TypeScript 5.8
- Vite 6
- 原生 CSS 设计变量与响应式布局
- ESLint、Vitest 与 GitHub Actions

## 本地开发

环境要求：Node.js 20.19+ 或 22.12+，npm 11。

```bash
npm ci
npm run dev
```

常用命令：

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 生成生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run lint` | 执行 ESLint 检查 |
| `npm run typecheck` | 执行 TypeScript 严格类型检查 |
| `npm run test` | 运行 Vitest 测试 |
| `npm run check` | 依次执行全部检查与生产构建 |

其中 `npm run check` 会依次执行 ESLint、TypeScript 严格类型检查、Vitest 和生产构建。仓库使用 npm，并提交 `package-lock.json` 保证本地与 CI 安装结果一致。

## 项目结构

```text
homepage/
├── .github/workflows/
│   └── ci.yml
├── components/
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── FeaturedProjects.tsx
├── lib/
│   ├── blog.ts / blog.test.ts
│   └── theme.ts / theme.test.ts
├── public/
│   ├── og-image.png
│   └── theme-init.js
├── scripts/
│   └── generate_og_image.py
├── App.tsx
├── constants.tsx
├── quality.test.ts
├── styles.css
├── types.ts
├── index.tsx
├── index.html
├── eslint.config.js
├── vite.config.ts
└── vitest.config.ts
```

## 安全与可访问性

- 使用 CSP 限制脚本、图片与网络请求来源
- 不依赖内联脚本或内联样式，首屏主题由同源脚本安全初始化
- 外部链接使用 `noopener noreferrer`
- 支持键盘焦点、文字选择、复制、打印及 `prefers-reduced-motion`
- 主题选择保存在 `localStorage`；未主动选择时持续跟随系统偏好
- RSS 数据限制为 `xsfly.com` 链接，并提供超时、缓存和异常降级

## 自动化验证

- ESLint：TypeScript、React Hooks、React Refresh 与 JSX 可访问性规则
- Vitest：RSS 解析/缓存、主题状态、配色对比度和分享图元数据
- GitHub Actions：在 Node.js 20.19 与 22 环境运行完整检查

## 作者

- 博客：[https://xsfly.com](https://xsfly.com)
- GitHub：[@baoxinwen](https://github.com/baoxinwen)

## License

[MIT License](LICENSE)
