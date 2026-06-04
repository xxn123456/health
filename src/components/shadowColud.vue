<template>
  <div v-if="shadowCloud && shadowCloud.length > 0" class="shadow-cloud-container">
    <div class="map-section">
      <div class="map-chart" ref="shadowCloud"></div>
    </div>
    <div class="data-section">
      <div class="data-table">
        <div class="table-header">
          <div class="header-cell header-region">
            <span>区域</span>
          </div>
          <div class="header-cell header-count">
            <span>数量/份</span>
          </div>
        </div>
        <div 
          class="table-row" 
          v-for="(item, index) in shadowCloud" 
          :key="index"
        >
          <div class="table-cell cell-region">
            <span>{{ item.name }}</span>
          </div>
          <div class="table-cell cell-count">
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入地图数据
import wuhanJson from '@/util/wuhan.json';
// 导入地图配置工具
import { convertData } from '@/util/mapConfig';
export default {
  name: 'ShadowCloud',
  props: {
    shadowCloud: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null,
      resizeHandler: null,
      autoHighlightTimer: null,
      currentIndex: 0
    };
  },
  computed: {
    /**
     * 计算总报告数
     */
    totalReports() {
      if (!Array.isArray(this.shadowCloud)) return 0;
      return this.shadowCloud.reduce((sum, item) => sum + (item.value || 0), 0);
    },
    
    /**
     * 地图图表配置
     */
    mapChartOptions() {
      return {
        title: {
          text: '机构分布与影像云报告数',
          subtext: `总数:${this.totalReports}/份`,
          x: 'left',
          textStyle: {
            color: '#ccc',
            fontSize: '75%'
          }
        },
        
        tooltip: {
          trigger: 'item',
          backgroundColor: '#2551dd',
          borderColor: '#FFFFCC',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: (params) => {
            const name = params.name;
            const value = params.value;
            
            // 地图系列 (seriesIndex: 1) 直接显示数值
            if (params.seriesIndex === 1) {
              return `${name}: ${value}`;
            }
            
            // 散点系列 (seriesIndex: 0) value 是 [经度, 纬度, 数值]
            if (Array.isArray(value) && value.length >= 3) {
              return `${name}: ${value[2]}`;
            }
            
            return `${name}: ${value}`;
          }
        },
        geo: {
          map: 'wuhan',
          zoom: 1.2
        },
        series: [
          {
            name: '机构分布',
            type: 'effectScatter',
            left: '150',
            coordinateSystem: 'geo',
            data: convertData(this.shadowCloud),
            label: {
              normal: {
                formatter: '{b}',
                position: 'bottom',
                color: '#fff',
                show: true,
                fontSize: '60%'
              }
            },
            itemStyle: {
              normal: {
                color: '#ffed00',
                shadowBlur: 0,
                shadowColor: '#ffed00',
                fontSize: '75%'
              }
            },
            zlevel: 1
          },
          {
            type: 'map',
            mapType: 'wuhan',
            zoom: 1.2,
            roam: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: 'transparent'
                  }
                },
                borderWidth: 1,
                borderColor: '#28729f',
                areaColor: '#29b4b7'
              },
              emphasis: {
                label: {
                  show: false,
                  textStyle: {
                    color: 'transparent'
                  }
                },
                borderColor: '#fff',
                areaColor: '#9ea9f7'
              }
            },
            data: this.shadowCloud
          }
        ]
      };
    }
  },
  
  watch: {
    shadowCloud: {
      handler() {
        this.updateChart();
        // 数据更新后重启自动高亮
        this.stopAutoHighlight();
        this.$nextTick(() => {
          this.startAutoHighlight();
        });
      },
      deep: true
    }
  },
  
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.startAutoHighlight();
    });
  },
  
  beforeDestroy() {
    this.stopAutoHighlight();
    this.disposeChart();
  },
  
  methods: {
    /**
     * 初始化图表
     */
    initChart() {
      try {
        if (!this.$refs.shadowCloud) {
          console.error('[ShadowCloud] 图表容器未找到');
          return;
        }
        
        // 注册地图
        this.$echarts.registerMap('wuhan', wuhanJson);
        
        // 初始化图表实例
        this.chart = this.$echarts.init(this.$refs.shadowCloud);
        
        // 设置图表配置
        this.chart.setOption(this.mapChartOptions);
        
        // 添加 resize 监听器
        this.addResizeListener();
      } catch (error) {
        console.error('[ShadowCloud] 图表初始化失败:', error);
      }
    },
    
    /**
     * 添加窗口 resize 监听器
     */
    addResizeListener() {
      if (!this.chart) return;
      
      // 移除旧的监听器
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
      }
      
      // 创建新的监听器
      this.resizeHandler = () => {
        if (this.chart) {
          this.chart.resize();
        }
      };
      
      window.addEventListener('resize', this.resizeHandler);
    },
    
    /**
     * 更新图表
     */
    updateChart() {
      if (!this.chart) {
        this.initChart();
        return;
      }
      
      try {
        this.chart.setOption(this.mapChartOptions, true);
      } catch (error) {
        console.error('[ShadowCloud] 图表更新失败:', error);
      }
    },
    
    /**
     * 销毁图表实例
     */
    disposeChart() {
      // 移除 resize 监听器
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
        this.resizeHandler = null;
      }
      
      // 销毁图表实例
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
    },
    
    /**
     * 开启自动高亮循环
     */
    startAutoHighlight() {
      if (!this.chart || !Array.isArray(this.shadowCloud) || this.shadowCloud.length === 0) {
        return;
      }
      
      // 清除已有的定时器
      this.stopAutoHighlight();
      
      // 按数值排序,从高到低
      const sortedData = [...this.shadowCloud]
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value);
      
      if (sortedData.length === 0) return;
      
      this.currentIndex = 0;
      
      // 立即高亮第一个
      this.highlightRegion(sortedData[0].name);
      
      // 每 2 秒切换下一个
      this.autoHighlightTimer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % sortedData.length;
        this.highlightRegion(sortedData[this.currentIndex].name);
      }, 2000);
    },
    
    /**
     * 高亮指定区域
     */
    highlightRegion(name) {
      if (!this.chart) return;
      
      // 取消之前的高亮
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 1,
        name: '*'
      });
      
      // 高亮当前区域
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 1,
        name: name
      });
      
      // 显示 tooltip (使用地图系列 seriesIndex: 1)
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 1,
        name: name
      });
    },
    
    /**
     * 停止自动高亮循环
     */
    stopAutoHighlight() {
      if (this.autoHighlightTimer) {
        clearInterval(this.autoHighlightTimer);
        this.autoHighlightTimer = null;
      }
      
      // 取消所有高亮
      if (this.chart) {
        this.chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 1,
          name: '*'
        });
        
        this.chart.dispatchAction({
          type: 'hideTip'
        });
      }
    },
    
    /**
     * 对外暴露的更新方法 (兼容旧接口)
     */
    update() {
      this.updateChart();
    }
  }
};
</script>
<style scoped lang="scss">
// 变量定义
$primary-blue: rgba(31, 77, 255, 0.6);
$primary-pink: rgba(208, 31, 103, 0.6);
$text-color: #fff;
$border-color: rgba(255, 255, 255, 0.1);

