<template>
  <div class="narbar">
    <h1><img :src="logo" alt=""></h1>
    <router-link to="/">Home</router-link>
    <router-link to="/kline">Kline</router-link>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.png'
export default {
  data() {
    return {
      logo
    }
  }
}
</script>

<style scoped>
.narbar {
  text-align: center;
  background-color: #ccc;
}
h1 {
  margin-bottom: 20px;
}
</style>
