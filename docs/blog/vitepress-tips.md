---
title: TypeScript 类型体操：从入门到精通
date: 2026-04-14
description: 掌握 TypeScript 高级类型技巧，提升代码的类型安全性和可维护性
---

# TypeScript 类型体操：从入门到精通

TypeScript 的类型系统是图灵完备的，这意味着理论上你可以用类型做任意计算。本文探讨实用的类型技巧与最佳实践。

## 基础回顾

TypeScript 的核心是类型注解与类型推导：

```typescript
// 显式注解
let name: string = 'John'

// 类型推导
let age = 25 // number

// 函数类型
function greet(name: string): string {
  return `Hello, ${name}`
}
```

## 泛型：类型参数化

泛型让我们编写可复用的类型安全代码：

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

const num = identity<number>(42)
const str = identity('hello') // 自动推导为 string

// 泛型约束
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length)
  return arg
}

logLength('hello')    // OK
logLength([1, 2, 3])  // OK
logLength(123)        // Error: number 没有 length
```

## 条件类型

条件类型根据其他类型来决定类型：

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'> // true
type B = IsString<123>     // false

// 提取类型的一部分
type ExtractArrayType<T> = T extends (infer U)[] ? U : never

type ItemType = ExtractArrayType<string[]> // string
```

## 映射类型

映射类型通过变换现有类型创建新类型：

```typescript
// 所有属性变为只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 提取特定类型的属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface User {
  id: number
  name: string
  email: string
}

type UserPreview = Pick<User, 'id' | 'name'>
// { id: number; name: string }
```

## 模板字面量类型

TypeScript 4.1 引入的强力功能：

```typescript
type EventName = 'click' | 'focus' | 'blur'
type Handler = `on${EventName}`
// 'onclick' | 'onfocus' | 'onblur'

// 提取路径部分
type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<`/${Rest}`>
    : T extends `${infer _Start}:${infer Param}`
    ? Param
    : never

type Params = ExtractRouteParams<'/users/:id/posts/:postId'>
// 'id' | 'postId'
```

## 递归类型

处理嵌套结构：

```typescript
// 深只读类型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

interface Config {
  db: {
    host: string
    port: number
  }
}

type ReadonlyConfig = DeepReadonly<Config>

// JSON 类型
type JSONPrimitive = string | number | boolean | null
type JSONValue = JSONPrimitive | JSONValue[] | { [key: string]: JSONValue }
type JSONSchema = {
  [key: string]: JSONValue
}
```

## 实用类型工具

### Exclude 和 Extract

```typescript
type T = 'a' | 'b' | 'c'

type ExcludeT = Exclude<T, 'a'>        // 'b' | 'c'
type ExtractT = Extract<T, 'a' | 'b'>  // 'a' | 'b'
```

### NonNullable

```typescript
type T = string | null | undefined
type NonNull = NonNullable<T> // string
```

### ReturnType 和 Parameters

```typescript
function greet(name: string, age: number): string {
  return `${name}, ${age}`
}

type GreetParams = Parameters<typeof greet>
// [name: string, age: number]

type GreetReturn = ReturnType<typeof greet>
// string
```

## 实战：类型安全的 API 客户端

```typescript
// 定义 API 端点
interface Endpoints {
  '/users': { response: User[] }
  '/users/:id': { params: { id: string }; response: User }
  '/posts': { body: CreatePostDto; response: Post }
}

type EndpointMethod = 'get' | 'post' | 'put' | 'delete'

// 类型安全的客户端
function createApiClient<T extends Endpoints> {
  return async function request<K extends keyof T>(
    endpoint: K,
    options?: RequestOptions<T[K]>
  ): Promise<T[K]['response']> {
    const url = buildUrl(endpoint, options?.params)
    return fetch(url, {
      method: getMethod(endpoint),
      body: JSON.stringify(options?.body)
    }).then(r => r.json())
  }
}

// 使用
const api = createApiClient<Endpoints>()

const users = await api('/users') // User[]
const user = await api('/users/:id', { params: { id: '123' } }) // User
```

## 常见陷阱与避坑

### any 类型的滥用

```typescript
// 避免
function process(data: any): any {
  return data.foo.bar // 没有类型检查
}

// 推荐
function process<T>(data: T): T extends { foo: { bar: infer U } } ? U : never {
  return data.foo.bar
}
```

### 双重断言

```typescript
const value = 'hello' as unknown as number // 避免这样做
```

### 函数重载的顺序

```typescript
// 更具体的在前
function overloads(val: string): string
function overloads(val: number): number
function overloads(val: string | number): string | number
```

## 工具库推荐

- [type-fest](https://github.com/sindresorhus/type-fest) - 实用的类型工具
- [ts-essentials](https://github.com/ts-essentials/ts-essentials) - TypeScript 基础类型集合
- [Zod](https://github.com/colinhacks/zod) - 类型验证

::: warning
类型体操虽好，但不要过度工程化。类型的可读性和维护性同样重要。
:::
