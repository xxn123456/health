# 图表配置函数使用说明

## 📦 架构说明

现在项目使用 **配置函数 + CommonChart 组件** 的方式来实现图表,无需再为每个图表创建独立的 Vue 组件。

---

## 🎯 使用方式

### 1. 在 `chartConfig.js` 中定义图表配置函数

```javascript
// src/components/screenone/chartConfig.js

/**
 * 获取图表配置
 * @param {Object} data - 图表数据
 * @returns {Object} ECharts 配置对象
 */
export function getMyChartOptions(data = {}) {
  return {
    // ECharts 配置项
    xAxis: {
      data: data.x || []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      data: data.y || []
    }]
  }
}
```

### 2. 在页面中直接使用 CommonChart

```vue
<template>
  <CommonChart 
    :options="chartOptions"
  />
</template>

<script>
import CommonChart from '@/components/screenone/CommonChart.vue'
import { getMyChartOptions } from '@/components/screenone/chartConfig'

export default {
  components: {
    CommonChart
  },
  
  data() {
    return {
      chartData: {
        x: ['Mon', 'Tue', 'Wed'],
        y: [120, 200, 150]
      }
    }
  },
  
  computed: {
    chartOptions() {
      // 调用配置函数,传入数据
      return getMyChartOptions(this.chartData)
    }
  }
}
</script>
```

---

## ✅ 优势对比

### ❌ 旧方式 (独立组件)
```vue
<!-- 需要创建 BlasChart.vue 文件 -->
<template>
  <div ref="chart"></div>
</template>
<script>
export default {
  props: ['radiation'],
  methods: {
    update() {
      // 100+ 行初始化代码
      // 手动管理生命周期
      // 手动处理 resize
    }
  }
}
</script>
```

### ✅ 新方式 (配置函数)
```javascript
// 只需在 chartConfig.js 中定义函数
export function getBlasChartOptions(radiation) {
  return {
    // ECharts 配置
    xAxis: { data: radiation.x },
    series: [{ data: radiation.y1 }]
  }
}

// 在页面中直接使用
<CommonChart :options="blasChartOptions" />

computed: {
  blasChartOptions() {
    return getBlasChartOptions(this.radiation)
  }
}
```

---

## 📋 已实现的图表配置

### 1. 放射与超声服务图表 (BlasChart)

**配置函数**: `getBlasChartOptions(radiation)`

**数据结构**:
```javascript
{
  x: ['1月', '2月', '3月', '4月', '5月'],
  y1: [120, 200, 150, 80, 70],  // 放射数据
  y2: [100, 180, 130, 90, 60]   // 超声数据
}
```

**使用示例**:
```vue
<template>
  <CommonChart :options="blasChartOptions" />
</template>

<script>
import { getBlasChartOptions } from './chartConfig'

export default {
  computed: {
    blasChartOptions() {
      return getBlasChartOptions(this.radiation)
    }
  }
}
</script>
```

---

## 🔧 如何添加新图表

### 步骤 1: 在 `chartConfig.js` 中添加配置函数

```javascript
// src/components/screenone/chartConfig.js

/**
 * 心电图表配置
 */
export function getEcgChartOptions(ecgData = {}) {
  return {
    title: {
      text: '心电监测',
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ecgData.time || []
    },
    yAxis: {
      type: 'value',
      name: '心率'
    },
    series: [{
      type: 'line',
      data: ecgData.heartRate || [],
      smooth: true
    }]
  }
}
```

### 步骤 2: 在页面中使用

```vue
<template>
  <CommonChart :options="ecgChartOptions" />
</template>

<script>
import CommonChart from '@/components/screenone/CommonChart.vue'
import { getEcgChartOptions } from '@/components/screenone/chartConfig'

export default {
  components: { CommonChart },
  
  computed: {
    ecgChartOptions() {
      return getEcgChartOptions(this.ecg)
    }
  }
}
</script>
```

