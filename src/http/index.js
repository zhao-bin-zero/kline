import axios from 'axios';
import Vue from 'vue';

Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    let resData = response.data;

    if (resData.is_succ) {
      return resData;
    } else {
      // 提示错误
      console.info(resData.message);
      return resData;
    }
  },
  error => {
    if (error.response) {
      return error.response;
    }
    return Promise.reject(error.response.data);
  })
export default axios;
