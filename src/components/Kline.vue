<template>
  <div class="kline">
    <RenderKline></RenderKline>
  </div>
</template>

<script>
import RenderKline from './RenderKline'
export default {
  components: {
    RenderKline
  },
  data() {
    return {}
  },
  methods: {
   
  }
}
</script>

<style scoped>
.kline {
  margin-top: 50px;
}
</style>
