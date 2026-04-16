---
title: React Hooks 最佳实践
date: 2026-04-04
description: 掌握 React Hooks 的使用技巧，编写更简洁的组件逻辑
---

# React Hooks 最佳实践

React Hooks 彻底改变了 React 组件的编写方式。本文分享最佳实践。

## Hooks 规则

### 只能在顶层调用

```javascript
// 错误
function BadComponent() {
  if (condition) {
    const [state, setState] = useState(0);
  }
}

// 正确
function GoodComponent() {
  const [state, setState] = useState(0);
}
```

### 只在 React 函数中调用

```javascript
// 错误
const state = useState(0);  // 不在组件中

// 正确
function MyComponent() {
  const state = useState(0);
}
```

## 自定义 Hooks

### 提取逻辑复用

```javascript
// useLocalStorage.js
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

### 异步数据获取

```javascript
// useFetch.js
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
```

## useEffect 依赖管理

```javascript
// 完整依赖
useEffect(() => {
  document.title = `${count} times`;
}, [count]);  // 仅在 count 变化时执行

// 清理函数
useEffect(() => {
  const subscription = eventSource.connect();

  return () => {
    subscription.disconnect();
  };
}, []);
```

## 性能优化

### useMemo 和 useCallback

```javascript
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);

const memoizedCallback = useCallback(
  () => doSomething(a, b),
  [a, b]
);
```

::: tip 提示
避免过度优化，只有在确实存在性能问题时才使用 useMemo 和 useCallback。
:::
