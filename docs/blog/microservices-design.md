---
title: 微服务架构设计实践
date: 2026-04-07
description: 从零开始设计微服务架构，构建可扩展系统
---

# 微服务架构设计实践

微服务架构已成为现代分布式系统的主流选择。本文分享微服务设计的核心原则与实践。

## 服务拆分原则

### 按业务能力拆分

```
用户服务 (User Service)
  - 用户注册/登录
  - 个人信息管理

订单服务 (Order Service)
  - 订单创建/查询
  - 订单状态管理

支付服务 (Payment Service)
  - 支付处理
  - 退款管理
```

### 领域驱动设计

```typescript
// 订单服务 - 领域模型
class Order {
  private items: OrderItem[];
  private status: OrderStatus;

  public place(): void {
    this.validate();
    this.status = OrderStatus.PLACED;
    this.emit(new OrderPlacedEvent(this));
  }

  private validate(): void {
    if (this.items.length === 0) {
      throw new EmptyOrderError();
    }
  }
}
```

## 服务间通信

### 同步通信 - REST/gRPC

```typescript
// REST 调用
class OrderService {
  async createOrder(userId: string, items: Item[]): Promise<Order> {
    const response = await fetch(`/api/users/${userId}/validate`);
    if (!response.ok) {
      throw new UserValidationError();
    }
    return this.orderRepository.save(new Order(userId, items));
  }
}
```

### 异步通信 - 消息队列

```typescript
// 使用 RabbitMQ/Kafka
class PaymentService {
  async handlePayment(orderId: string): Promise<void> {
    const payment = await this.processPayment(orderId);
    await this.messageBroker.publish('payment.completed', {
      orderId,
      paymentId: payment.id,
      timestamp: new Date()
    });
  }
}
```

## 服务发现

```yaml
# Kubernetes Service
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```

## 分布式事务

### Saga 模式

```typescript
// 编排式 Saga
class OrderSaga {
  async execute(order: Order): Promise<void> {
    try {
      await this.reserveInventory(order.items);
      await this.processPayment(order.total);
      await this.confirmOrder(order);
    } catch (error) {
      await this.cancelInventory(order.items);
      await this.refundPayment(order.total);
      throw error;
    }
  }
}
```

## 熔断器模式

```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailure: Date;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      throw new CircuitOpenError();
    }
    try {
      return await fn();
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }
}
```

::: info 提示
微服务不是银弹，合理评估团队能力和业务规模后再决定是否采用。
:::
