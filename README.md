# 浮生闲记 - 个人主页

> 专注于软件质量保障的测试工程师个人主页

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-19.2.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.8.2-blue.svg)
![Vite](https://img.shields.io/badge/vite-6.2.0-646cda.svg)

## ✨ 特性

- 🎨 **现代化 UI 设计** - 采用液态玻璃效果（Glassmorphism）和青绿色调
- 🌓 **深色/浅色主题** - 自动检测系统偏好，支持手动切换
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🎯 **专业技能展示** - Bento Grid 布局展示技术栈
- 📝 **博客集成** - 自动获取最新文章（RSS 订阅）
- 🔒 **代码保护** - 多重防护措施保护源代码
- ⚡ **性能优化** - React.memo、useCallback、useMemo 优化

## 🛠️ 技术栈

### 核心框架
- **React 19.2.1** - UI 框架
- **TypeScript 5.8.2** - 类型安全
- **Vite 6.2.0** - 构建工具

### 样式和 UI
- **Tailwind CSS** - 原子化 CSS 框架（CDN）
- **液态玻璃效果** - Glassmorphism 设计风格
- **配色方案** - Teal/Emerald + Stone 暖灰色调

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

开发服务器默认运行在 `http://localhost:3000`

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
personal-homepage/
├── components/          # React 组件
│   ├── Hero.tsx        # 英雄区域（个人介绍、CTA 按钮、统计数据）
│   └── Projects.tsx     # 项目展示（技能卡片、博客文章）
├── App.tsx              # 主应用组件
├── index.tsx            # React 入口文件
├── index.html           # HTML 入口（包含安全脚本和样式配置）
├── constants.tsx        # 常量配置（图标、技能分组、社交链接）
├── types.ts             # TypeScript 类型定义
└── vite.config.ts       # Vite 配置
```

## 🎨 设计特点

### 配色方案
- **主色**: Teal（青色）`#14b8a6` / Emerald（翠绿）`#10b981`
- **辅助色**: Amber、Rose
- **中性色**: Stone 暖灰色调
- **深色模式**: Stone-950（深蓝灰）

### UI 特色
- **液态玻璃效果** - 半透明背景 + 背景模糊
- **微妙动画** - 悬停效果、渐入动画、滚动进度条
- **圆角设计** - 大圆角卡片和按钮
- **精致阴影** - 多层次阴影创造深度感

## 🔒 安全特性

项目实现了多重代码保护措施：

- 禁用右键菜单
- 禁用 F12 和开发者工具快捷键
- 禁用文本选择和拖拽
- 禁用打印、保存、复制等操作
- DevTools 检测（时间差攻击、窗口尺寸检测）
- 控制台版权警告
- CSP 内容安全策略

## 📝 更新日志

### v1.0.0
- 初始版本发布
- 实现核心 UI 组件和功能
- 添加博客 RSS 集成
- 实现深色模式切换
- 添加代码保护措施

## 📄 许可证

[MIT License](LICENSE)

## 👨‍💻 作者

**浮生闲记** - 测试工程师

- 博客: [https://xsfly.com](https://xsfly.com)
- GitHub: [@baoxinwen](https://github.com/baoxinwen)

## 🙏 致谢

感谢所有开源项目的贡献者！

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
