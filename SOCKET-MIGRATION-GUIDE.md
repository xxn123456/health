# Socket.IO 迁移说明

## 📋 变更概述

将 VueSocketIO 从全局注册 (main.js) 迁移到 HomeView.vue 组件中局部注册和使用。

## 🔄 变更内容

### 1. main.js 修改

**修改前**:
```javascript
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client';

Vue.use(new VueSocketIO({
  debug: false,
  connection: SocketIO('ws://shutiaogege.top:3000', {
    autoConnect: false
  })
}))
```

**修改后**:
```javascript
// VueSocketIO 已移至 HomeView.vue 中局部注册
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client';

// Socket.IO 实例将在 HomeView.vue 中创建和导出
export const socketInstance = null; // 占位,实际在 HomeView 中创建
```

### 2. HomeView.vue 修改

#### 新增导入
```javascript
// 局部导入 Socket.IO
import SocketIO from 'socket.io-client';

// Socket.IO 连接配置
const SOCKET_URL = 'ws://shutiaogege.top:3000';
// const SOCKET_URL = 'ws://192.168.0.102:3000'; // 本地开发地址
```

#### 新增数据属性
```javascript
data() {
  return {
    // Socket 实例
    socket: null,
    // ... 其他数据
  }
}
```

#### 新增计算属性
```javascript
computed: {
  /**
   * Socket.IO 连接地址
   */
  socketUrl() {
    return SOCKET_URL;
  }
}
```

#### 新增生命周期钩子
```javascript
beforeDestroy() {
  // 清理 Socket 连接
  this.cleanupSocket();
}
```

#### 新增/修改方法

**1. initSocket() - 初始化 Socket 实例**
```javascript
initSocket() {
  if (this.socket) {
    console.log('[Socket] Socket 实例已存在');
    return;
  }
  
  try {
    this.socket = SocketIO(SOCKET_URL, {
      autoConnect: false,
      timeout: 10000,
      transports: ['websocket', 'polling']
    });
    
    console.log('[Socket] Socket 实例已创建:', SOCKET_URL);
  } catch (error) {
    console.error('[Socket] 创建 Socket 实例失败:', error);
    this.handleConnectionError('Socket 初始化失败');
  }
}
```

**2. initConnection() - 初始化连接**
```javascript
initConnection() {
  try {
    this.isLoading = true;
    this.connectionError = false;
    this.retryCount = 0;

    // 初始化 Socket 实例
    this.initSocket();
    
    if (!this.socket) {
      throw new Error('Socket 实例未创建');
    }

    // 连接服务器
    this.socket.connect();
    this.isConnected = true;

    // 订阅数据推送
    this.socket.on('his_push', (res) => {
      this.fetchRemoteData(res);
    });

    // 监听连接错误
    this.socket.on('connect_error', (error) => {
      console.error('[Socket] 连接错误:', error);
      this.handleConnectionError('连接服务器失败');
    });

    // 监听连接超时
    this.socket.on('connect_timeout', () => {
      console.error('[Socket] 连接超时');
      this.handleConnectionError('连接超时');
    });

    // 监听断开连接
    this.socket.on('disconnect', (reason) => {
      console.log('[Socket] 连接断开:', reason);
      this.handleDisconnect();
    });

    // 监听重连
    this.socket.on('reconnect', (attemptNumber) => {
      console.log('[Socket] 重连成功,重试次数:', attemptNumber);
      this.isConnected = true;
      this.connectionError = false;
    });

    // 监听重连错误
    this.socket.on('reconnect_error', (error) => {
      console.error('[Socket] 重连失败:', error);
    });

    // 设置加载超时
    setTimeout(() => {
      if (this.isLoading && !this.hasData) {
        this.handleConnectionError('数据加载超时');
      }
    }, 10000);
  } catch (error) {
    console.error('[Socket] 初始化连接失败:', error);
    this.handleConnectionError('连接初始化失败');
  }
}
```

**3. cleanupSocket() - 清理 Socket 连接**
```javascript
cleanupSocket() {
  if (this.socket) {
    console.log('[Socket] 清理 Socket 连接');
    
    // 移除所有监听器
    this.socket.off('his_push');
    this.socket.off('connect_error');
    this.socket.off('connect_timeout');
    this.socket.off('disconnect');
    this.socket.off('reconnect');
    this.socket.off('reconnect_error');
    
    // 断开连接
    this.socket.disconnect();
    this.socket = null;
    this.isConnected = false;
  }
}
```

**4. handleTestConnection() - 测试连接**
```javascript
handleTestConnection() {
  if (this.socket && this.socket.connected) {
    this.socket.emit('his', '测试内容');
    console.log('[Socket] 已发送测试消息');
  } else {
    console.warn('[Socket] Socket 未连接,无法发送测试消息');
    this.$message.warning('Socket 未连接');
  }
}
```

## 📊 API 变化对比

| 功能 | 全局注册 (旧) | 局部注册 (新) |
|------|--------------|--------------|
| 访问方式 | `this.$socket` | `this.socket` |
| 订阅事件 | `this.sockets.subscribe()` | `this.socket.on()` |
| 取消订阅 | `this.sockets.unsubscribe()` | `this.socket.off()` |
| 发送消息 | `this.$socket.emit()` | `this.socket.emit()` |
| 连接状态 | `this.$socket.connected` | `this.socket.connected` |
| 手动连接 | `this.$socket.connect()` | `this.socket.connect()` |
| 断开连接 | `this.$socket.disconnect()` | `this.socket.disconnect()` |

## ✅ 优势

### 1. **更好的组件隔离**
- Socket 实例只在该组件中可用
- 避免全局污染
- 更好的可测试性

