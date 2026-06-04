<template>
  <div class="big-wrap-all">
    <div class="new-cont-warp">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
  }
};
</script>
<style>
.big-wrap-all {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #090e4e;
  position: relative;
  overflow: hidden;
}

.new-cont-warp {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.big-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.top {
  width: 98%;
  height: 60px;
  line-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 26px;
  color: #fff;
  background-image: url("../assets/newtop1.png");
  background-size: 100% 100%;
  overflow: hidden;
  background-position: center;
  margin: 5px auto 15px auto;
}

.cont {
  width: 100%;
  height: calc(100% - 120px);
}

.bottom {
  width: 100%;
  height: 40px;
  padding-bottom: 10px;
  line-height: 40px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  color: #ffffff;
  overflow: hidden;
}

.bottom-company {
  margin-top: 4px;
  height: 20px;
  width: 100%;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}

.bottom img {
  max-height: 60%;
}

.sm {
  font-size: 12px;
  height: 60%;
  line-height: 30px;
}

.d-top {
  height: 36px;
  line-height: 36px;
  width: calc(100% - 20px);
  padding-left: 20px;
  font-size: 16px;
}

.d-cont {
  width: 100%;
  height: calc(100% - 36px);
}

.edition {
  font-size: 12px;
  margin-left: 10px;
}
</style>
