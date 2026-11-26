import React from 'react';
import { FEATURED_PROJECTS, Icons } from '../constants';
import SectionHeading from './SectionHeading';
import type { FeaturedProject, ProjectVisual as ProjectVisualType } from '../types';

const sizeStyles: Record<FeaturedProject['size'], string> = {
  lead: 'project-card--lead',
  support: 'project-card--support',
  compact: 'project-card--compact',
  wide: 'project-card--wide',
};

const WindowBar: React.FC<{ label: string }> = ({ label }) => (
  <div className="visual-window-bar">
    <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
    <span>{label}</span>
  </div>
);

const MemeVisual: React.FC = () => (
  <div className="project-visual project-visual--meme" data-print-hidden="true">
    <div className="visual-window meme-window">
      <WindowBar label="LOCAL CANVAS" />
      <div className="meme-preview">
        <span>实时预览 · GIF</span>
        <strong>这就很合理</strong>
        <div aria-hidden="true"><i /><i /><i /><i /></div>
      </div>
    </div>
  </div>
);

const LedgerVisual: React.FC = () => (
  <div className="project-visual project-visual--ledger" data-print-hidden="true">
    <div className="visual-window ledger-window">
      <WindowBar label="RENO / BUDGET" />
      <div className="ledger-layout">
        <small>预算执行</small>
        <strong>¥ 128,600</strong>
        <div className="ledger-bars" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => <i key={index} />)}
        </div>
      </div>
    </div>
  </div>
);

const TreeVisual: React.FC = () => (
  <div className="project-visual project-visual--tree" data-print-hidden="true">
    <div className="tree-terminal">
      <WindowBar label="copy-tree.exe" />
      <div className="tree-lines">
        <p><b>●</b> my-project/</p>
        <p><span>└──</span> src/</p>
        <p>README.md <em>✓ 已复制</em></p>
      </div>
    </div>
  </div>
);

const MapVisual: React.FC = () => (
  <div className="project-visual project-visual--map engineering-grid" data-print-hidden="true">
    <svg viewBox="0 0 360 150" fill="none" aria-hidden="true">
      <path className="map-route-shadow" d="M18 119C65 98 78 35 132 52C180 67 176 119 226 103C270 89 279 42 342 24" />
      <path className="map-route" d="M18 119C65 98 78 35 132 52C180 67 176 119 226 103C270 89 279 42 342 24" />
      <circle className="map-point" cx="18" cy="119" r="6" />
      <circle className="map-point map-point--end" cx="342" cy="24" r="6" />
    </svg>
    <div className="route-card"><span>LATEST ROUTE</span><strong>杭州 → 苏州</strong></div>
  </div>
);

const QuoteVisual: React.FC = () => (
  <div className="project-visual project-visual--quote" data-print-hidden="true">
    <div className="visual-window quote-window">
      <WindowBar label="IDLE-FISH / QUOTE" />
      <div className="quote-preview">
        <p className="quote-line"><span>4040 铝型材 ×12</span><b>¥ 1,680</b></p>
        <p className="quote-line"><span>角件与紧固件</span><b>¥ 260</b></p>
        <p className="quote-line"><span>板材切割加工</span><b>¥ 540</b></p>
        <p className="quote-total"><span>含税合计</span><b>¥ 2,480</b></p>
      </div>
    </div>
  </div>
);

const PromptVisual: React.FC = () => (
  <div className="project-visual project-visual--prompt" data-print-hidden="true">
    <div className="visual-window prompt-window">
      <WindowBar label="PROMPT-TOOL" />
      <div className="prompt-preview">
        <p className="prompt-title">周报生成器</p>
        <div className="prompt-lines" aria-hidden="true"><i /><i /></div>
        <div className="prompt-tags" aria-hidden="true"><span>热键</span><span>剪贴板</span><span>云同步</span></div>
      </div>
    </div>
  </div>
);

const StockVisual: React.FC = () => (
  <div className="project-visual project-visual--stock" data-print-hidden="true">
    <div className="visual-window stock-window">
      <WindowBar label="HOME-STOCK / PANTRY" />
      <div className="stock-preview">
        <p className="stock-line"><span>鲜牛奶 ×2</span><em>3 天后到期</em></p>
        <p className="stock-line"><span>洗衣液</span><em>已开封 45 天</em></p>
        <p className="stock-line stock-line--ok"><span>咖啡豆</span><em>库存充足</em></p>
        <div className="stock-progress" aria-hidden="true"><i /></div>
        <p className="stock-meta">临期提醒 · 购物清单 · 浪费统计</p>
      </div>
    </div>
  </div>
);

const visualComponents: Record<ProjectVisualType, React.FC> = {
  meme: MemeVisual,
  ledger: LedgerVisual,
  tree: TreeVisual,
  map: MapVisual,
  quote: QuoteVisual,
  prompt: PromptVisual,
  stock: StockVisual,
};

const ProjectVisual: React.FC<{ visual: ProjectVisualType }> = ({ visual }) => {
  const Visual = visualComponents[visual];
  return <Visual />;
};

const FeaturedProjects: React.FC = () => (
  <section id="projects" className="projects-section" aria-labelledby="featured-projects-title">
    <SectionHeading
      index="叁"
      label="Open source projects"
      title="开源项目"
      titleId="featured-projects-title"
      action={(
        <a className="text-link" href="https://github.com/baoxinwen?tab=repositories" target="_blank" rel="noopener noreferrer">
          查看全部项目 <Icons.ArrowRight className="inline-icon" />
        </a>
      )}
    />

    <div className="project-grid">
      {FEATURED_PROJECTS.map((project) => (
        <article key={project.name} className={`project-card ${sizeStyles[project.size]}`}>
          <ProjectVisual visual={project.visual} />

          <div className="project-content">
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>

            <p className="project-stack">{project.stack.join(' · ')}</p>

            <div className="project-actions">
              <a
                className="project-source-link"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`在 GitHub 查看 ${project.name} 源码`}
              >
                <Icons.Github className="button-icon" />
                查看源码
              </a>
              {project.secondaryLink && (
                <a
                  className="project-secondary-link"
                  href={project.secondaryLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.secondaryLink.label}：${project.name}`}
                >
                  {project.secondaryLink.label}
                  <Icons.ArrowRight className="inline-icon" />
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default React.memo(FeaturedProjects);
