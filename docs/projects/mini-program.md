---
title: 微信小程序 - 记账本应用
description: 轻量级微信小程序，专注个人记账与财务分析
---

# 微信小程序 - 记账本应用

一款简洁实用的个人记账小程序，帮助用户轻松管理日常收支。

## 功能亮点

- **快速记账**：极简操作流程，3 秒完成记录
- **智能分类**：AI 自动识别消费类别
- **数据统计**：多维度收支分析图表
- **预算提醒**：自定义预算，到期自动提醒
- **数据导出**：支持 Excel 导出

## 技术实现

### 微信小程序端

| 模块 | 技术方案 |
|------|---------|
| 框架 | 原生小程序 + Taro |
| 状态管理 | MobX |
| 网络请求 | Flyio |
| 数据存储 | 云开发数据库 |

### 云端服务

```javascript
// 云函数 - 统计月度支出
async function getMonthlyStats(event, context) {
  const { year, month, userId } = event;

  const result = await db.collection('records')
    .aggregate()
    .match({
      userId,
      type: 'expense',
      createTime: db.command.and(
        db.command.gte(new Date(`${year}-${month}-01`)),
        db.command.lt(new Date(`${year}-${month + 1}-01`))
      )
    })
    .group({
      _id: '$category',
      total: $.sum('$amount')
    })
    .end();

  return result;
}
```

## 界面预览

小程序采用卡片式设计，主色调为渐变蓝紫色系，简洁现代。

### 核心页面

- **首页**：今日收支概览 + 快速记账按钮
- **记账页**：分类选择 + 金额输入 + 备注
- **统计页**：月度账单 + 图表分析
- **我的**：设置 + 数据备份

## 用户评价

> "界面简洁，操作流畅，比其他记账 App 好用多了！" — 用户 A

> "图表分析很直观，能清楚看到钱花在哪里了" — 用户 B

## 链接

- [小程序码](#)
- [设计文档](https://docs.example.com)
