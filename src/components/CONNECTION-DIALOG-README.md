# ConnectionDialog 组件使用说明

## 📦 组件概述

`ConnectionDialog` 是一个 WebSocket 连接测试对话框组件,用于:
- 展示 Socket.IO 连接地址
- 测试连接状态
- 显示连接测试结果
- 记录连接日志

## 🎯 功能特性

### ✅ 核心功能
1. **连接地址展示** - 显示当前 Socket.IO 服务器地址
2. **一键复制** - 快速复制连接地址到剪贴板
3. **连接测试** - 测试 WebSocket 连接是否正常
4. **状态显示** - 实时显示连接状态(未连接/连接中/已连接/连接失败)
5. **结果展示** - 展示测试结果的详细信息
6. **日志记录** - 记录所有连接操作日志
7. **自动关闭** - 连接成功后自动关闭对话框

### 🎨 UI 特性
- 响应式设计,适配移动端
- 平滑动画效果
- 状态徽章颜色区分
- 代码高亮显示
- 悬停交互效果

## 📖 使用方法

### 1. 导入组件

```vue
<script>
import ConnectionDialog from '@/components/ConnectionDialog.vue';

export default {
  components: {
    ConnectionDialog
  }
}
</script>
```

### 2. 在模板中使用

```vue
<template>
  <div>
    <ConnectionDialog
      :visible.sync="showDialog"
      :socket-url="socketUrl"
      @test-success="onTestSuccess"
      @test-error="onTestError"
      @confirm="onConfirm"
      @close="onClose"
    />
  </div>
</template>
```

### 3. 数据绑定

```javascript
export default {
  data() {
    return {
      showDialog: true, // 控制对话框显示
      socketUrl: 'http://localhost:3000' // Socket.IO 地址
    }
  },
  
  computed: {
    socketUrl() {
      const isDev = process.env.NODE_ENV === 'development';
      return isDev ? 'http://localhost:3000' : window.location.origin;
    }
  }
}
```

## 🔧 Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `visible` | Boolean | `false` | 控制对话框显示/隐藏,支持 `.sync` 修饰符 |
| `socketUrl` | String | `''` | Socket.IO 连接地址 |

## 📡 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `test-success` | `(result: Object)` | 测试连接成功时触发 |
| `test-error` | `(error: Error)` | 测试连接失败时触发 |
| `confirm` | `(callback: Function)` | 用户点击确认连接时触发 |
| `close` | - | 对话框关闭时触发 |
| `update:visible` | `(value: Boolean)` | 对话框可见性变化时触发(.sync) |

## 💡 事件处理示例

```javascript
methods: {
  // 测试成功
  onTestSuccess(result) {
    console.log('测试成功:', result);
    // result 包含:
    // {
    //   success: true,
    //   message: '连接测试成功',
    //   timestamp: '2024-01-01 12:00:00',
    //   data: {
    //     url: 'http://localhost:3000',
    //     status: 'connected',
    //     latency: '25ms'
    //   }
    // }
  },
  
  // 测试失败
  onTestError(error) {
    console.error('测试失败:', error);
    // 可以显示错误提示
    this.$message.error(error.message);
  },
  
  // 确认连接
  onConfirm(callback) {
    // 执行实际的连接逻辑
    this.initWebSocketConnection();
    
    // 连接成功后调用回调关闭对话框
    callback();
  },
  
  // 对话框关闭
  onClose() {
    console.log('对话框已关闭');
  }
}
```

## 🎨 自定义样式

组件使用 SCSS,可以通过覆盖 CSS 变量来自定义样式:

```scss
// 在你的全局样式中
.connection-dialog {
  // 自定义颜色
  --primary-color: #2550dd;
  --success-color: #00B894;
  --error-color: #FF4757;
}
```

## 🔌 集成 Socket.IO 示例

### 真实的连接测试逻辑

```javascript
// 替换组件中的 testConnection 方法
testConnection() {
  return new Promise((resolve, reject) => {
    const socket = io(this.socketUrl, {
      timeout: 5000,
      transports: ['websocket']
    });
    
    socket.on('connect', () => {
      resolve({
        status: 'connected',
        socketId: socket.id
      });
      socket.close();
    });
    
    socket.on('connect_error', (error) => {
      reject(new Error(`连接失败: ${error.message}`));
    });
    
    socket.on('connect_timeout', () => {
      reject(new Error('连接超时'));
      socket.close();
    });
  });
}
```

### 完整的集成示例

```vue
<template>
  <ConnectionDialog
    :visible.sync="showDialog"
    :socket-url="socketUrl"
    @confirm="handleRealConnection"
  />
</template>

<script>
import io from 'socket.io-client';
import ConnectionDialog from '@/components/ConnectionDialog.vue';

export default {
  components: { ConnectionDialog },
  
  data() {
    return {
      showDialog: true,
      socket: null
    }
  },
  
  computed: {
    socketUrl() {
      return process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : window.location.origin;
    }
  },
  
  methods: {
    handleRealConnection(callback) {
      try {
        this.socket = io(this.socketUrl, {
          transports: ['websocket']
        });
        
        this.socket.on('connect', () => {
          console.log('Socket 已连接:', this.socket.id);
          callback(); // 关闭对话框
        });
        
        this.socket.on('disconnect', () => {
          console.log('Socket 已断开');
        });
        
      } catch (error) {
        console.error('连接失败:', error);
      }
    }
  },
  
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
</script>
```

## 🎯 最佳实践

### 1. 环境变量配置

```javascript
// .env.development
VUE_APP_SOCKET_URL=http://localhost:3000

// .env.production
VUE_APP_SOCKET_URL=https://api.example.com
```

```javascript
computed: {
  socketUrl() {
    return process.env.VUE_APP_SOCKET_URL || window.location.origin;
  }
}
```

### 2. 本地存储记忆

```javascript
data() {
  return {
    showDialog: !localStorage.getItem('socket_connected')
  }
},

methods: {
  onConfirm(callback) {
    this.initConnection();
    localStorage.setItem('socket_connected', 'true');
    callback();
  }
}
```

### 3. 自动重连

```javascript
methods: {
  onTestError(error) {
    this.$message({
      message: '连接失败,3秒后自动重试',
      type: 'warning'
    });
    
    setTimeout(() => {
      this.$refs.dialog.handleTestConnection();
    }, 3000);
  }
}
```

## 🐛 常见问题

### Q1: 对话框不显示?
**A:** 检查 `visible` 属性是否为 `true`,或使用 `.sync` 修饰符:
```vue
<ConnectionDialog :visible.sync="showDialog" />
```

### Q2: 测试连接一直失败?
**A:** 检查:
1. Socket.IO 服务器是否启动
2. 连接地址是否正确
3. 浏览器控制台是否有 CORS 错误
4. 网络是否正常

### Q3: 如何禁用复制按钮?
**A:** 在不支持 Clipboard API 的浏览器中,复制按钮会自动禁用。

## 📝 更新日志

### v1.0.0 (2024-01-01)
- ✅ 初始版本发布
- ✅ 支持连接测试
- ✅ 显示连接地址和状态
- ✅ 日志记录功能
- ✅ 响应式设计

## 📄 License

MIT
