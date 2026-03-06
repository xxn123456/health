<template>
  <div ref="blasChart" class="sign-chart">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    radiation: {
      type: Object,
      default: ()=>{
        return {}
      },
    },
  },
  methods: {
    update() {
      this.setSign();
    },
    setSign() {
      let myChart = this.$echarts.init(this.$refs.blasChart);
       window.addEventListener("resize", () => {
        myChart.resize();
      });
      let option = {
        legend: {
          right: "5%",
          itemGap: 16,
          itemWidth: 18,
          itemHeight: 10,
          data: [
            {
              name: "放射",
            },
            {
              name: "超声",
            },
          ],
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },

        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            label: "cross",
            show: true,
          },

          backgroundColor: "rgba(255,255,255,0)", //设置背景图片 rgba格式

          borderWidth: "1", //边框宽度设置1
          borderColor: "gray", //设置边框颜色
          textStyle: {
            // color: "black" //设置文字颜色
          },
        },
        grid: {
          top: "15%",
          left: "4%",
          bottom: "12%",
          containLabel: true,
        },
        dataZoom: [
          //滑动条
          {
            xAxisIndex: 0,
            show: false,
            type: "slider",
            startValue: 0,
            endValue: 4,
          },
        ],

        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#616582",
            },
          },

          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: "75%",
            color: "#fff",
          },
          data: this.radiation.x,
        },
        yAxis: {
          type: "value",
          name: "/人",
          nameTextStyle: {
            fontSize: "75%",
            color: "#fff",
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#616582",
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#616582",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: "75%",
          },
        },
        series: [
          {
            type: "line",
            name: "放射",
            showAllSymbol: true,

            symbol: "circle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#6c50f3",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },
            itemStyle: {
              color: "#6c50f3",
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },

            data: this.radiation.y1,
          },
          {
            type: "line",
            name: "超声",
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "rgba(236, 169, 44, 1)",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },
            itemStyle: {
              color: "rgba(236, 169, 44, 0.8)",
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },

            data: this.radiation.y2,
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
.sign-chart {
  width: 100%;
  height: 100%;
}
</style>
