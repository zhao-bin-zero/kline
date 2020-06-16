import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
  const store = new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    }
  });
  // 如果是浏览器环境，且存在__INITIAL_STATE__，说明后端修改了 store 数据，替换即可
  if (typeof window != 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  return store;
}