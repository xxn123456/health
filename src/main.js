import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import echarts from 'echarts'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client';
Vue.use(new VueSocketIO({
  debug: false,
  // connection: SocketIO('ws://192.168.0.102:3000', {
  //   autoConnect: false
  // })
  connection: SocketIO('ws://shutiaogege.top:3000',{
    autoConnect: false
  })
})
)
Vue.use(ElementUI);
Vue.use(vueSwiper);
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
