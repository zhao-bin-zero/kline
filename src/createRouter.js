import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import(/* webpackChunkName: "Home" */'./components/Home.vue');
const Kline = () => import(/* webpackChunkName: "Kline" */'./components/Kline.vue');

Vue.use(VueRouter);

export default () => {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/kline', component: Kline }
    ]
  })
  return router;
}