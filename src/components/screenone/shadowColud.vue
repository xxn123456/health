<template>
  <div class="say-wrap">
    <div class="say-left">
      <div class="map-wrap" ref="shadowCloud">
        <slot></slot>
      </div>
    </div>
    <div class="say-right">
      <div class="say-num">
        <div class="say-num-item">
          <div class="say-num-name-title">
            <span>区域</span>
          </div>
          <div class="say-num-shu-title">
            <span> 数量/份</span>
          </div>
        </div>
        <div class="say-num-item" v-for="item in shadowColud" :key="item.index">
          <div class="say-num-name say-table-left">
            <span> {{ item.name }}</span>
          </div>
          <div class="say-num-shu say-table-right">
            <span> {{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require("echarts/map/js/china");
// 导入公共地图包
import wuhanJson from "@/util/wuhan.json";
//  this.echarts.registerMap('shanghai', geoJson);
let geoCoordMap = {
  东湖高新区: [12725273.29, 3558757.28],
  东湖风景区: [12725273.29, 3558757.28],
  黄陂区: [114.4, 30.9],
  // 1
  蔡甸区: [114.0, 30.4],
  江汉区: [114.27, 30.6],
  江岸区: [114.3, 30.6],
  // 2
  硚口区: [114.27, 30.57],
  汉阳区: [114.27, 30.55],
  青山区: [114.38, 30.63],
  //  3
  洪山区: [114.503985625, 30.5523195625],
  东西湖区: [114.0, 30.66056175],
  江夏区: [114.32, 30.24],
  // 4
  新洲区: [114.7, 30.7365407539063],
  汉南区: [114.0, 30.26],
  武昌区: [114.313985625, 30.5523195625],
};
let convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      });
    }
  }
  return res;
};

export default {
  data() {
    return {
      allShadow: 9876,
    };
  },
  props: {
    shadowColud: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    update() {
      this.setSign();
    },
    setSign() {
      var mapChart = this.$echarts.init(this.$refs.shadowCloud);
      window.addEventListener("resize", () => {
        mapChart.resize();
      });
      this.$echarts.registerMap("wuhan",wuhanJson);
      mapChart.setOption({
        title: {
          text: "机构分布与影像云报告数",
          subtext: "总数：" + this.allShadow + "/份",
          x: "left",
          textStyle: {
            color: "#ccc",
            fontSize: "75%",
          },
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "#2551dd",
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function (params) {
            //根据业务自己拓展要显示的内容
            var name = params.name;
            var value = params.value;
            return name + value;
          },
        },
        geo: {
          map: "wuhan",
          zoom: 1.2,
        },
        series: [
          {
            name: "机构分布",
            type: "effectScatter",
            left: "150",
            coordinateSystem: "geo",
            data: convertData(this.shadowColud),
            label: {
              normal: {
                formatter: "{b}",
                position: "bottom",
                color: "#fff",
                show: true,
                fontSize: "60%",
              },
            },
            itemStyle: {
              normal: {
                color: "#ffed00",
                shadowBlur: 0,
                shadowColor: "#ffed00",
                fontSize: "75%",
              },
            },
            zlevel: 1,
          },

          {
            type: "map",
            mapType: "wuhan",
            zoom: 1.2,
            roam: false, //是否开启鼠标缩放和平移漫游
            itemStyle: {
              //地图区域的多边形 图形样式
              // color: ['rgb(11,85,142)', 'rgb(13,106,177)'],
              normal: {
                //是图形在默认状态下的样式
                label: {
                  show: true, //是否显示标签
                  textStyle: {
                    color: "transparent",
                  },
                },
                borderWidth: 1,
                borderColor: "#28729f",
                areaColor: "#29b4b7",
              },
              emphasis: {
                //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label: {
                  show: false,
                  textStyle: {
                    color: "transparent",
                  },
                },
                borderColor: "#fff",
                areaColor: "#9ea9f7",
              },
            },

            data: this.shadowColud,
          },
        ],
        // ll
      });
    },
  },
};
</script>
<style scoped>
.map-wrap {
  width: 100%;
  height: 100%;
  font-size: 16px;
}

.say-wrap {
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  display: flex;
  flex-direction: row;
  padding: 15px;
}

.say-num {
  width: 80%;
  height: 100%;
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}

.say-left {
  width: 50%;
  height: 100%;
  display: table;
}

.say-right {
  width: 50%;
  padding-bottom: 30px;
  height: calc(100% - 30px);
  display: table;
}

.say-left > span,
.say-right > span {
  display: table-cell;
  vertical-align: middle;
}

/* 右侧部分 */
.say-num-item {
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
}

.say-num-name-title,
.say-num-shu-title {
  font-size: 16px;
  width: 46%;
  padding-left: 1%;
  margin-left: 1%;
}

.say-num-name,
.say-num-shu {
  width: 46%;
  padding-left: 1%;
  margin-left: 1%;
}

.say-table-left {
  background-color: rgba(31, 77, 255, 0.6);
  display: flex;
  flex-direction: row;
  align-items: center;
}

.say-table-right {
  background-color: rgba(208, 31, 103, 0.6);
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
