---
title: CSS Grid 布局完全指南
date: 2026-04-08
description: 掌握 CSS Grid 布局，构建现代响应式页面
---

# CSS Grid 布局完全指南

CSS Grid 是二维布局系统，适合复杂页面布局。本文全面介绍 CSS Grid 的使用。

## 基础概念

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 20px;
}
```

## 定义网格

### 命名网格线

```css
.layout {
  display: grid;
  grid-template-columns: [full-start] 1fr [content-start] minmax(0, 960px) [content-end] 1fr [full-end];
  grid-template-rows: [header-start] auto [header-end main-start] 1fr [main-end footer-start] auto [footer-end];
}
```

### repeat 和 fr 单位

```css
.grid {
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-columns: 200px repeat(3, 1fr) 200px;
}
```

## 网格项属性

### 跨越多行多列

```css
.item {
  grid-column: 1 / 3;      /* 从第1列到第3列 */
  grid-row: 1 / span 2;   /* 跨越2行 */
  grid-area: header;       /* 命名网格区域 */
}
```

### 对齐方式

```css
.item {
  justify-self: center;    /* 水平对齐 */
  align-self: end;         /* 垂直对齐 */
  place-self: center;     /* 两者结合 */
}
```

## 网格模板区域

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## 响应式布局

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

::: tip 提示
Grid 非常适合页面整体布局，而 Flexbox 适合组件内部布局。两者配合使用效果最佳。
:::
