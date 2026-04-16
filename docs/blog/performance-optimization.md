---
title: 前端性能优化完全指南
date: 2026-04-13
description: 从加载性能到渲染性能，系统性提升 Web 应用性能的最佳实践
---

# 前端性能优化完全指南

性能是用户体验的核心。本文系统性地介绍前端性能优化的策略与实践。

## 指标体系：Core Web Vitals

| 指标 | 目标 | 说明 |
|------|------|------|
| LCP | < 2.5s | 最大内容绘制 |
| FID | < 100ms | 首次输入延迟 |
| CLS | < 0.1 | 累计布局偏移 |

## 加载性能优化

### 1. 代码分割与懒加载

```javascript
const Home = () => import('./Home.vue')
const HeavyChart = defineAsyncComponent(() => import('./HeavyChart.vue'))
```

### 2. Tree Shaking

确保使用 ES Module 和正确的导入方式：

```javascript
// 按名导入（可以 tree shake）
import { debounce } from 'lodash'
```

### 3. 资源压缩与优化

使用现代图片格式（WebP、AVIF）和代码压缩工具。

## 渲染性能优化

### 1. 避免布局抖动（Layout Thrashing）

```javascript
// 糟糕
elements.forEach(el => {
  const height = el.offsetHeight
  el.style.height = (height * 2) + 'px'
})

// 优化：分离读写
const heights = elements.map(el => el.offsetHeight)
elements.forEach((el, i) => {
  el.style.height = (heights[i] * 2) + 'px'
})
```

### 2. will-change 提示

```css
.animated-element {
  will-change: transform;
  transform: translateZ(0);
}
```

## JavaScript 执行优化

### 防抖与节流

```javascript
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
```

::: info
推荐工具：Chrome DevTools Lighthouse、WebPageTest
:::
