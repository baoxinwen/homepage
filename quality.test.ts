import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectPath = (path: string) => join(process.cwd(), path);
const readProjectFile = (path: string) => readFileSync(projectPath(path), 'utf8');

const luminance = (hex: string): number => {
  const channels = hex.match(/[a-f\d]{2}/gi)?.map((value) => Number.parseInt(value, 16) / 255) ?? [];
  const linear = channels.map((value) => (
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * (linear[0] ?? 0) + 0.7152 * (linear[1] ?? 0) + 0.0722 * (linear[2] ?? 0);
};

const contrast = (foreground: string, background: string): number => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return ((values[0] ?? 0) + 0.05) / ((values[1] ?? 0) + 0.05);
};

const parseThemeBlock = (css: string, selector: ':root' | '.dark'): string => {
  const pattern = selector === ':root'
    ? /:root\s*\{([\s\S]*?)\}/
    : /(?:^|\n)\.dark\s*\{([\s\S]*?)\n\}/;
  const block = css.match(pattern)?.[1];
  if (!block) throw new Error(`Missing ${selector} block in styles.css`);
  return block;
};

const readCssVar = (block: string, name: string): string => {
  const value = block.match(new RegExp(`--${name}:\\s*(#[a-f\\d]{6})`, 'i'))?.[1];
  if (!value) throw new Error(`Missing CSS variable: --${name}`);
  return value;
};

// 与 CSS color-mix(in srgb, ...) 的 gamma 空间线性插值保持一致
const colorMix = (a: string, b: string, ratio: number): string => {
  const channel = (offset: number) => Math.round(
    Number.parseInt(a.slice(offset, offset + 2), 16) * ratio
      + Number.parseInt(b.slice(offset, offset + 2), 16) * (1 - ratio),
  );
  const hex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${hex(channel(1))}${hex(channel(3))}${hex(channel(5))}`;
};

describe('accessibility and security contracts', () => {
  it('keeps every declared foreground/background pair above WCAG AA', () => {
    const css = readProjectFile('./styles.css');
    const light = parseThemeBlock(css, ':root');
    const dark = parseThemeBlock(css, '.dark');

    // 绑定 color-mix 比例：调整任一比例必须同步更新本文件中的展开计算
    expect(css).toContain('color-mix(in srgb, var(--success) 12%, var(--surface-alt))');
    expect(css).toContain('color-mix(in srgb, var(--accent) 5%, var(--surface-alt))');

    const memeTint = {
      light: colorMix(readCssVar(light, 'success'), readCssVar(light, 'surface-alt'), 0.12),
      dark: colorMix(readCssVar(dark, 'success'), readCssVar(dark, 'surface-alt'), 0.12),
    };
    const ledgerTint = {
      light: colorMix(readCssVar(light, 'accent'), readCssVar(light, 'surface-alt'), 0.05),
      dark: colorMix(readCssVar(dark, 'accent'), readCssVar(dark, 'surface-alt'), 0.05),
    };

    const resolveVar = (theme: ':root' | '.dark', value: string): string => (
      value.startsWith('#')
        ? value
        : readCssVar(theme === ':root' ? light : dark, value)
    );

    const pair = (theme: ':root' | '.dark', fg: string, bg: string, min: number) => ({
      label: `[${theme === ':root' ? 'light' : 'dark'}] ${fg} on ${bg} >= ${min}`,
      ratio: contrast(resolveVar(theme, fg), resolveVar(theme, bg)),
      min,
    });

    const fixedPairs = [
      pair(':root', 'ink', 'canvas', 4.5),
      pair(':root', 'muted', 'canvas', 4.5),
      pair(':root', 'muted', 'surface', 4.5),
      pair(':root', 'muted', 'surface-alt', 4.5),
      pair(':root', 'accent-text', 'canvas', 4.5),
      pair(':root', 'accent-text', 'surface', 4.5),
      pair(':root', 'accent-contrast', 'accent-text', 4.5),
      pair(':root', 'success', 'canvas', 4.5),
      // hero 强调标题为 clamp(2.5rem, 6vw, 4.75rem)/800，适用 AA Large 阈值
      pair(':root', 'accent', 'canvas', 3.0),
      // 项目卡片深底 mockup 的成对面板配色
      pair(':root', 'panel-accent', 'panel-bg', 4.5),
      pair(':root', 'panel-success', 'panel-bg', 4.5),
      pair(':root', 'panel-muted', 'panel-bg', 4.5),
      pair(':root', 'panel-ink', 'panel-bg', 4.5),
      pair(':root', 'ink', memeTint.light, 4.5),
      pair(':root', 'muted', ledgerTint.light, 4.5),

      pair('.dark', 'ink', 'canvas', 4.5),
      pair('.dark', 'muted', 'canvas', 4.5),
      pair('.dark', 'muted', 'surface', 4.5),
      pair('.dark', 'muted', 'surface-alt', 4.5),
      pair('.dark', 'accent-text', 'canvas', 4.5),
      pair('.dark', 'accent-text', 'surface', 4.5),
      pair('.dark', 'accent-contrast', 'accent-text', 4.5),
      pair('.dark', 'success', 'canvas', 4.5),
      pair('.dark', 'accent', 'canvas', 3.0),
      pair('.dark', 'panel-accent', 'panel-bg', 4.5),
      pair('.dark', 'panel-success', 'panel-bg', 4.5),
      pair('.dark', 'panel-muted', 'panel-bg', 4.5),
      pair('.dark', 'panel-ink', 'panel-bg', 4.5),
      pair('.dark', 'ink', memeTint.dark, 4.5),
      pair('.dark', 'muted', ledgerTint.dark, 4.5),
    ];

    const failures = fixedPairs
      .filter(({ ratio, min }) => ratio < min)
      .map(({ label, ratio }) => `${label} (actual ${ratio})`);
    expect(failures).toEqual([]);
  });

  it('does not require inline style or remote image permissions', () => {
    const html = readProjectFile('./index.html');
    const entry = readProjectFile('./index.tsx');
    const tsxFiles = [
      './App.tsx',
      './constants.tsx',
      './components/Hero.tsx',
      './components/Projects.tsx',
      './components/FeaturedProjects.tsx',
      './components/SectionHeading.tsx',
      './components/SiteHeader.tsx',
      './components/SmokeTest.tsx',
      './components/TerminalIntro.tsx',
    ];

    expect(html).not.toContain("'unsafe-inline'");
    expect(html).toContain('<link rel="stylesheet" href="/styles.css" />');
    expect(entry).not.toMatch(/import\s+['"]\.\/styles\.css['"]/);
    for (const file of tsxFiles) {
      expect(readProjectFile(file), `${file} 不应包含内联 style 属性`).not.toMatch(/\sstyle=/);
    }

    // 页面不渲染任何远程图片，CSP 必须保持无 https: 通配图片源
    expect(html).toContain("img-src 'self' data:");
    expect(html).not.toMatch(/img-src[^;]*https:/);
    expect(html).toContain('rel="preconnect" href="https://api.rss2json.com"');
    expect(html).not.toContain('name="keywords"');
  });
});

describe('social image metadata', () => {
  it('ships a 1200 by 630 PNG and matching metadata', () => {
    const png = readFileSync(projectPath('public/og-image.png'));
    expect(png.subarray(1, 4).toString()).toBe('PNG');
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);

    const html = readProjectFile('./index.html');
    expect(html).toContain('og:image:width" content="1200');
    expect(html).toContain('og:image:height" content="630');
    expect(html).toContain('name="twitter:image"');
  });

  it('uses the public homepage as the canonical and sharing origin', () => {
    const html = readProjectFile('./index.html');
    expect(html).toContain('<link rel="canonical" href="https://baoxw.com/" />');
    expect(html).toContain('<meta property="og:url" content="https://baoxw.com/" />');
    expect(html).toContain('<meta property="og:image" content="https://baoxw.com/og-image.png" />');
    expect(html).toContain('<meta name="twitter:image" content="https://baoxw.com/og-image.png" />');
  });
});

describe('theme bootstrap consistency', () => {
  it('keeps theme colors aligned across html, runtime module and boot script', () => {
    const html = readProjectFile('./index.html');
    const themeModule = readProjectFile('./lib/theme.ts');
    const bootScript = readProjectFile('./public/theme-init.js');

    expect(themeModule).toContain('#F6F3EC');
    expect(themeModule).toContain('#16130E');
    expect(bootScript).toContain('#F6F3EC');
    expect(bootScript).toContain('#16130E');
    expect(html).toContain('content="#F6F3EC"');
  });
});

describe('visible copy', () => {
  it('keeps the page concise without changing the articles description', () => {
    const pageCopy = [
      readProjectFile('./App.tsx'),
      readProjectFile('./components/Hero.tsx'),
      readProjectFile('./components/TerminalIntro.tsx'),
      readProjectFile('./components/Projects.tsx'),
      readProjectFile('./components/FeaturedProjects.tsx'),
      readProjectFile('./components/SectionHeading.tsx'),
      readProjectFile('./components/SiteHeader.tsx'),
      readProjectFile('./constants.tsx'),
    ].join('\n');

    for (const removedPhrase of [
      '让质量成为系统能力',
      '让每一次交付都值得信赖',
      '让软件交付更放心',
      '完整交付链路',
      '可持续迭代',
    ]) {
      expect(pageCopy).not.toContain(removedPhrase);
    }

    expect(pageCopy).toContain('在复杂的系统里');
    expect(pageCopy).toContain('测试可靠性');
    expect(pageCopy).toContain('浮生闲趣');
    expect(pageCopy).toContain('whoami');
    expect(pageCopy).toContain('测试工程师 / 独立开发者');
    expect(pageCopy).toContain('浮生闲记 · 把闲趣写进日常');
    expect(pageCopy).toContain("label: '关于我'");
    for (const requiredCopy of [
      '专业能力',
      '开源项目',
      '最近博客',
      'ABOUT ME',
      'Capabilities',
      'Open source projects',
      'Recent posts',
    ]) {
      expect(pageCopy).toContain(requiredCopy);
    }
  });
});
