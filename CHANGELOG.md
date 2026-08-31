# Changelog

本项目的所有重要变更将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循[语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

## [1.0.0] - 2026-08-31

### Added

- 首页四大板块：关于我（终端独白式自我介绍与实时冒烟测试条）、专业能力、开源项目卡片、最近博客（RSS 展示标题与摘要）
- 深色/浅色主题：首屏由同源脚本安全初始化，选择持久化到 `localStorage`，未主动选择时跟随系统偏好
- 移动端导航：锚点折叠进菜单，小屏仍可到达全部区块
- 「工程手记」编辑风视觉系统：暖纸色、墨黑、信号橙与工程绿语义色板，双主题完整适配
- RSS 博客聚合：超时、缓存与异常降级，数据限制为 `xsfly.com` 及其子域

### Changed

- 整站由初版液态玻璃风格重构为编辑风布局，降低视觉噪音，并提取 `SiteHeader`、`SectionHeading` 等组件
- 站点主域名统一为 `baoxw.com`，canonical 与社交分享元数据随之对齐，并补充回归测试防止漂移
- 收紧构建配置与仓库元数据：移除未使用的路径别名与装饰器配置，CI 锁定与 `packageManager` 一致的 npm 版本，引入 `.gitattributes` 统一换行语义，补充 `robots.txt` 与 `sitemap.xml`

### Fixed

- `localStorage` 属持久化输入，缓存读路径现与 RSS 解析路径共用同一套净化，防止被篡改数据放大为页面内容伪装或超量渲染，并收紧外链主机白名单（附回归测试）

### Security

- CSP 限制脚本、图片与网络请求来源，不依赖内联脚本或内联样式
- 外部链接统一使用 `noopener noreferrer`

[Unreleased]: https://github.com/baoxinwen/homepage/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/baoxinwen/homepage/releases/tag/v1.0.0
