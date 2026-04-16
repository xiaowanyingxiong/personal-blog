---
title: Vue 3 Composition API 实战指南
date: 2026-04-15
description: 深入理解 Vue 3 Composition API 的设计理念与最佳实践，从入门到精通
---

# Vue 3 Composition API 实战指南

Vue 3 引入了 Composition API，这是一次革命性的更新。本文将深入探讨其设计理念、核心用法与最佳实践。

## 为什么需要 Composition API？

在 Vue 2 中，我们使用 Options API 来组织组件逻辑。随着组件复杂度增加，相关逻辑可能散落在 `data`、`methods`、`computed`、`watch` 中，导致代码难以维护。

## setup 函数：Composition API 的入口

```javascript
import { ref, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubled = computed(() => count.value * 2)
    const increment = () => count.value++
    onMounted(() => console.log('mounted'))
    return { count, doubled, increment }
  }
}
```

## 响应式系统

### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

// ref 用于基本类型
const count = ref(0)

// reactive 用于对象
const state = reactive({ name: 'John' })
```

## 组合式函数（Composables）

Composition API 最大的优势是逻辑复用：

```javascript
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const double = computed(() => count.value * 2)
  const increment = () => count.value++
  return { count, double, increment }
}
```

## 最佳实践

1. **逻辑聚合**：将相关逻辑组织在一起
2. **命名规范**：组合式函数以 `use` 开头
3. **类型支持**：充分利用 TypeScript

::: info
想要深入学习？推荐查看 [Vue 3 官方文档](https://vuejs.org/guide/extras/composition-api-faq.html)
:::
