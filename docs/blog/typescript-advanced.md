---
title: TypeScript 高级类型技巧
date: 2026-04-14
description: 掌握 TypeScript 高级类型技巧，让你的代码更加类型安全
---

# TypeScript 高级类型技巧

TypeScript 的类型系统是其最强大的特性之一。本文将介绍一些高级类型技巧，帮助你编写更加健壮的代码。

## 条件类型

条件类型允许我们根据其他类型来推导类型：

```typescript
type ExtractPromise<T> = T extends Promise<infer U> ? U : T;

type A = ExtractPromise<Promise<string>>;  // string
type B = ExtractPromise<number>;          // number
```

## 映射类型

映射类型可以批量转换类型的属性：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型：

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>;  // 'onClick'
type HoverEvent = EventName<'hover'>;  // 'onHover'
```

## 工具类型扩展

实现一个深度只读类型：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};
```

## 联合类型与交叉类型

```typescript
type A = { name: string };
type B = { age: number };

// 联合类型
type Union = A | B;

// 交叉类型
type Intersection = A & B;
```

## infer 关键字

用于在条件类型中推断类型：

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function fetchUser() {
  return { id: 1, name: 'John' };
}

type User = ReturnType<typeof fetchUser>;  // { id: number; name: string; }
```

::: tip 提示
高级类型技巧能让你的代码更加声明式，减少类型断言的使用。
:::
