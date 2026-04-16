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
          text: '技术文章',
          items: [
            { text: 'Vue 3 Composition API 实战指南', link: '/blog/hello-world' },
            { text: 'TypeScript 类型体操', link: '/blog/vitepress-tips' },
            { text: '前端性能优化完全指南', link: '/blog/performance-optimization' }
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
