---
title: REST vs GraphQL：API 设计对比
date: 2026-04-11
description: 深入对比 REST 和 GraphQL 两种 API 设计风格
---

# REST vs GraphQL：API 设计对比

选择正确的 API 设计风格对项目至关重要。本文对比 REST 和 GraphQL 两种主流方案。

## REST API 特点

### 资源导向

```javascript
// REST API 端点设计
GET    /api/users          // 获取用户列表
GET    /api/users/:id      // 获取单个用户
POST   /api/users          // 创建用户
PUT    /api/users/:id      // 更新用户
DELETE /api/users/:id      // 删除用户
```

### 优点

- 语义清晰，易于理解
- HTTP 缓存友好
- 无状态设计，利于扩展
- 成熟度高，工具生态完善

### 缺点

- 过度获取或获取不足
- 多个资源需要多次请求
- 版本管理复杂

## GraphQL 特点

### 按需请求

```graphql
# GraphQL 查询
query {
  user(id: "1") {
    name
    email
    posts(first: 5) {
      title
      commentsCount
    }
  }
}
```

### 单一端点

```javascript
// Express + GraphQL
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
```

### 优点

- 精确获取需要的数据
- 单次请求获取多资源
- 强类型，文档自动生成
- 前后端解耦

### 缺点

- 学习曲线
- 缓存复杂度增加
- 错误处理方式不同

## 选型建议

| 场景 | 推荐方案 |
|------|---------|
| 简单 CRUD | REST |
| 移动端/BANDWIDTH 受限 | GraphQL |
| 公开 API | REST |
| 微服务聚合 | GraphQL |

::: tip 实践
很多项目采用混合方案：REST 用于简单操作，GraphQL 用于复杂查询场景。
:::
