---
title: 开源许可证完全指南
date: 2026-04-01
description: 了解主流开源许可证，选择合适的许可证保护你的项目
---

# 开源许可证完全指南

选择正确的开源许可证对项目发布至关重要。本文详细介绍主流开源许可证及其适用场景。

## 许可证分类

```
┌─────────────────────────────────────────────────────────────┐
│                     开源许可证分类                            │
├─────────────────────────────────────────────────────────────┤
│  Copyleft（传染型）    │  衍生作品必须使用相同许可证          │
│  ├─ GPL v3             │  商业使用受限                        │
│  ├─ AGPL              │  网络使用也受限                       │
│  └─ LGPL             │  库引用可闭源                        │
├─────────────────────────────────────────────────────────────┤
│  Permissive（宽松型）  │  限制较少，使用更自由                │
│  ├─ MIT               │  极简要求                            │
│  ├─ Apache 2.0        │  包含专利授权                        │
│  └─ BSD              │  保留声明即可                        │
├─────────────────────────────────────────────────────────────┤
│  Proprietary（闭源）   │  不属于开源                         │
└─────────────────────────────────────────────────────────────┘
```

## 主流许可证详解

### MIT 许可证

最宽松的许可证之一：

```markdown
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

**特点**：
- 只需保留版权声明
- 可闭源使用
- 商业友好

### Apache 2.0 许可证

包含专利授权保护：

```markdown
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
```

**特点**：
- 明确专利授权
- 要求保留版权和许可证声明
- 衍生作品必须开源
- 提供贡献者专利授权

### GPL v3 许可证

强传染性的 Copyleft 许可证：

```bash
# GPL 的 "传染性"
# 如果你的项目使用了 GPL 库
# 你的整个项目也必须 GPL（开源）

# 例子
项目A (MIT) → 使用GPL库 → 项目A必须GPL
项目B (GPL) → 使用GPL库 → 项目B必须GPL
```

**特点**：
- 衍生作品必须开源
- 网络使用也适用（AGPL 更严格）
- 包含专利保护
- 要求提供源代码

### LGPL 许可证

适合库文件的许可证：

```markdown
# LGPL 允许：
1. 闭源项目引用 LGPL 库
2. 不需要开源你的代码

# 但如果你修改了 LGPL 库本身：
必须开源你的修改
```

## 如何选择许可证

| 场景 | 推荐许可证 |
|------|-----------|
| 个人项目/学习 | MIT, Apache 2.0 |
| 商业项目 | MIT, Apache 2.0, BSD |
| 函数库/SDK | LGPL, Apache 2.0 |
| 内核/系统级软件 | GPL, AGPL |
| 云服务/SaaS | AGPL (如果需要强制开源) |

## 在项目中添加许可证

### 创建 LICENSE 文件

```bash
# 在项目根目录添加 LICENSE 文件
touch LICENSE

# 放入许可证全文内容
```

### 在代码中添加头部注释

```javascript
/**
 * @file utils.js
 *
 * MIT License
 * Copyright (c) 2026 Your Name
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy...
 */
```

### package.json 配置

```json
{
  "name": "your-package",
  "version": "1.0.0",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo"
  }
}
```

## 多许可证共存

```javascript
// 如果项目包含不同许可证的代码
// 在文件头部明确标注

/**
 * @file special-module.js
 *
 * This module is licensed under GPL v3
 * Copyright (c) 2026 Special Author
 */
```

::: warning 注意
许可证选择需谨慎，一旦发布很难更改。如果是公司项目，建议咨询法务。
:::
