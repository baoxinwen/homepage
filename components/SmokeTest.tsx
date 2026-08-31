import React, { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import {
  getSmokeSteps,
  subscribeSmokeSteps,
  type SmokeStep,
} from '../lib/smoke';

const blogLink = SOCIAL_LINKS.find((link) => link.primary);

const SmokeTest: React.FC = () => {
  const [snapshot, setSnapshot] = useState<SmokeStep[]>(getSmokeSteps);

  useEffect(() => subscribeSmokeSteps(setSnapshot), []);

  // 自检数据只属于开发者：生产环境不渲染任何可见痕迹，里程碑仍由 lib/smoke 汇报
  if (!import.meta.env.DEV) return null;

  const allSettled = snapshot.every((step) => step.status !== 'pending');

  return (
    <div
      className={`smoke-strip${allSettled ? ' smoke-strip--done' : ''}`}
      role="status"
      aria-label="页面自检"
    >
      <span className="smoke-strip-label" aria-hidden="true">SMOKE TEST</span>
      {snapshot.map((step) => (
        <span key={step.name} className={`smoke-step smoke-step--${step.status}`}>
          <b aria-hidden="true">{step.status === 'fail' ? '✗' : step.status === 'ok' ? '✓' : '○'}</b>
          {step.name}
          {step.status === 'ok' && step.ms !== undefined && <i>{step.ms}MS</i>}
          {step.name === 'RSS' && step.status === 'fail' && blogLink && (
            <a href={blogLink.url} target="_blank" rel="noopener noreferrer">前往博客</a>
          )}
        </span>
      ))}
    </div>
  );
};

export default React.memo(SmokeTest);