---

## 📊 完整示例 (HomeView.vue)

```vue
<template>
  <div class="dashboard">
    <!-- 使用 CommonChart 渲染放射与超声图表 -->
    <div class="chart-container">
      <CommonChart 
        ref="blasChart" 
        :options="blasChartOptions"
      />
    </div>
  </div>
</template>

<script>
import CommonChart from '@/components/screenone/CommonChart.vue'
import { getBlasChartOptions } from '@/components/screenone/chartConfig'

export default {
  components: {
    CommonChart
  },
  
  data() {
    return {
      radiation: {
        x: [],
        y1: [],
        y2: []
      }
    }
  },
  
  computed: {
    // 计算属性返回图表配置
    blasChartOptions() {
      return getBlasChartOptions(this.radiation)
    }
  },
  
  methods: {
    // 数据更新时,计算属性会自动重新计算
    updateData(newData) {
      this.radiation = {
        x: newData.timeLabels,
        y1: newData.radiationData,
        y2: newData.ultrasoundData
      }
      // CommonChart 会自动更新图表!
    }
  }
}
</script>
```

---

## 🎨 配置函数最佳实践

### 1. 使用默认参数

```javascript
export function getChartOptions(data = {}) {
  return {
    xAxis: {
      data: data.x || []  // 提供默认值
    }
  }
}
```

### 2. 添加 JSDoc 注释

```javascript
/**
 * 获取图表配置
 * @param {Object} data - 图表数据
 * @param {Array} data.x - X轴数据
 * @param {Array} data.y - Y轴数据
 * @returns {Object} ECharts 配置对象
 */
export function getChartOptions(data = {}) {
  // ...
}
```

### 3. 提取公共配置

```javascript
// 公共配置
const commonGrid = {
  top: '15%',
  left: '4%',
  bottom: '12%',
  containLabel: true
}

const commonTooltip = {
  trigger: 'axis',
  backgroundColor: 'rgba(255,255,255,0)'
}

export function getChartOptions(data) {
  return {
    grid: commonGrid,
    tooltip: commonTooltip,
    // ... 其他配置
  }
}
```

### 4. 支持主题配置

```javascript
export function getChartOptions(data, theme = 'dark') {
  const isDark = theme === 'dark'
  
  return {
    xAxis: {
      axisLabel: {
        color: isDark ? '#fff' : '#333'
      }
    }
  }
}
```

---

## ⚡ 性能优化

### 1. 使用计算属性

```javascript
// ✅ 推荐: 使用计算属性,数据变化时自动更新
computed: {
  chartOptions() {
    return getChartOptions(this.data)
  }
}

// ❌ 不推荐: 手动调用方法
methods: {
  getOptions() {
    return getChartOptions(this.data)
  }
}
```

### 2. 防抖大量数据更新

```javascript
import { debounce } from 'lodash'

export default {
  methods: {
    updateChartData: debounce(function(newData) {
      this.chartData = newData
    }, 300)
  }
}
```

---

## 📁 文件结构

```
src/components/screenone/
├── CommonChart.vue          # 通用图表组件
├── chartConfig.js           # 图表配置函数集合
├── chartConfig.example.js   # 配置示例(可选)
├── signChart.vue            # 其他特殊图表
├── ecgChart.vue
└── ...
```

---

## 🎯 总结

| 特性 | 旧方式 | 新方式 |
|------|--------|--------|
| 代码量 | 200+ 行/组件 | 20 行配置 |
| 复用性 | ❌ 每个图表独立 | ✅ 函数可复用 |
| 维护性 | ⚠️ 分散在多个文件 | ✅ 集中在 chartConfig.js |
| 测试 | ❌ 难以测试 | ✅ 纯函数易测试 |
| 类型提示 | ❌ 无 | ✅ JSDoc 支持 |

**代码量减少 90%+**,配置更清晰,维护更简单! 🎉
