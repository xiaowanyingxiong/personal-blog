---
title: Redis 性能优化实战
date: 2026-04-12
description: 深入理解 Redis 内部机制，掌握性能调优技巧
---

# Redis 性能优化实战

Redis 是高性能的内存数据库。本文分享一些 Redis 性能优化的实战技巧。

## 内存优化

### 选择合适的数据结构

```python
# 使用 Hash 代替多个 String 键
# 差的写法
r.set("user:1:name", "John")
r.set("user:1:email", "john@example.com")

# 好的写法
r.hset("user:1", mapping={
    "name": "John",
    "email": "john@example.com"
})
```

### 内存碎片整理

```bash
# 查看内存碎片率
redis-cli info memory | grep mem_fragmentation_ratio

# 整理内存碎片
redis-cli MEMORY PURGE
```

## 连接优化

### 使用连接池

```python
import redis

pool = redis.ConnectionPool(
    host='localhost',
    port=6379,
    max_connections=50,
    decode_responses=True
)
r = redis.Redis(connection_pool=pool)
```

### Pipeline 批量操作

```python
# 使用 pipeline 减少网络往返
pipe = r.pipeline()
for i in range(1000):
    pipe.set(f"key:{i}", f"value:{i}")
pipe.execute()
```

## 持久化策略

根据场景选择持久化策略：

```bash
# RDB + AOF 混合持久化
appendonly yes
appendfsync everysec
rdbcompression yes
```

## 键设计原则

```python
# 使用冒号分隔层级
"user:1000:profile"
"order:2024:04:12345:items"

# 设置过期时间
r.expire("session:token", 3600)
```

## 监控命令

```bash
# 实时监控延迟
redis-cli --latency-history

# 慢查询日志
redis-cli SLOWLOG GET 10
```

::: info 提示
生产环境建议使用 Redis Cluster 实现高可用和水平扩展。
:::
