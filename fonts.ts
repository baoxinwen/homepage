// 自托管字体声明表（评审 M-4，约 266KB / gzip 115KB）：由 index.tsx 在首帧
// 绘制后动态加载，不进首绘关键路径；窗口期由 styles.css 的 --font-*-stack
// 兜底，字体文件本体仍按 unicode-range 分片按需下载并 font-display: swap 换装。
import '@fontsource/noto-serif-sc/600.css';
import '@fontsource/noto-serif-sc/900.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
