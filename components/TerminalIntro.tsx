import React, { useEffect, useState } from 'react';
import { FEATURED_PROJECTS } from '../constants';

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

const PROJECT_NAMES = FEATURED_PROJECTS.map((project) => project.name);

/* 命令逐字敲（30ms 步进，单字 90ms 晕开），输出整行浮现（同样 90ms 晕开） */
const LINES = [
  { cmd: 'whoami', out: '测试工程师 / 独立开发者' },
  // 可视输出保持单行宽度（前三个 + 其余数量）；完整清单由下方 sr-only
  // 段落提供给屏幕阅读器，两处均从 FEATURED_PROJECTS 派生，不再各自硬编码
  { cmd: 'ls ~/projects', out: `${PROJECT_NAMES.slice(0, 3).join(' ')} +${PROJECT_NAMES.length - 3}` },
  { cmd: 'echo $HOME', out: '32.0983 N · 118.2732 E' },
  { cmd: 'cat /life.txt', out: '浮生闲记 · 把闲趣写进日常' },
];

/* 纯偏移量推导：每行命令的可见切片与完成状态，无渲染期突变 */
const OFFSETS = LINES.reduce<number[]>(
  (acc, line) => [...acc, acc[acc.length - 1] + line.cmd.length],
  [0],
);
const TOTAL_CMD_CHARS = OFFSETS[OFFSETS.length - 1];

export default function TerminalIntro(): React.ReactElement {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(0);

  // 渲染期派生：reduced-motion 直接呈现完整文本
  const visible = reduced ? TOTAL_CMD_CHARS : Math.min(typed, TOTAL_CMD_CHARS);

  useEffect(() => {
    if (reduced || visible >= TOTAL_CMD_CHARS) return undefined;
    // 30ms 步进配合 90ms 的单字晕开（styles.css），相邻字符错开 30ms 起笔；
    // 每 9 个字符插入一次稍长的停顿，模拟真人敲击节奏
    const delay = visible % 9 === 8 ? 240 : 30;
    const timer = window.setTimeout(() => setTyped((n) => n + 1), delay);
    return () => window.clearTimeout(timer);
  }, [visible, reduced]);

  const rows = LINES.map((line, index) => {
    const start = OFFSETS[index];
    const end = start + line.cmd.length;
    const take = Math.min(Math.max(visible - start, 0), line.cmd.length);
    return {
      cmdVisible: line.cmd.slice(0, take),
      commandDone: visible >= end,
      out: line.out,
    };
  });
  const finished = visible >= TOTAL_CMD_CHARS;

  return (
    <div className="terminal-wrap">
      {/* 完整文本始终对屏幕阅读器可见，动画仅是视觉层 */}
      <p className="sr-only">
        {`测试工程师 / 独立开发者。开源项目：${PROJECT_NAMES.join('、')}。`}
        家在北纬 32.0983 度，东经 118.2732 度。浮生闲记 · 把闲趣写进日常。
      </p>
      <div className="ink-window-head" aria-hidden="true">
        <span>闲记 · 自述</span>
        <b>SH/01</b>
      </div>
      <div className="terminal-intro">
        {rows.map((row, index) => (
          <p key={index} className="ti-row">
            <span className="ti-prompt">$&nbsp;</span>
            {/* 逐字 span 承载晕开动画：切片只增不减，新字符挂载即起笔，旧字符不重播 */}
            {row.cmdVisible.split('').map((char, charIndex) => (
              <span key={charIndex} className="ti-char">{char}</span>
            ))}
            {row.commandDone && (
              <>
                <br />
                <span className="ti-out">{`> ${row.out}`}</span>
              </>
            )}
          </p>
        ))}
        <p className="ti-row" aria-hidden="true">
          <span className="ti-prompt">$&nbsp;</span>
          <i className={`ti-cursor${finished ? ' ti-cursor--idle' : ''}`} />
        </p>
      </div>
    </div>
  );
}
