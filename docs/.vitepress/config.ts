import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '技术随笔',
  description: '全栈开发者的代码人生 - 探索前端工程化、架构设计与工程实践',
  base: '/personal-blog/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/personal-blog/logo.svg' }]
  ],
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/personal-blog/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '作品', link: '/projects/' },
      { text: '关于', link: '/about/' }
    ],
    sidebar: {
      '/blog/': [
        {
          text: '前端开发',
          items: [
            { text: 'Vue 3 Composition API 实战指南', link: '/blog/hello-world' },
            { text: 'React Hooks 最佳实践', link: '/blog/vue3-composition-api' },
            { text: 'TypeScript 高级类型技巧', link: '/blog/typescript-advanced' },
            { text: 'CSS Grid 布局完全指南', link: '/blog/css-grid-layout' },
            { text: 'Webpack 5 模块联邦详解', link: '/blog/webpack-federation' }
          ]
        },
        {
          text: '工程实践',
          items: [
            { text: '前端性能优化完全指南', link: '/blog/performance-optimization' },
            { text: 'Docker 容器化最佳实践', link: '/blog/docker-best-practices' },
            { text: 'Git 高级操作指南', link: '/blog/git-advanced' },
            { text: 'CI/CD 流水线完全指南', link: '/blog/cicd-pipeline' },
            { text: 'Node.js 性能优化指南', link: '/blog/nodejs-performance' }
          ]
        },
        {
          text: '架构设计',
          items: [
            { text: '微服务架构设计实践', link: '/blog/microservices-design' },
            { text: 'REST vs GraphQL', link: '/blog/rest-vs-graphql' },
            { text: 'Redis 性能优化实战', link: '/blog/redis-optimization' },
            { text: '数据库设计与规范化', link: '/blog/database-design' }
          ]
        }
      ],
      '/projects/': [
        {
          text: '作品集',
          items: [
            { text: '示例项目', link: '/projects/demo-project' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
      { icon: 'twitter', link: 'https://twitter.com' }
    ],
    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026 技术随笔'
    }
  }
})
