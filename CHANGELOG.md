# Changelog

本项目的所有重要变更将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循[语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### Changed

- 去边框改造：项目卡片、主/副按钮、墨窗、画匣、窗口样张、图标圆徽与各处 chip 拆除 1px 框线，改以纸面 1%~3% 微明度分层加偏移投影定形；暗色阴影基色由纯黑 `#000000` 改为暖黑 `#0a0806`（行分隔线、链接下划线等非盒式线条保留）
- 终端独白改流式打字：命令逐字步进 64ms→30ms，单字与输出行均以 90ms 从 `blur(6px)` 晕开至清晰，`prefers-reduced-motion` 下直出全文
- 移动端菜单改用 Grid `0fr→1fr` 高度过渡折叠，免 JS 算高、收起归零（原为 display 切换加浮现动画）；面板内边距移至链接自身，避免 Grid 轨道残留
- 细节对齐：行内图标 `vertical-align: -0.125em` 对齐文字中线，序号/日期等数字位加 `tabular-nums` 锁等宽，正文段落加 `text-wrap: pretty` 防孤字
- 区块 kicker 统一大写呈现（`text-transform: uppercase`，源文本保持自然大小写），按压反馈统一 0.96（清理 0.94/0.97 死代码）；次级项目链接 hover 底色改由 `ink 7%` 混合派生，不再借用分隔线令牌

### Fixed

- `--faint` 用作正文级文字对比度仅 3.2:1 不达 WCAG AA（测试契约盲区）：项目序号、文章日期/摘要/阅读时长、页脚版权改用 `--muted`（≥6.2:1）；`--faint` 保留给箭头图标与开发期自检条，由测试按 1.4.11 非文字 3:1 锁定
- 品牌链接 aria-label 纳入可见文字「浮生闲记」，满足 WCAG 2.5.3 Label in Name
- 根元素补 `scroll-padding-block-start`（96px，窄屏 80px），Tab 焦点不再被粘性导航遮挡（WCAG 2.4.11）
- 5 处未门控的 `:hover` 包进 `@media (hover: hover) and (pointer: fine)`，触屏点按不再粘滞悬停态；删除页脚联系链接容器上不生效的 `aria-label`

## [1.1.0] - 2026-09-03

### Added

- 精选项目新增 PromptMate（Rust/Tauri 桌面提示词助手）与 douyin-download（自托管抖音工作台），卡片布局扩展为七项并附 Latest Release 下载入口
- 自托管字体：Noto Serif SC 与 JetBrains Mono 经 `@fontsource` 按 unicode-range 分片加载，衬线显示与等宽数据在各平台渲染一致

### Changed

- 整站视觉重设计为「宣纸与墨」：宣纸昼/墨夜双主题、朱砂印章式强调、衬线巨字编辑排版与三层设计令牌（原始色板/语义/组件）；项目预览保留窗口式构图并以新令牌重新着色
- README 视觉说明与主题色契约测试字面量同步新体系，30 组前景/背景配对由测试锁定 WCAG AA

### Security

- 升级开发依赖 browserslist，修复无界内存增长高危通告（GHSA-c83g-rgw3-j3cx），`npm audit` 高危归零

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

[Unreleased]: https://github.com/baoxinwen/homepage/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/baoxinwen/homepage/releases/tag/v1.1.0
[1.0.0]: https://github.com/baoxinwen/homepage/releases/tag/v1.0.0
