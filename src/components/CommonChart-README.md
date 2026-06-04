# CommonChart 通用 ECharts 组件

## 📦 组件说明

`CommonChart` 是一个高度可复用的 ECharts 包装组件,支持动态配置、自动响应式、加载状态等功能。

---

## 🚀 基础用法

### 1. 在父组件中使用

```vue
<template>
  <common-chart
    :options="chartOptions"
    :loading="isLoading"
    @initialized="onChartReady"
  />
</template>

<script>
import CommonChart from '@/components/screenone/CommonChart.vue'

export default {
  components: {
    CommonChart
  },
  
  data() {
    return {
      isLoading: false,
      chartOptions: {
        title: {
          text: '示例图表',
          textStyle: { color: '#fff' }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70],
          type: 'line'
        }]
      }
    }
  },
  
  methods: {
    onChartReady(chart) {
      console.log('图表已初始化', chart)
    }
  }
}
</script>
```

---

## 📋 Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `options` | `Object` | `{}` | **必需** - ECharts 配置项 |
| `width` | `String` | `'100%'` | 图表宽度 |
| `height` | `String` | `'100%'` | 图表高度 |
| `loading` | `Boolean` | `false` | 是否显示加载动画 |
| `loadingOptions` | `Object` | - | 加载动画配置对象 |
| `autoResize` | `Boolean` | `true` | 是否自动响应窗口大小变化 |
| `initDelay` | `Number` | `0` | 延迟初始化时间 (毫秒) |

---

## 🎯 Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `initialized` | `(chart: ECharts)` | 图表初始化完成时触发 |
| `updated` | `(chart: ECharts)` | 图表更新完成时触发 |
| `error` | `(error: Error)` | 图表发生错误时触发 |

---

## 🔧 Methods 方法

通过 `ref` 调用组件实例方法:

```vue
<common-chart ref="myChart" :options="options" />

<script>
export default {
  methods: {
    refreshChart() {
      this.$refs.myChart.refresh()
    },
    
    getInstance() {
      const chart = this.$refs.myChart.getInstance()
      // 可以直接调用 ECharts API
      chart.dispatchAction({ type: 'highlight' })
    }
  }
}
</script>
```

### 可用方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `updateChart(options)` | `Object` | - | 更新图表配置 |
| `resize()` | - | - | 手动触发 resize |
| `refresh()` | - | - | 清空并重新渲染 |
| `getInstance()` | - | `ECharts` | 获取 ECharts 实例 |
| `toggleLoading(show)` | `Boolean` | - | 切换加载状态 |

---

## 💡 高级用法

### 1. 动态更新数据

```vue
<template>
  <common-chart :options="chartOptions" />
</template>

<script>
export default {
  computed: {
    chartOptions() {
      return {
        xAxis: {
          data: this.categories
        },
        series: [{
          data: this.values
        }]
      }
    }
  },
  
  data() {
    return {
      categories: ['A', 'B', 'C'],
      values: [10, 20, 30]
    }
  },
  
  mounted() {
    // 模拟数据更新
    setTimeout(() => {
      this.categories = ['A', 'B', 'C', 'D']
      this.values = [10, 20, 30, 40]
    }, 3000)
  }
}
</script>
```

### 2. 自定义加载状态

```vue
<common-chart
  :options="options"
  :loading="true"
  :loading-options="{
    text: '数据加载中...',
    color: '#2550dd',
    textColor: '#fff',
    maskColor: 'rgba(0, 0, 0, 0.5)'
  }"
/>
```

### 3. 监听图表事件

```vue
<common-chart
  ref="chart"
  :options="options"
  @initialized="onChartReady"
/>

<script>
export default {
  methods: {
    onChartReady(chart) {
      // 绑定 ECharts 事件
      chart.on('click', (params) => {
        console.log('点击了:', params)
      })
      
      chart.on('mouseover', (params) => {
        console.log('悬停在:', params)
      })
    }
  }
}
</script>
```

---

## 🎨 实际案例

### 改造前的 blasChart.vue

```vue
<template>
  <div ref="blasChart" class="sign-chart"></div>
</template>

<script>
export default {
  props: ['radiation'],
  methods: {
    update() {
      const myChart = this.$echarts.init(this.$refs.blasChart)
      window.addEventListener('resize', () => myChart.resize())
      
      const option = {
        // ... 200行配置代码
      }
      
      myChart.setOption(option)
    }
  }
}
</script>
```

### 改造后 (使用 CommonChart)

```vue
<template>
  <common-chart :options="chartOptions" />
</template>

<script>
import CommonChart from './CommonChart.vue'

export default {
  components: { CommonChart },
  props: ['radiation'],
  computed: {
    chartOptions() {
      return {
        xAxis: {
          data: this.radiation.x || []
        },
        series: [
          { data: this.radiation.y1 || [] },
          { data: this.radiation.y2 || [] }
        ]
        // ... 其他配置
      }
    }
  }
}
</script>
```

**代码量减少 70%+**,且具备自动响应式、生命周期管理等特性!

---

## ⚠️ 注意事项

1. **确保已安装 ECharts**: 项目需要全局注册 `this.$echarts`
2. **响应式更新**: 通过计算属性返回 `options`,数据变化时会自动更新图表
3. **性能优化**: 大量数据更新时建议使用 `notMerge: true` 参数
4. **内存管理**: 组件销毁时会自动释放 ECharts 实例,无需手动处理
5. **ResizeObserver**: 现代浏览器使用 ResizeObserver,旧版降级到 window.resize

---

## 📦 依赖要求

```json
{
  "echarts": "^4.0.0",
  "vue": "^2.6.0"
}
```

---

## 🎯 适用场景

✅ 数据大屏展示  
✅ 后台管理系统图表  
✅ 实时数据监控  
✅ 任何需要 ECharts 的场景

---

## 🔗 相关资源

- [ECharts 官方文档](https://echarts.apache.org/zh/option.html)
- [ECharts 配置项手册](https://echarts.apache.org/zh/option.html#title)
