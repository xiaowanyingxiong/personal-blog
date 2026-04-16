---
title: CI/CD 流水线完全指南
date: 2026-04-06
description: 构建高效的持续集成/持续部署流水线
---

# CI/CD 流水线完全指南

持续集成和持续部署是现代软件交付的核心实践。本文介绍如何构建高效的 CI/CD 流水线。

## 流水线阶段

```yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: ./deploy.sh production
```

## 自动化测试

```yaml
- name: Run tests
  run: npm run test:ci
  env:
    CI: true
    DATABASE_URL: postgres://test/test

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Docker 构建与推送

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    push: ${{ github.event_name != 'pull_request' }}
    tags: |
      ${{ secrets.DOCKERHUB_USERNAME }}/app:latest
      ${{ secrets.DOCKERHUB_USERNAME }}/app:${{ github.sha }}
```

## 环境管理

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18.x, 20.x]
        database: [postgres:14, postgres:15]
    services:
      postgres:
        image: ${{ matrix.database }}
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
```

## 部署策略

### 蓝绿部署

```bash
# 切换流量到新版本
kubectl patch service myapp -p '{"spec":{"selector":{"version":"v2"}}}'

# 监控旧版本无请求后删除
kubectl delete deployment myapp-v1
```

### 金丝雀发布

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
spec:
  strategy:
    canary:
      steps:
        - setWeight: 5
        - pause: {duration: 10m}
        - setWeight: 20
        - pause: {duration: 10m}
```

::: tip 提示
保持流水线快速执行，CI 阶段总耗时建议控制在 10 分钟以内。
:::
