---
title: "VitePress 使用技巧"
date: 2026-04-16
description: "分享一些 VitePress 的使用技巧和最佳实践"
---

# VitePress 使用技巧

## 自定义主题

VitePress 支持深度定制主题。通过创建 `.vitepress/theme/index.ts` 可以扩展默认主题。

## Markdown 扩展

VitePress 在标准 Markdown 基础上扩展了很多功能：

### 代码块高亮

```javascript
const hello = 'world';
console.log(hello);
```

### 自定义容器

::: info
这是一个信息框
:::

::: warning
这是一个警告框
:::

## 部署

VitePress 构建后输出到 `.vitepress/dist` 目录，可以直接部署到 Vercel、Netlify 或 GitHub Pages。
