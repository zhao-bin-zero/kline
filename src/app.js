import Vue from 'vue';
import App from './App.vue';
import createRouter from './createRouter';
import createStore from './createStore';

export default () => {
  let router = createRouter();
  let store = createStore();
  let app = new Vue({
    router,  // 注入路由系统
    store,  // 注入vuex
    render: h => h(App)
  })
  // 服务端应该每个请求都返回独立的实例
  return { app, router, store }
}

