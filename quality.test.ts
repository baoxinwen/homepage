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

const getRootVariable = (css: string, name: string): string => {
  const rootBlock = css.match(/:root\s*{([\s\S]*?)}/)?.[1] ?? '';
  const value = rootBlock.match(new RegExp(`--${name}:\\s*(#[a-f\\d]{6})`, 'i'))?.[1];
  if (!value) throw new Error(`Missing CSS variable: ${name}`);
  return value;
};

describe('accessibility and security contracts', () => {
  it('keeps small accent text above WCAG AA contrast', () => {
    const css = readProjectFile('./styles.css');
    const accentText = getRootVariable(css, 'accent-text');
    const canvas = getRootVariable(css, 'canvas');
    const surface = getRootVariable(css, 'surface');
    const accentContrast = getRootVariable(css, 'accent-contrast');
    expect(contrast(accentText, canvas)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(accentText, surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(accentContrast, accentText)).toBeGreaterThanOrEqual(4.5);
  });

  it('does not require inline style permissions', () => {
    const html = readProjectFile('./index.html');
    const entry = readProjectFile('./index.tsx');
    const components = [
      readProjectFile('./components/Hero.tsx'),
      readProjectFile('./components/FeaturedProjects.tsx'),
    ].join('\n');
    expect(html).not.toContain("'unsafe-inline'");
    expect(html).toContain('<link rel="stylesheet" href="/styles.css" />');
    expect(entry).not.toMatch(/import\s+['"]\.\/styles\.css['"]/);
    expect(components).not.toMatch(/\sstyle=/);
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

describe('visible copy', () => {
  it('keeps the page concise without changing the articles description', () => {
    const pageCopy = [
      readProjectFile('./App.tsx'),
      readProjectFile('./components/Hero.tsx'),
      readProjectFile('./components/Projects.tsx'),
      readProjectFile('./components/FeaturedProjects.tsx'),
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

    expect(pageCopy).toContain('也承担版本发布前的集中测试。');
    expect(pageCopy).toContain('使用 Jira、禅道和飞书跟进需求、缺陷与版本进度。');
    expect(pageCopy).toContain('记录工程实践、工具开发，也记录生活中值得反复回看的片段。');
    expect(pageCopy).toContain("label: '关于我'");
    expect(pageCopy).toContain("title=\"专业能力\"");
    expect(pageCopy).toContain('>开源项目</h2>');
    expect(pageCopy).toContain('title="最近博客"');
    expect(pageCopy).toContain('>ABOUT ME</span>');
    expect(pageCopy).toContain('label="Capabilities"');
    expect(pageCopy).toContain('>Open source projects</span>');
    expect(pageCopy).toContain('label="Recent posts"');
    expect(pageCopy).toContain('>TESTING / TOOLING</span>');
  });
});
