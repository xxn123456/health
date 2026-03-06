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
    diagnosis: {
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
      let myChart = this.$echarts.init(this.$refs.wumanNum);
       window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        series: [
          {
            name: "第一个圆环",
            type: "pie",
            clockWise: false,
            radius: ["80%", "90%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                shadowBlur: 0,
                shadowColor: "#203665",
              },
            },
            hoverAnimation: false,
            center: ["50%", "50%"],
            data: [
              {
                value: this.diagnosis.num,
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#fff",
                        align: "center",
                        fontSize: 10,
                        fontWeight: "bold",
                      },
                      b: {
                        color: "#b220fa",
                        align: "center",
                        fontSize: 12,
                      },
                    },
                    formatter: function (params) {
                      return "{b|阴性}\n\n" + "{a|" + params.value + "个}";
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "12",
                      fontWeight: "normal",
                      color: "#fff",
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      1,
                      0,
                      [
                        {
                          offset: 0,
                          color: "#b51dfa",
                        },
                        {
                          offset: 1,
                          color: "#b220fa",
                        },
                      ]
                    ),
                    shadowColor: "#2ba6fe",
                    shadowBlur: 0,
                  },
                },
              },
              {
                value: this.diagnosis.all,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#24375c",
                  },
                  emphasis: {
                    color: "#24375c",
                  },
                },
              },
            ],
          },
        ],
        //
      });
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