### 2. **完整的生命周期管理**
- `mounted`: 按需创建
- `beforeDestroy`: 自动清理
- 防止内存泄漏

### 3. **更灵活的控制**
- 可以在组件内完全控制 Socket 行为
- 更容易实现错误处理
- 支持动态配置连接地址

### 4. **更好的日志追踪**
- 所有日志带 `[Socket]` 前缀
- 更容易在控制台中定位问题
- 区分不同组件的 Socket 操作

### 5. **支持多连接**
- 如果需要,可以在不同组件创建不同的 Socket 连接
- 每个连接独立管理

## 🔧 配置选项

### Socket.IO 配置
```javascript
this.socket = SocketIO(SOCKET_URL, {
  autoConnect: false,        // 不自动连接
  timeout: 10000,            // 连接超时 10 秒
  transports: [              // 传输方式
    'websocket',             // 优先使用 WebSocket
    'polling'                // 降级到 HTTP 轮询
  ]
});
```

### 连接地址切换
```javascript
// 生产环境
const SOCKET_URL = 'ws://shutiaogege.top:3000';

// 开发环境 (取消注释)
// const SOCKET_URL = 'ws://192.168.0.102:3000';
```

## 📝 使用示例

### 基本使用
```vue
<template>
  <div>
    <button @click="connect">连接</button>
    <button @click="disconnect">断开</button>
    <button @click="sendMessage">发送消息</button>
  </div>
</template>

<script>
export default {
  methods: {
    connect() {
      this.initConnection();
    },
    
    disconnect() {
      this.cleanupSocket();
    },
    
    sendMessage() {
      if (this.socket && this.socket.connected) {
        this.socket.emit('message', { text: 'Hello' });
      }
    }
  }
}
</script>
```

### 监听自定义事件
```javascript
// 在 initConnection 中添加
this.socket.on('custom_event', (data) => {
  console.log('收到自定义事件:', data);
  // 处理数据
});

// 在 cleanupSocket 中清理
this.socket.off('custom_event');
```

### 发送消息并接收响应
```javascript
sendMessageWithResponse(message) {
  return new Promise((resolve, reject) => {
    // 发送消息
    this.socket.emit('request', message);
    
    // 监听响应
    const handler = (response) => {
      this.socket.off('response', handler); // 清理监听器
      resolve(response);
    };
    
    this.socket.on('response', handler);
    
    // 超时处理
    setTimeout(() => {
      this.socket.off('response', handler);
      reject(new Error('响应超时'));
    }, 5000);
  });
}
```

## ⚠️ 注意事项

### 1. **组件销毁时清理**
必须在 `beforeDestroy` 中清理 Socket 连接,否则会导致内存泄漏。

```javascript
beforeDestroy() {
  this.cleanupSocket();
}
```

### 2. **避免重复创建**
在 `initSocket` 中检查实例是否已存在:

```javascript
initSocket() {
  if (this.socket) {
    return; // 已存在,不重复创建
  }
  // 创建逻辑...
}
```

### 3. **错误处理**
所有 Socket 操作都应该有错误处理:

```javascript
try {
  this.socket.connect();
} catch (error) {
  console.error('[Socket] 连接失败:', error);
  this.handleConnectionError(error.message);
}
```

### 4. **连接状态检查**
发送消息前检查连接状态:

```javascript
if (this.socket && this.socket.connected) {
  this.socket.emit('message', data);
} else {
  console.warn('[Socket] 未连接');
}
```

### 5. **事件监听器清理**
组件销毁前必须移除所有事件监听器:

```javascript
cleanupSocket() {
  this.socket.off('event1');
  this.socket.off('event2');
  // ...
  this.socket.disconnect();
}
```

## 🐛 常见问题

### Q1: 为什么不用 VueSocketIO 插件?
**A:** VueSocketIO 是全局插件,不适合组件级使用。直接使用 socket.io-client 更灵活,可以更好地控制生命周期。

### Q2: 如何在多个组件共享 Socket 连接?
**A:** 可以使用 Vuex 或事件总线:

```javascript
// store/socket.js
export const socketModule = {
  state: {
    socket: null
  },
  mutations: {
    SET_SOCKET(state, socket) {
      state.socket = socket;
    }
  }
}
```

### Q3: 如何处理网络断开重连?
**A:** Socket.IO 内置了自动重连功能,可以通过配置控制:

```javascript
this.socket = SocketIO(url, {
  reconnection: true,           // 启用自动重连
  reconnectionAttempts: 5,      // 最大重试次数
  reconnectionDelay: 1000,      // 重试间隔 (ms)
  reconnectionDelayMax: 5000    // 最大重试间隔 (ms)
});
```

### Q4: 如何调试 Socket 连接?
**A:** 启用调试模式:

```javascript
// 客户端
localStorage.debug = 'socket.io-client:*';

// 或在创建实例时
this.socket = SocketIO(url, {
  forceNew: true
});
```

## 📚 参考资料

- [Socket.IO 客户端文档](https://socket.io/docs/v4/client-api/)
- [Socket.IO 配置选项](https://socket.io/docs/v4/client-options/)
- [Socket.IO 事件](https://socket.io/docs/v4/client-api/#Event:connect)

## 🔄 回滚方案

如果需要回滚到全局注册:

1. 恢复 main.js 中的 VueSocketIO 注册
2. 将 HomeView.vue 中的 `this.socket` 改回 `this.$socket`
3. 将 `this.socket.on()` 改回 `this.sockets.subscribe()`
4. 移除 `beforeDestroy` 中的清理逻辑

## 📅 更新日期

2024-01-01
