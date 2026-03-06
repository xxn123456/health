<template>
  <div ref="ecgChart" class="sign-chart">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sginX: [],
      sginY: [],
      timer: null,
    };
  },
  props: {
    ecg: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    update() {
      this.setSign();
    },
    setSign() {
      let myChart = this.$echarts.init(this.$refs.ecgChart);
      window.addEventListener("resize", () => {
        console.log("界面变化ecg需要更新");
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
              name: "心电",
            },
            {
              name: "会诊",
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
          data: this.ecg.x,
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
            name: "心电",
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#00ca95",
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
              color: "#00ca95",
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },

            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,202,149,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 0.9)",
                shadowBlur: 20,
              },
            },
            data: this.ecg.y1,
          },
          {
            type: "line",
            name: "会诊",
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 4,
            lineStyle: {
              normal: {
                color: "#ac4ed3",
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
              color: "#ac4ed2",
              borderColor: "#fff",
              borderWidth: 1,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0,202,149,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,202,149,0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0,202,149, 0.9)",
                shadowBlur: 20,
              },
            },
            data: this.ecg.y2,
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
