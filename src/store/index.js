import Vue from 'vue';
import Vuex from 'vuex';
import big from "./modules/big";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
      big
    }
  
  })