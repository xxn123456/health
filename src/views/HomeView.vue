<template>
  <div class="big-wrap">
    <div class="top" @click="test">
      <span>远程诊断-实时监控平台</span>
    </div>
    <div class="cont">
      <div class="screen-one">
        <div class="doctor">
          <div class="doctor-ms">
            <img src="@/assets/top1.png" alt="" />
          </div>
          <div class="doctor-resposen">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>服务总量统计</span>
            </div>
            <div class="d-cont">
              <sign ref="sign" :serverTotal="serverTotal"></sign>
            </div>
          </div>
          <div class="doctor-orgin">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>放射与超声服务数</span>
            </div>
            <div class="d-cont">
              <blas-chart ref="blasChart" :radiation="radiation"></blas-chart>
            </div>
          </div>
          <div class="doctor-server">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>心电与会诊</span>
            </div>
            <div class="d-cont">
              <ecg-chart ref="ecg" :ecg="ecg"></ecg-chart>
            </div>
          </div>
        </div>
        <!-- 中间部分 -->
        <div class="medical">
          <div class="medical-ms">
            <img src="@/assets/top2.png" alt="" />
          </div>
          <div class="enter-num">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>机构接入数</span>
            </div>
            <div class="enter-cont">
              <div
                class="enter-item"
                v-for="orginenter in orginenters"
                :key="orginenter.index"
              >
                <img :src="orginenter.url" alt="" />
                <div class="enter-mian">
                  {{ orginenter.title
                  }}<span
                    class="enter-span"
                    :style="{ color: orginenter.orgincolor }"
                    >{{ orginenter.num }}</span
                  >
                  家
                </div>
              </div>
            </div>
          </div>
          <div class="work-total">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>用户业务量统计</span>
            </div>
            <div class="work-mian">
              <div class="work-item">
                <div v-for="item in work.one" :key="item.index">
                  {{ item.name }}: <span class="work-time">{{ item.sl }}</span>
                </div>
              </div>
              <div class="work-item">
                <div v-for="item in work.two" :key="item.index">
                  {{ item.name }}: <span class="work-time">{{ item.sl }}</span>
                </div>
              </div>
              <div class="work-item">
                <div v-for="item in work.three" :key="item.index">
                  {{ item.name }}: <span class="work-time">{{ item.sl }}</span>
                </div>
              </div>
              <div class="work-item">
                <div v-for="item in work.four" :key="item.index">
                  {{ item.name }}: <span class="work-time">{{ item.sl }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 小轮播部分 -->
          <div class="my-map">
            <shadow-colud
              ref="shadowColud"
              :shadowColud="shadowColud"
            ></shadow-colud>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="consoult">
          <div class="consoult-ms">
            <img src="@/assets/top3.png" alt="" />
          </div>
          <div class="consoult-base">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>阴阳性诊断</span>
            </div>
            <div class="d-cont">
              <div class="neg-mas">
                <div class="neg-wrap">
                  <neg-chart
                    ref="negChart"
                    :diagnosis="diagnosisYang"
                  ></neg-chart>
                </div>
                <div class="mas-wrap">
                  <mas-chart
                    ref="masChart"
                    :diagnosis="diagnosisYing"
                  ></mas-chart>
                </div>
              </div>
            </div>
          </div>
          <div class="consoult-file">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>阴阳性统计占比</span>
            </div>
            <div class="d-cont">
              <neg-radio
                ref="diagnosisRadio"
                :diagnosisRadio="diagnosisRadio"
              ></neg-radio>
            </div>
          </div>
          <div class="consoult-concat">
            <div class="d-top">
              <span class="doctor-line"></span>
              <span>患者来源统计</span>
            </div>
            <div class="d-cont">
              <server ref="patient" :patient="patient"></server>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-company">
        某医院信息技术发布平台<span class="edition">版本1.0</span>
      </div>
      <div class="sm">久别提供技术支持</div>
    </div>
  </div>
</template>
<script>
import sign from "@/components/screenone/signChart.vue";
import blasChart from "@/components/screenone/blasChart.vue";
import ecgChart from "@/components/screenone/ecgChart.vue";
import shadowColud from "@/components/screenone/shadowColud.vue";
import negChart from "@/components/screenone/negChart.vue";
import masChart from "@/components/screenone/masChart.vue";
import negRadio from "@/components/screenone/ngeRadio.vue";
import server from "@/components/screenone/serverChart.vue";
export default {
  data() {
    return {
      serverTotal: {},
      radiation: {},
      ecg: {},
      diagnosisYang: {},
      diagnosisYing: {},
      patient: {},
      shadowColud: [],
      diagnosisRadio: [],
      work: {},
      orginenters: [
        {
          url: require("@/assets/enter1.png"),
          title: "三级医疗机构数",
          orgincolor: "#01B3D1",
          num: 0,
        },
        {
          url: require("@/assets/enter2.png"),
          title: "二级医疗机构数",
          orgincolor: "#FFB507",
          num: 0,
        },
        {
          url: require("@/assets/enter3.png"),
          title: "基层医疗机构数",
          orgincolor: "#9701FD",
          num: 0,
        },
      ],
    };
  },
  components: {
    sign,
    server,
    blasChart,
    negChart,
    masChart,
    negRadio,
    ecgChart,
    shadowColud,
  },
  mounted() {
    this.$alert(
      "是否与远程数据建立实时连接,连接大概需要1-3s时长,此数据来源3s更新一次",
      "通知",
      {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$socket.connect();
        },
      }
    );
    this.sockets.subscribe("his_push", (res) => {
      this.queryHis(res);
    });
  },
  methods: {
    test() {
      this.$socket.emit("his", "测试内容");
    },
    queryHis(data) {
      this.serverTotal = data.serverTotal;
      this.radiation = data.radiation;
      this.ecg = data.ecg;
      this.work = data.work;
      this.orginenters[0].num = data.orginenters[0];
      this.orginenters[1].num = data.orginenters[1];
      this.orginenters[2].num = data.orginenters[2];
      this.diagnosisYang = data.diagnosisYang;
      this.diagnosisYing = data.diagnosisYing;
      this.patient = data.patient;
      this.diagnosisRadio = data.diagnosisRadio;
      this.shadowColud = data.shadowColud;
      this.updateChart();
    },
    updateChart() {
      this.$nextTick(() => {
        this.$refs.sign.update();
        this.$refs.blasChart.update();
        this.$refs.ecg.update();
        this.$refs.negChart.update();
        this.$refs.masChart.update();
        this.$refs.diagnosisRadio.update();
        this.$refs.patient.update();
        this.$refs.shadowColud.update();
      });
    },
  },
};
</script>
<style scoped>
.screen-one {
  width: calc(100% - 30px);
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* 下面为主题部分 */
.doctor {
  width: 378px;
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  font-size: 16px;
}

.medical {
  width: calc(100% - 776px);
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
}

.consoult {
  width: 378px;
  height: 100%;
}

.doctor-ms,
.medical-ms,
.consoult-ms {
  height: 36px;
  margin-bottom: 4px;
  margin-top: 10px;
}

.doctor-ms img,
.medical-ms img,
.consoult-ms img {
  max-width: 100%;
  height: 36px;
}

/* 家庭医生 */
.doctor-resposen,
.doctor-orgin,
.doctor-server {
  height: calc((100% - 50px) / 3);
  font-size: 16px;
}

/* 双向会诊 */
.consoult-base,
.consoult-file,
.consoult-concat {
  height: calc((100% - 50px) / 3);
  font-size: 16px;
}

/* 图标结构 */
.d-top {
  height: 36px;
  line-height: 36px;
  width: calc(100% - 20px);
  padding-left: 20px;
  font-size: 16px;
}

.d-cont {
  height: calc(100% - 36px);
}

.doctor-line {
  display: inline-block;
  width: 3px;
  height: 15px;
  background-color: #2550dd;
  position: relative;
  top: 2px;
}

/* 中间部分 */
.enter-num {
  height: 100px;
}

.work-total {
  height: 150px;
  margin-bottom: 10px;
}

.enter-cont {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #0b0b49;
}

.enter-item {
  width: 33.3%;
  display: inline-flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  line-height: 30px;
}

.enter-item > img {
  width: 32px;
  height: 32px;
  margin-right: 15px;
}

.enter-span {
  margin-left: 10px;
  margin-right: 10px;
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
}

@media screen and (max-width: 1200px) {
  .enter-span {
    margin-left: 0px;
    margin-right: 0px;
  }
}

.work-mian {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.work-item {
  width: 20%;
  height: 90px;
  background-image: url("../assets/frame.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.work-item > div {
  height: 33.3%;
}

.work-time {
  display: inline-block;
  margin-left: 8px;
}

.neg-mas {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.neg-wrap {
  width: 130px;
  height: 130px;
}
.mas-wrap {
  width: 130px;
  height: 130px;
}

.my-map {
  height: calc(100% - 310px);
  background-image: url("../assets/map.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
  overflow: hidden;
}

@media screen and (max-width: 1200px) {
  .work-item {
    font-size: 12px;
    white-space: nowrap;
  }

  .work-item > div {
    -webkit-transform: scale(0.8);
  }
}
</style>
