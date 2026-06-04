<template>
  <div ref="chartContainer" class="common-chart"></div>
</template>

<script>
export default {
  name: 'CommonChart',
  
  props: {
    // ECharts 配置项
    options: {
      type: Object,
      required: true,
      default: () => ({})
    },
    // 图表宽度
    width: {
      type: String,
      default: '100%'
    },
    // 图表高度
    height: {
      type: String,
      default: '100%'
    },
    // 是否显示加载动画
    loading: {
      type: Boolean,
      default: false
    },
    // 加载动画配置
    loadingOptions: {
      type: Object,
      default: () => ({
        text: '加载中...',
        color: '#2550dd',
        textColor: '#fff',
        maskColor: 'rgba(0, 0, 0, 0.3)',
        zlevel: 0
      })
    },
    // 是否自动 resize
    autoResize: {
      type: Boolean,
      default: true
    },
    // 延迟初始化时间 (ms)
    initDelay: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      chart: null,
      resizeObserver: null
    }
  },

  computed: {
    containerStyle() {
      return {
        width: this.width,
        height: this.height
      }
    }
  },

  watch: {
    // 深度监听 options 变化,自动更新图表
    options: {
      handler(newOptions) {
        this.updateChart(newOptions)
      },
      deep: true
    },
    // 监听 loading 状态
    loading(newVal) {
      this.toggleLoading(newVal)
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.initDelay > 0) {
        setTimeout(() => {
          this.initChart()
        }, this.initDelay)
      } else {
        this.initChart()
      }
    })
  },

  beforeDestroy() {
    this.disposeChart()
  },

  methods: {
    // 初始化图表
    initChart() {
      if (!this.$refs.chartContainer) {
        console.warn('[CommonChart] 容器未找到')
        return
      }

      try {
        // 销毁已存在的实例
        if (this.chart) {
          this.chart.dispose()
        }

        // 初始化 ECharts 实例
        this.chart = this.$echarts.init(this.$refs.chartContainer)

        // 设置配置项
        if (this.options && Object.keys(this.options).length > 0) {
          this.chart.setOption(this.options)
        }

        // 添加 resize 监听
        if (this.autoResize) {
          this.addResizeListener()
        }

        // 设置加载状态
        this.toggleLoading(this.loading)

        // 触发初始化完成事件
        this.$emit('initialized', this.chart)
      } catch (error) {
        console.error('[CommonChart] 初始化失败:', error)
        this.$emit('error', error)
      }
    },

    // 更新图表
    updateChart(newOptions) {
      if (!this.chart) {
        // 如果图表未初始化,等待挂载后自动初始化
        return
      }

      try {
        this.chart.setOption(newOptions, true)
        this.$emit('updated', this.chart)
      } catch (error) {
        console.error('[CommonChart] 更新失败:', error)
        this.$emit('error', error)
      }
    },

    // 切换加载状态
    toggleLoading(show) {
      if (!this.chart) return

      if (show) {
        this.chart.showLoading(this.loadingOptions)
      } else {
        this.chart.hideLoading()
      }
    },

    // 添加 resize 监听
    addResizeListener() {
      // 使用 ResizeObserver (现代浏览器)
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          this.resize()
        })
        this.resizeObserver.observe(this.$refs.chartContainer)
      } else {
        // 降级到 window resize
        this._resizeHandler = () => {
          this.resize()
        }
        window.addEventListener('resize', this._resizeHandler)
      }
    },

    // 移除 resize 监听
    removeResizeListener() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      }
      if (this._resizeHandler) {
        window.removeEventListener('resize', this._resizeHandler)
        this._resizeHandler = null
      }
    },

    // 图表 resize
    resize() {
      if (this.chart) {
        this.chart.resize()
      }
    },

    // 销毁图表
    disposeChart() {
      this.removeResizeListener()
      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    },

    // 获取 ECharts 实例
    getInstance() {
      return this.chart
    },

    // 手动刷新图表
    refresh() {
      if (this.chart) {
        this.chart.clear()
        if (this.options) {
          this.chart.setOption(this.options)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.common-chart {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
