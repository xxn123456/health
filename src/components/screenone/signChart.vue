<template>
  <div ref="signChart" class="sign-chart"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    serverTotal: {
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
      let myChart = this.$echarts.init(this.$refs.signChart);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      let option = {
        legend: {
          right: "5%",
          itemGap: 16,
          itemWidth: 10,
          itemHeight: 6,
          data: [
            {
              name: "放射",
            },
            {
              name: "超声",
            },
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
        color: ["#4C98FB", "#83CCE7", "#26C7C8", "#73DEBD"],
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
          data: this.serverTotal.x,
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
            type: "bar",
            name: "放射",
            stack: "总量",
            barWidth: "20",

            itemStyle: {
              color: "#6c50f3",
            },
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },
            data: this.serverTotal.y1,
          },
          {
            type: "bar",
            name: "超声",
            stack: "总量",
            barWidth: "20",

            itemStyle: {
              color: "rgba(236, 169, 44, 1)",
            },
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },

            data: this.serverTotal.y2,
          },
          {
            type: "bar",
            name: "心电",
            stack: "总量",
            barWidth: "20",

            itemStyle: {
              color: "#00ca95",
            },
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },

            data: this.serverTotal.y3,
          },
          {
            type: "bar",
            name: "会诊",
            stack: "总量",
            barWidth: "20",

            itemStyle: {
              color: "#ac4ed3",
            },
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#fff",
                fontSize: "8",
              },
            },

            data: this.serverTotal.y4,
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
