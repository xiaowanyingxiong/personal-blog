---
title: Git 高级操作指南
date: 2026-04-10
description: 掌握 Git 高级命令，让版本控制更加得心应手
---

# Git 高级操作指南

掌握这些 Git 高级操作，让你在版本控制中游刃有余。

## 变基（Rebase）

### 交互式变基

```bash
# 修改最近 3 次提交
git rebase -i HEAD~3

# 操作类型
pick = 使用提交
squash = 合并提交
reword = 修改提交信息
edit = 修改提交
drop = 删除提交
```

### 变基 vs 合并

```bash
# 保持分支历史整洁
git checkout feature
git rebase main

# vs 合并会产生 merge commit
git checkout main
git merge feature
```

## 暂存（Stashing）

```bash
# 保存当前工作
git stash save "work in progress"

# 列出暂存
git stash list

# 应用最新暂存
git stash pop

# 应用指定暂存
git stash apply stash@{2}

# 清除暂存
git stash drop stash@{0}
```

## 交互式暂存

```bash
# 暂存部分文件
git add -p

# 选项
y - 暂存此区块
n - 跳过此区块
s - 拆分区块
e - 手动编辑
```

## 恢复提交

```bash
# 反转提交（创建新提交）
git revert HEAD~3

# 重置到指定提交（慎用）
git reset --hard origin/main
git reset --soft HEAD~1  # 保留更改在暂存区
```

## 子模块（Submodules）

```bash
# 添加子模块
git submodule add https://github.com/user/repo.git libs/repo

# 克隆包含子模块的仓库
git clone --recursive https://github.com/user/repo.git

# 更新子模块
git submodule update --remote libs/repo
```

## Bisect 定位 bug

```bash
# 开始二分查找
git bisect start
git bisect bad
git bisect good v1.0.0

# Git 会自动 checkout 中间版本测试
# 标记为 good 或 bad
git bisect good  # 没有 bug
git bisect bad   # 有 bug

# 完成后重置
git bisect reset
```

::: warning 注意
变基和重置会修改历史，谨慎在公共分支使用。
:::
