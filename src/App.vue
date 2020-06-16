<template>
  <div id="app">
    <div>
      <Navbar></Navbar>
      <!-- 前端路由渲染 通过histor api 实现 -->
      <!-- 只有强制刷新首屏才需要服务端渲染，后续路由都是前端渲染 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/common/Navbar';
export default {
  components: {
    Navbar
  }
}
</script>