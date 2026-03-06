<template>
  <div class="man-num" ref="manNum"></div>
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
      let myChart = this.$echarts.init(this.$refs.manNum);
       window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        //
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
                        color: "#2FD587",
                        align: "center",
                        fontSize: 12,
                      },
                    },
                    formatter: function (params) {
                      return "{b|阳性}\n\n" + "{a|" + params.value + "个}";
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
                          color: "#05D2C3",
                        },
                        {
                          offset: 1,
                          color: "#2FD587",
                        },
                      ]
                    ),
                    shadowColor: "#2ba6fe",
                    shadowBlur: 0,
                  },
                },
              },
              {
                value: this.diagnosis.total,
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
.man-num {
  width: 100%;
  height: 100%;
}
</style>
