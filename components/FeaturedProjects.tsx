import React from 'react';
import { FEATURED_PROJECTS, Icons } from '../constants';
import SectionHeading from './SectionHeading';
import type { FeaturedProject, ProjectVisual as ProjectVisualType } from '../types';

const sizeStyles: Record<FeaturedProject['size'], string> = {
  lead: 'project-card--lead',
  support: 'project-card--support',
  compact: 'project-card--compact',
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
      <WindowBar label="JUL / OVERVIEW" />
      <div className="ledger-layout">
        <small>本月结余</small>
        <strong>¥ 8,420</strong>
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
      <WindowBar label="CopyTree.exe" />
      <div className="tree-lines">
        <p><b>●</b> my-project/</p>
        <p><span>└──</span> src/</p>
        <p>README.md <em>✓ copied</em></p>
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

const TrendVisual: React.FC = () => (
  <div className="project-visual project-visual--trend" data-print-hidden="true">
    <div className="trend-summary">
      <span>LIVE PULSE</span>
      <strong>48 sources</strong>
    </div>
    <div className="trend-chart">
      <span>TREND <b>+28%</b></span>
      <svg viewBox="0 0 160 80" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="trend-area" d="M0 67L20 61L40 66L60 38L80 48L100 22L120 34L140 11L160 18V80H0Z" />
        <path className="trend-line" d="M0 67L20 61L40 66L60 38L80 48L100 22L120 34L140 11L160 18" />
      </svg>
    </div>
  </div>
);

const visualComponents: Record<ProjectVisualType, React.FC> = {
  meme: MemeVisual,
  ledger: LedgerVisual,
  tree: TreeVisual,
  map: MapVisual,
  trend: TrendVisual,
};

const ProjectVisual: React.FC<{ visual: ProjectVisualType }> = ({ visual }) => {
  const Visual = visualComponents[visual];
  return <Visual />;
};

const FeaturedProjects: React.FC = () => (
  <section id="projects" className="projects-section" aria-labelledby="featured-projects-title">
    <SectionHeading
      index="03"
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
      {FEATURED_PROJECTS.map((project, index) => (
        <article key={project.name} className={`project-card ${sizeStyles[project.size]}`}>
          <ProjectVisual visual={project.visual} />

          <div className="project-content">
            <div className="project-meta">
              <span><i />{project.category}</span>
              <span>
                {String(index + 1).padStart(2, '0')} / {String(FEATURED_PROJECTS.length).padStart(2, '0')}
              </span>
            </div>

            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-stack" aria-label={`${project.name} 技术栈`}>
              {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>

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
