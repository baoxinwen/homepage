import React from 'react';
import type { FeaturedProject, SocialLink } from './types';

// Icons using simple SVG paths
export const Icons = {
  Github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  Sun: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Code: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Server: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  Cpu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
};

export const TECH_GROUPS = [
  {
    title: '编程开发',
    icon: <Icons.Code className="capability-svg" />,
    description: '编写可维护的测试工具、接口脚本与数据处理程序。',
    skills: ['Python', 'MySQL', 'Pytest', 'Requests']
  },
  {
    title: '自动化',
    icon: <Icons.Cpu className="capability-svg" />,
    description: '覆盖 Web、移动端与接口链路的自动化验证。',
    skills: ['Selenium', 'Appium', 'JMeter', 'Postman']
  },
  {
    title: '运维工具',
    icon: <Icons.Server className="capability-svg" />,
    description: '让测试任务能够稳定部署、持续运行并快速回溯。',
    skills: ['Docker', 'Linux', 'Jenkins', 'Git']
  },
  {
    title: '协作平台',
    icon: <Icons.Users className="capability-svg" />,
    description: '使用 Jira、禅道和飞书跟进需求、缺陷与版本进度。',
    skills: ['Jira', '禅道', '飞书']
  }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: 'MemeMaker',
    category: '浏览器创作工具',
    description: '完全在浏览器中运行的表情包制作工具，支持 PNG/GIF、模板编辑和 PWA，素材始终留在本地。',
    stack: ['React', 'TypeScript', 'Fabric.js', 'PWA'],
    repoUrl: 'https://github.com/baoxinwen/MemeMaker',
    secondaryLink: {
      label: '在线体验',
      url: 'https://meme.baoxinwen.top'
    },
    visual: 'meme',
    size: 'lead'
  },
  {
    name: 'Ledger',
    category: '本地优先账本',
    description: '中文个人记账应用，覆盖账单导入、统计分析、预算管理和 Docker 自部署。',
    stack: ['React', 'Express', 'SQLite', 'Docker'],
    repoUrl: 'https://github.com/baoxinwen/Ledger',
    secondaryLink: {
      label: '在线体验',
      url: 'https://ledger.baoxinwen.top'
    },
    visual: 'ledger',
    size: 'support'
  },
  {
    name: 'CopyTree',
    category: 'Windows 效率工具',
    description: '将文件夹目录树一键复制为文本、Markdown 或 JSON，并集成 Windows 右键菜单。',
    stack: ['Python', 'Windows', 'ctypes', 'PyInstaller'],
    repoUrl: 'https://github.com/baoxinwen/CopyTree',
    secondaryLink: {
      label: '下载最新版',
      url: 'https://github.com/baoxinwen/CopyTree/releases/latest'
    },
    visual: 'tree',
    size: 'compact'
  },
  {
    name: 'footprint',
    category: '旅行足迹地图',
    description: '通过地图、路线、照片和 Markdown 游记记录旅行，支持时间线、统计与分享。',
    stack: ['Vue 3', 'FastAPI', 'SQLite', '高德地图'],
    repoUrl: 'https://github.com/baoxinwen/footprint',
    secondaryLink: {
      label: '在线体验',
      url: 'https://map.baoxinwen.top'
    },
    visual: 'map',
    size: 'compact'
  },
  {
    name: 'hotsearch-monitor',
    category: '热搜监控平台',
    description: '聚合 40+ 中文平台热搜，提供关键词过滤、趋势分析、历史快照和邮件/Webhook 推送。',
    stack: ['React', 'FastAPI', 'Python', 'Docker'],
    repoUrl: 'https://github.com/baoxinwen/hotsearch-monitor',
    secondaryLink: {
      label: '在线体验',
      url: 'https://hot.baoxinwen.top'
    },
    visual: 'trend',
    size: 'compact'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'xsfly.com',
    url: 'https://xsfly.com',
    description: '我的技术博客',
    primary: true
  },
  {
    name: 'GitHub',
    url: 'https://github.com/baoxinwen',
    description: '开源项目 & 贡献'
  },
  {
    name: 'Email',
    url: 'mailto:baoxinwen_personal@163.com',
    description: '商业合作'
  }
];
