---
title: 数据库设计与规范化
date: 2026-04-03
description: 掌握数据库设计原则，构建高效可靠的数据模型
---

# 数据库设计与规范化

良好的数据库设计是系统性能和数据完整性的基础。

## 规范化原则

### 第一范式 (1NF)

原子性：每列都是不可再分的最小数据单元。

```sql
-- 错误：地址包含多个值
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(500)  -- "北京市朝阳区xxx, 上海市浦东新区yyy"
);

-- 正确：拆分为独立字段
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(50),
  district VARCHAR(50),
  street VARCHAR(200)
);
```

### 第二范式 (2NF)

消除部分依赖：非主键列必须完全依赖主键。

```sql
-- 错误：部分依赖
CREATE TABLE orders (
  order_id INT,
  product_id INT,
  product_name VARCHAR(100),  -- 只依赖 product_id
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);

-- 正确：拆分为两个表
CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  order_date DATETIME
);

CREATE TABLE order_items (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

### 第三范式 (3NF)

消除传递依赖：非主键列之间不应有依赖关系。

```sql
-- 错误：传递依赖
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  school_id INT,
  school_name VARCHAR(100)  -- 传递依赖：通过 school_id 间接依赖
);

-- 正确
CREATE TABLE schools (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  school_id INT,
  FOREIGN KEY (school_id) REFERENCES schools(id)
);
```

## 索引设计

### 何时创建索引

```sql
-- 适合创建索引的场景
-- 1. WHERE 子句常使用的列
CREATE INDEX idx_user_email ON users(email);

-- 2. JOIN 操作的连接列
CREATE INDEX idx_order_user ON orders(user_id);

-- 3. ORDER BY / GROUP BY 列
CREATE INDEX idx_order_date ON orders(order_date DESC);
```

### 索引类型选择

| 类型 | 适用场景 |
|------|---------|
| B-Tree | 范围查询、排序 |
| Hash | 精确匹配 |
| GIN | 全文搜索、数组 |
| GiST | 地理空间数据 |

## 反规范化

在读多写少的场景下，适当反规范化可以提升性能：

```sql
-- 添加冗余字段提升查询效率
ALTER TABLE orders ADD COLUMN user_name VARCHAR(100);
ALTER TABLE orders ADD COLUMN user_email VARCHAR(100);

-- 使用触发器维护冗余数据
CREATE TRIGGER update_order_user
AFTER UPDATE ON users
FOR EACH ROW
UPDATE orders SET user_name = NEW.name, user_email = NEW.email
WHERE orders.user_id = NEW.id;
```

::: warning 注意
反规范化会增加数据同步复杂度，确保有完善的机制保持数据一致性。
:::
