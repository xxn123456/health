<template>
  <div class="wuman-num" ref="wumanNum"></div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    diagnosisRadio: {
      type: Array,
      default:()=>{
        return []
      },
    },
  },
  methods: {
    update() {
      this.setSign();
    },
    setSign() {
      let myChart = this.$echarts.init(this.$refs.wumanNum);
       window.addEventListener("resize", () => {
        myChart.resize();
      });
      
      let option = {
        color: ["#6c50f3", "rgba(236, 169, 44, 1)", "#00ca95"],
        tooltip: {
          trigger: "item",
          formatter: "{d}%",
        },
        toolbox: {
          show: true,
        },
        legend: {
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          top: "15%",
          right: "4%",
          bottom: "12%",
          containLabel: true,
        },
        series: [
          {
            name: "业务警种",
            type: "pie",
            radius: [0, "70%"],
            label: {
              normal: {
                formatter: (params) => {
                  return params.name + params.percent.toFixed(0) + "%";
                },

                padding: [0, -5, 0, -5],
              },
            },

            data: this.diagnosisRadio,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
.wuman-num {
  width: 100%;
  height: 100%;
}
</style>
