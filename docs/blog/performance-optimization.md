---
title: 前端性能优化完全指南
date: 2026-04-13
description: 从加载性能到渲染性能，系统性提升 Web 应用性能的最佳实践
---

# 前端性能优化完全指南

性能是用户体验的核心。本文系统性地介绍前端性能优化的策略与实践。

## 指标体系：Core Web Vitals

Google 推出的核心指标：

| 指标 | 目标 | 说明 |
|------|------|------|
| LCP | < 2.5s | 最大内容绘制 |
| FID | < 100ms | 首次输入延迟 |
| CLS | < 0.1 | 累计布局偏移 |

## 加载性能优化

### 1. 代码分割与懒加载

```javascript
// 路由懒加载
const Home = () => import('./Home.vue')
const About = () => import('./About.vue')

// 组件懒加载
const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
)

// 条件加载
if (isMobile) {
  const MobileUI = await import('./MobileUI.js')
}
```

### 2. Tree Shaking

确保使用 ES Module 和正确的导入方式：

```javascript
// 正确：导入整个模块（无法 tree shake）
import _ from 'lodash'

// 正确：按名导入（可以 tree shake）
import { debounce } from 'lodash'

// 最佳：直接导入函数
import debounce from 'lodash/debounce'
```

### 3. 资源压缩与优化

```bash
# 图片压缩
imagemin src/images/* --out-dir dist/images

# 代码压缩
terser dist/bundle.js --compress --mangle
```

### 4. 缓存策略

```javascript
// webpack 配置持久化缓存
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
}
```

## 图片优化

### 响应式图片

```html
<img
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
  src="medium.jpg"
  alt="响应式图片"
/>
```

### 现代格式

```html
<picture>
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="降级处理">
</picture>
```

### 懒加载

```javascript
// 原生懒加载
<img loading="lazy" src="image.jpg" alt="">

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
})
```

## 渲染性能优化

### 1. 避免布局抖动（Layout Thrashing）

```javascript
// 糟糕：多次读取触发多次布局
elements.forEach(el => {
  const height = el.offsetHeight // 触发布局
  el.style.height = (height * 2) + 'px'
})

// 优化：分离读写
const heights = elements.map(el => el.offsetHeight) // 批量读
elements.forEach((el, i) => {
  el.style.height = (heights[i] * 2) + 'px' // 批量写
})
```

### 2. 使用 CSS contain

```css
.card {
  contain: content; /* 隔离计算 */
}

.widget {
  contain: strict; /* 完全隔离 */
}
```

### 3. will-change 提示

```css
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* 强制创建合成层 */
}
```

### 4. 虚拟列表

```javascript
class VirtualList {
  constructor(container, items, itemHeight) {
    this.container = container
    this.items = items
    this.itemHeight = itemHeight
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight)
  }

  render() {
    const scrollTop = this.container.scrollTop
    const startIndex = Math.floor(scrollTop / this.itemHeight)
    const endIndex = startIndex + this.visibleCount + 1

    const visibleItems = this.items.slice(startIndex, endIndex)
    const offsetY = startIndex * this.itemHeight

    // 只渲染可见项
    this.renderItems(visibleItems, offsetY)
  }
}
```

## JavaScript 执行优化

### 防抖与节流

```javascript
// 防抖：最后一次调用后执行
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 节流：固定间隔执行
function throttle(fn, limit) {
  let inThrottle = false
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// 使用
window.addEventListener('resize', debounce(handleResize, 200))
window.addEventListener('scroll', throttle(handleScroll, 100))
```

### Web Worker

```javascript
// worker.js
self.onmessage = function(e) {
  const result = heavyComputation(e.data)
  self.postMessage(result)
}

// main.js
const worker = new Worker('worker.js')
worker.postMessage(largeDataSet)
worker.onmessage = function(e) {
  processResult(e.data)
}
```

### requestAnimationFrame

```javascript
function animate(element, targetValue) {
  let current = parseFloat(getComputedStyle(element).opacity)

  function step() {
    if (current < targetValue) {
      current += 0.01
      element.style.opacity = current
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
```

## 内存管理

### 避免内存泄漏

```javascript
// 事件监听器的清理
class Component {
  constructor() {
    this.handler = this.onClick.bind(this)
    window.addEventListener('resize', this.handler)
  }

  destroy() {
    window.removeEventListener('resize', this.handler)
    // 清理其他引用
    this.data = null
  }
}

// 定时器的清理
const timer = setInterval(() => {}, 1000)
clearInterval(timer)

// 闭包注意
function bad() {
  const largeData = new Array(1000000)
  return function() {
    return largeData[0] // 闭包导致 largeData 无法回收
  }
}
```

## 性能监控

### Performance API

```javascript
const perf = performance.now()

// 标记
performance.mark('task-start')
performHeavyTask()
performance.mark('task-end')
performance.measure('task', 'task-start', 'task-end')

// 获取长任务
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (entry.duration > 50) {
      console.warn('Long task detected:', entry.duration)
    }
  })
})
observer.observe({ entryTypes: ['longtask'] })
```

## 总结

性能优化是持续的工作：

1. **测量优先**：用工具发现问题，不要猜测
2. **渐进增强**：先基础优化，再高级优化
3. **用户体验**：优化指标最终服务于用户感受
4. **监控迭代**：上线后持续监控，及时发现回归

::: info
推荐工具：Chrome DevTools Lighthouse、WebPageTest、Chrome Performance Monitor
:::