// 主容器
.shadow-cloud-container {
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  padding: 15px;
}

// 地图区域
.map-section {
  width: 50%;
  height: 100%;
  display: table;
}

.map-chart {
  width: 100%;
  height: 100%;
  font-size: 16px;
}

// 数据区域
.data-section {
  width: 50%;
  padding-bottom: 30px;
  height: calc(100% - 30px);
  display: table;
}

// 数据表格
.data-table {
  width: 80%;
  height: 100%;
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}

// 表头
.table-header {
  .header-cell {
    font-size: 16px;
    width: 46%;
    padding-left: 1%;
    margin-left: 1%;
  }
  
  .header-region,
  .header-count {
    // 表头单元格通用样式
  }
}

// 表格行
.table-row {
  width: 100%;
  height: calc((99% - 30px) / 18);
  font-size: 12px;
  padding-left: 4px;
  margin-bottom: 0.5%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  float: left;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

// 表格单元格
.table-cell {
  width: 46%;
  padding-left: 1%;
  margin-left: 1%;
}

// 区域单元格 (左侧)
.cell-region {
  background: linear-gradient(to right, $primary-blue, rgba(31, 77, 255, 0.1));
  display: flex;
  flex-direction: row;
  align-items: center;
}

// 数量单元格 (右侧)
.cell-count {
  background: linear-gradient(to right, $primary-pink, rgba(208, 31, 103, 0.1));
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* 响应式调整 */
@media screen and (max-width: 1440px) {
  .shadow-cloud-container {
    padding: 10px;
  }
  
  .data-table {
    width: 90%;
    margin-left: 10px;
  }
}

@media screen and (max-width: 1200px) {
  .shadow-cloud-container {
    flex-direction: column;
    
    .map-section,
    .data-section {
      width: 100%;
    }
  }
}
</style>
