---
title: Webpack 5 模块联邦详解
date: 2026-04-05
description: 深入理解 Module Federation，实现微前端架构
---

# Webpack 5 模块联邦详解

Module Federation 是 Webpack 5 最强大的特性之一，支持微前端架构和模块共享。

## 基础概念

### 远程模块

```javascript
// Host 应用 - webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        // 指定远程模块
        remoteApp: 'remote@https://remote.example.com/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
};
```

### 共享依赖

```javascript
// 自动共享（单例模式）
shared: {
  react: { singleton: true, requiredVersion: '^18.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.0.0' }
}

// 共享 Vue
shared: {
  vue: { singleton: true },
  'vue-router': { singleton: true }
}
```

## 启动远程模块

```javascript
// 在 Host 应用中使用
import('./bootstrap');
// 或动态导入
const RemoteButton = React.lazy(() => import('remote/Button'));

function App() {
  return (
    <React.Suspense fallback="Loading...">
      <RemoteButton />
    </React.Suspense>
  );
}
```

```javascript
// bootstrap.js
import('remote/App');

const mount = (node) => {
  import('remote/App').then(module => {
    module.mount(node);
  });
};

export { mount };
```

## 远程应用配置

```javascript
// Remote 应用 - webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button',
        './App': './src/bootstrap'
      },
      shared: ['react', 'react-dom']
    })
  ]
};
```

## Host 与 Remote 共享状态

```javascript
// 使用 EventEmitter 或自定义事件
class GlobalState {
  constructor() {
    this.listeners = {};
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(fn => fn(data));
  }

  on(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }
}

window.__SHARED_STATE__ = new GlobalState();
```

## 应用场景

| 场景 | 方案 |
|------|------|
| 微前端多团队协作 | 各团队独立部署 Remote |
| 组件库共享 | 作为 Remote 暴露组件 |
| 多版本共存 | 配置 requiredVersion |

::: info 注意
Module Federation 需要 Webpack 5+，并且所有应用必须使用相同版本的共享依赖。
:::
