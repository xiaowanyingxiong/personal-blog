---
title: Docker 容器化最佳实践
date: 2026-04-13
description: 构建高效、安全、可维护的 Docker 容器镜像
---

# Docker 容器化最佳实践

容器化已经成为现代应用部署的标准。本文分享一些 Docker 最佳实践，帮助你构建更好的镜像。

## 使用多阶段构建

多阶段构建可以显著减小镜像体积：

```dockerfile
# 构建阶段
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/index.js"]
```

## .dockerignore 文件

排除不必要的文件：

```
node_modules
.git
.env*
*.log
dist
coverage
```

## 最小化镜像层数

将相关的命令合并，减少层数：

```dockerfile
# 好的做法
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git curl vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

## 使用非 root 用户运行

安全性最佳实践：

```dockerfile
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser
```

## 健康检查

添加健康检查让容器更健壮：

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1
```

## 环境变量配置

使用环境变量进行配置：

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
```

::: tip 提示
定期更新基础镜像以获取安全补丁。
:::
