export type SmokeStepName = 'THEME' | 'RENDER' | 'RSS';

export type StepStatus = 'pending' | 'ok' | 'fail';

export interface SmokeStep {
  name: SmokeStepName;
  status: StepStatus;
  ms?: number;
}

// 模块加载即计时起点：冒烟测试条展示的是真实启动耗时
const START = typeof performance !== 'undefined' ? performance.now() : 0;

const steps: Record<SmokeStepName, SmokeStep> = {
  THEME: { name: 'THEME', status: 'pending' },
  RENDER: { name: 'RENDER', status: 'pending' },
  RSS: { name: 'RSS', status: 'pending' },
};

type Listener = (snapshot: SmokeStep[]) => void;

const listeners = new Set<Listener>();

const publish = (): void => {
  const snapshot = Object.values(steps);
  listeners.forEach((listener) => listener(snapshot));
};

// 各区块在自身真实里程碑完成时上报；重复上报幂等（StrictMode 安全）
export const markMilestone = (name: SmokeStepName, status: 'ok' | 'fail' = 'ok'): void => {
  if (steps[name].status !== 'pending') return;
  steps[name] = {
    name,
    status,
    ms: Math.round(performance.now() - START),
  };
  publish();
};

export const getSmokeSteps = (): SmokeStep[] => Object.values(steps);

export const subscribeSmokeSteps = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
