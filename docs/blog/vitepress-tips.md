---
title: TypeScript 类型体操：从入门到精通
date: 2026-04-14
description: 掌握 TypeScript 高级类型技巧，提升代码的类型安全性和可维护性
---

# TypeScript 类型体操：从入门到精通

TypeScript 的类型系统是图灵完备的，本文探讨实用的类型技巧与最佳实践。

## 泛型：类型参数化

泛型让我们编写可复用的类型安全代码：

```typescript
function identity<T>(arg: T): T {
  return arg
}

const num = identity<number>(42)
const str = identity('hello')
```

## 条件类型

条件类型根据其他类型来决定类型：

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'> // true
type B = IsString<123>     // false
```

## 映射类型

映射类型通过变换现有类型创建新类型：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

## 模板字面量类型

TypeScript 4.1 引入的强力功能：

```typescript
type EventName = 'click' | 'focus' | 'blur'
type Handler = `on${EventName}`
// 'onclick' | 'onfocus' | 'onblur'
```

## 实用类型工具

- `Exclude<T, U>` - 排除类型
- `Extract<T, U>` - 提取类型
- `NonNullable<T>` - 去除 null 和 undefined
- `ReturnType<T>` - 获取函数返回类型
- `Parameters<T>` - 获取函数参数类型

::: warning
类型体操虽好，但不要过度工程化。
:::
