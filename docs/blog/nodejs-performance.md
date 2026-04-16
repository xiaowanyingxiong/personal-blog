---
title: Node.js 性能优化指南
date: 2026-04-09
description: 深入理解 Node.js 运行时，掌握性能调优技巧
---

# Node.js 性能优化指南

Node.js 以高性能著称。本文分享一些性能优化的实战技巧。

## 事件循环优化

### 避免阻塞事件循环

```javascript
// 错误：同步大循环阻塞事件循环
function badExample() {
  const data = fs.readFileSync('large-file.txt');
  return data;
}

// 正确：使用异步操作
async function goodExample() {
  const data = await fs.promises.readFile('large-file.txt');
  return data;
}
```

### 分割大任务

```javascript
// 使用 setImmediate 分割任务
function processLargeArray(arr) {
  const batchSize = 1000;
  let index = 0;

  function processBatch() {
    const end = Math.min(index + batchSize, arr.length);
    for (let i = index; i < end; i++) {
      // 处理 arr[i]
    }
    index = end;

    if (index < arr.length) {
      setImmediate(processBatch);
    }
  }

  processBatch();
}
```

## 内存管理

### 避免内存泄漏

```javascript
// 错误：全局变量累积
const cache = [];
function addToCache(data) {
  cache.push(data);  // 无限增长
}

// 正确：限制缓存大小
const LRU = require('lru-cache');
const cache = new LRU({ max: 1000 });
```

### 使用流处理大文件

```javascript
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream/promises');

await pipeline(
  createReadStream('large-input.txt'),
  transformStream,
  createWriteStream('large-output.txt')
);
```

## 集群模式

```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(3000);
}
```

## 性能监控

```bash
# 使用 clinic.js 分析性能
npm install -g clinic
clinic doctor -- node server.js
clinic flame -- node server.js
```

::: tip 提示
生产环境建议使用 PM2 或 Docker 进行进程管理。
:::
