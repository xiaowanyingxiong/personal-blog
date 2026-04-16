---
title: Vue 3 Composition API 实战指南
date: 2026-04-15
description: 深入理解 Vue 3 Composition API 的设计理念与最佳实践，从入门到精通
---

# Vue 3 Composition API 实战指南

Vue 3 引入了 Composition API，这是一次革命性的更新。本文将深入探讨其设计理念、核心用法与最佳实践。

## 为什么需要 Composition API？

在 Vue 2 中，我们使用 Options API 来组织组件逻辑：

```javascript
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count++ }
  },
  computed: {
    doubled() { return this.count * 2 }
  }
}
```

随着组件复杂度增加，相关逻辑可能散落在 `data`、`methods`、`computed`、`watch` 中，导致代码难以维护。

## setup 函数：Composition API 的入口

`setup` 是 Composition API 的核心，所有逻辑都在这里编写：

```javascript
import { ref, computed, watch, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    const doubled = computed(() => count.value * 2)

    // 方法
    const increment = () => count.value++

    // 监听器
    watch(count, (newVal) => {
      console.log(`count changed to ${newVal}`)
    })

    // 生命周期钩子
    onMounted(() => {
      console.log('Component mounted')
    })

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
console.log(count.value) // 0

// reactive 用于对象
const state = reactive({
  name: 'John',
  age: 30
})
console.log(state.name) // 'John'
```

### 深度响应式

Vue 3 的响应式是深度默认的：

```javascript
const obj = reactive({ nested: { count: 0 } })
obj.nested.count++ // 依然响应式
```

## 组合式函数（Composables）

Composition API 最大的优势是逻辑复用。创建可复用的组合式函数：

```javascript
// useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const double = computed(() => count.value * 2)
  const triple = computed(() => count.value * 3)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    double,
    triple,
    increment,
    decrement,
    reset
  }
}
```

在组件中使用：

```javascript
import { useCounter } from './useCounter'

export default {
  setup() {
    const { count, double, increment } = useCounter(10)
    return { count, double, increment }
  }
}
```

## 依赖注入：跨层级通信

使用 `provide` 和 `inject` 实现跨层级数据共享：

```javascript
// 父组件
import { provide, reactive } from 'vue'

export default {
  setup() {
    const theme = reactive({ mode: 'dark' })
    provide('theme', theme)
  }
}

// 子组件
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme')
    return { theme }
  }
}
```

## 异步组件与 Suspense

Vue 3 原生支持异步组件：

```javascript
const AsyncComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)

export default {
  components: { AsyncComponent }
}
```

配合 `<Suspense>` 使用：

```html
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

## 性能优化技巧

### 1. 使用 `shallowRef`

对于大型数据结构，减少深度响应式的开销：

```javascript
import { shallowRef } from 'vue'

const data = shallowRef({ large: 'structure' })
// 替换内部值时触发更新，但嵌套属性变化不触发
data.value = { new: 'structure' }
```

### 2. `triggerRef` 手动触发更新

```javascript
import { shallowRef, triggerRef } from 'vue'

const data = shallowRef({ count: 0 })

function updateData() {
  data.value.count++
  // 某些情况下需要手动触发
  triggerRef(data)
}
```

## 最佳实践总结

1. **逻辑聚合**：将相关逻辑组织在一起，而不是按选项类型分散
2. **命名规范**：组合式函数以 `use` 开头，如 `useAuth`、`useFetch`
3. **类型支持**：充分利用 TypeScript 的类型推导
4. **避免响应式解构**：不要直接解构 `reactive` 对象
5. **善用工具函数**：使用 `toRefs`、`toRef` 保持响应式

## 延伸阅读

::: info
想要深入学习？推荐查看 [Vue 3 官方文档](https://vuejs.org/guide/extras/composition-api-faq.html)
:::
