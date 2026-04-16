import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'main',
  clientId: 'your-tina-cloud-client-id',
  token: 'your-tina-cloud-token',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public'
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public'
    }
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: '博客文章',
        path: 'content/blog',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: '标题',
            required: true
          },
          {
            type: 'datetime',
            name: 'date',
            label: '发布日期'
          },
          {
            type: 'string',
            name: 'description',
            label: '描述',
            ui: { component: 'textarea' }
          },
          {
            type: 'rich-text',
            name: 'body',
            label: '正文',
            isBody: true
          }
        ]
      },
      {
        name: 'projects',
        label: '作品',
        path: 'content/projects',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: '标题',
            required: true
          },
          {
            type: 'string',
            name: 'description',
            label: '描述',
            ui: { component: 'textarea' }
          },
          {
            type: 'string',
            name: 'techStack',
            label: '技术栈',
            list: true
          },
          {
            type: 'image',
            name: 'screenshots',
            label: '截图',
            list: true
          },
          {
            type: 'string',
            name: 'videoUrl',
            label: '视频链接'
          },
          {
            type: 'string',
            name: 'demoUrl',
            label: '演示链接'
          },
          {
            type: 'string',
            name: 'repoUrl',
            label: '仓库链接'
          }
        ]
      }
    ]
  }
})
