<template>
  <div class="performance">
    <div ref="performance" class="performance-chart">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      perforX: [],
      perforY: [],
      perforAll: 0,
      perforAva: 0,
      load: true,
    };
  },
  props: {
    patient: {
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
      let myChart = this.$echarts.init(this.$refs.performance);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      let option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "16%",
          left: "3%",
          bottom: "3%",
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
          axisLine: {
            lineStyle: {
              color: "#616582",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            fontSize: "12",
            color: "#fff",
          },
          data: this.patient.x,
        },
        yAxis: {
          type: "value",
          name: "/次",
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
          axisLabel: {
            fontSize: "75%",
          },
        },
        series: [
          {
            type: "bar",
            barWidth: 16,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#8e0cfa",
                  },
                  {
                    offset: 0.5,
                    color: "#406ae3",
                  },
                  {
                    offset: 1,
                    color: "#09aad6",
                  },
                ]),
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontSize: "75%",
                  },
                },
              },
            },
            data: this.patient.y1,
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
.performance {
  height: 100%;
  width: 100%;

  .performance-title {
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    text-align: left;
    margin-left: 5%;
    .per-phone {
      position: relative;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
    }
  }

  .performance-chart {
    height: 100%;
    width: 100%;
    font-size: 12px;
  }
}
</style>
