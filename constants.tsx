import React from 'react';
import type { FeaturedProject, SocialLink } from './types';

// Icons using simple SVG paths
export const Icons = {
  Github: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  Sun: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Code: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Server: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  Cpu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Users: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
};

export const TECH_GROUPS = [
  {
    title: '编程开发',
    icon: <Icons.Code className="capability-svg" />,
    desc: '写测试、造工具的母语，从数据处理脚本到小型 Web 服务。',
    skills: ['Python', 'MySQL', 'Pytest', 'Requests']
  },
  {
    title: '自动化',
    icon: <Icons.Cpu className="capability-svg" />,
    desc: '把重复回归交给机器，覆盖 UI、接口与性能三类场景。',
    skills: ['Selenium', 'Appium', 'JMeter', 'Postman']
  },
  {
    title: '运维工具',
    icon: <Icons.Server className="capability-svg" />,
    desc: '让服务稳定跑起来的日常：镜像、进程与流水线。',
    skills: ['Docker', 'Linux', 'Jenkins', 'Git']
  },
  {
    title: '协作平台',
    icon: <Icons.Users className="capability-svg" />,
    desc: '在团队节奏里完成需求拆解、缺陷跟踪与知识沉淀。',
    skills: ['Jira', '禅道', '飞书']
  }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    name: 'meme-maker',
    category: '浏览器创作工具',
    description: '纯浏览器端的表情包生成器：选模板、上传头像、加文字，一键导出 PNG/GIF，图片不上传服务器。',
    stack: ['React', 'TypeScript', 'PWA'],
    repoUrl: 'https://github.com/baoxinwen/meme-maker',
    secondaryLink: {
      label: '在线体验',
      url: 'https://meme.baoxinwen.top'
    },
    visual: 'meme',
    size: 'lead'
  },
  {
    name: 'renovation-expenses',
    category: '装修专项账本',
    description: '清单式预算、定金尾款与票据留存的装修记账，数据 100% 本地自托管。',
    stack: ['React', 'Fastify', 'SQLite', 'Docker'],
    repoUrl: 'https://github.com/baoxinwen/renovation-expenses',
    secondaryLink: {
      label: '下载最新版',
      url: 'https://github.com/baoxinwen/renovation-expenses/releases/latest'
    },
    visual: 'ledger',
    size: 'support'
  },
  {
    name: 'copy-tree',
    category: 'Windows 效率工具',
    description: '右键一键把目录树复制为文本、Markdown、JSON 等 7 种格式。',
    stack: ['Python', 'ctypes', 'PyInstaller'],
    repoUrl: 'https://github.com/baoxinwen/copy-tree',
    secondaryLink: {
      label: '下载最新版',
      url: 'https://github.com/baoxinwen/copy-tree/releases/latest'
    },
    visual: 'tree',
    size: 'compact'
  },
  {
    name: 'footprint',
    category: '旅行足迹地图',
    description: '地图、路线与游记记录每一次旅行。',
    stack: ['Vue 3', 'FastAPI', '高德地图'],
    repoUrl: 'https://github.com/baoxinwen/footprint',
    secondaryLink: {
      label: '在线体验',
      url: 'https://map.baoxinwen.top'
    },
    visual: 'map',
    size: 'compact'
  },
  {
    name: 'idle-fish',
    category: '报价经营工具',
    description: '铝型材机柜报价器：报价、订单、3D 预览与经营统计，PWA 单用户自部署。',
    stack: ['React', 'Three.js', 'Express', 'Docker'],
    repoUrl: 'https://github.com/baoxinwen/idle-fish',
    secondaryLink: {
      label: '下载最新版',
      url: 'https://github.com/baoxinwen/idle-fish/releases/latest'
    },
    visual: 'quote',
    size: 'compact'
  },
  {
    name: 'prompt-tool',
    category: '桌面效率工具',
    description: '本地优先的桌面提示词助手：全局热键呼出、剪贴板历史与云同步。',
    stack: ['Rust', 'Tauri 2', 'Vue 3'],
    repoUrl: 'https://github.com/baoxinwen/prompt-tool',
    secondaryLink: {
      label: '下载最新版',
      url: 'https://github.com/baoxinwen/prompt-tool/releases/latest'
    },
    visual: 'prompt',
    size: 'wide'
  },
  {
    name: 'home-stock',
    category: '家庭自托管应用',
    description: '家庭库存助手：开封与临期提醒、购物清单转库存、浪费统计与备份恢复。',
    stack: ['Vue 3', 'NestJS', 'SQLite', 'Docker'],
    repoUrl: 'https://github.com/baoxinwen/home-stock',
    secondaryLink: {
      label: '下载最新版',
      url: 'https://github.com/baoxinwen/home-stock/releases/latest'
    },
    visual: 'stock',
    size: 'wide'
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
