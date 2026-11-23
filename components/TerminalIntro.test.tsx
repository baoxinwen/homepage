import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import TerminalIntro from './TerminalIntro';
import { FEATURED_PROJECTS } from '../constants';

// M-2 回归守卫：终端独白的无障碍替代文本必须覆盖 FEATURED_PROJECTS 全部项目。
// 该清单从 5 项增长到 7 项时 sr-only 文案未同步（评审 M-2），
// 本测试钉住“替代文本 = 项目清单”这一契约。

const originalMatchMedia = window.matchMedia;

beforeAll(() => {
  (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;
  // reduced-motion 路径一次性呈现全文，测试无需驱动打字计时器
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }) as unknown as typeof window.matchMedia;
});

afterAll(() => {
  window.matchMedia = originalMatchMedia;
});

describe('TerminalIntro accessibility copy', () => {
  it('lists every featured project in the sr-only narration', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    let root: Root | undefined;
    await act(async () => {
      root = createRoot(container);
      root.render(<TerminalIntro />);
    });
    try {
      const narration = container.querySelector('.sr-only')?.textContent ?? '';
      for (const project of FEATURED_PROJECTS) {
        expect(
          narration,
          `sr-only 独白缺少项目：${project.name}`,
        ).toContain(project.name);
      }
      // 可视输出保持“前三个 + +N”单行汇总，N 必须与清单同步
      expect(container.textContent).toContain(
        `${FEATURED_PROJECTS.slice(0, 3).map((project) => project.name).join(' ')} +${FEATURED_PROJECTS.length - 3}`,
      );
    } finally {
      if (root) {
        await act(async () => {
          root?.unmount();
        });
      }
      container.remove();
    }
  });
});
