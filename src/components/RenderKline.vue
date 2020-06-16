<template>
  <div>
    <div id="myCanvasBox"></div>
  </div>
</template>

<script>
import { getHistoryQuote } from '@/http/power';
import RenderKLine from '@/common/render-kline';
import { getTimes } from '@/common/utils';
export default {
  name: 'render',
  mounted() {
    this.kLine = new RenderKLine("myCanvasBox", this.options);
    this.date = getTimes(new Date().getTime());
    this.renderHistoryData();
    this.renderRealTimeData();
  },
  data() {
    return {
      type: 5,
      page: 0,
      limit: 300,
      data: [],
      loadRealStatus: false,
      options: {
        sharpness: 2,
        blockWidth: 11,
        horizontalCells: 10,
        crossLineStatus: true
      }
    }
  },
  methods: {
    renderHistoryData(reloadData) {
      this.kLine.loading();
      getHistoryQuote({
        symbol: 'XAUUSD',
        type: this.type,
        // stop_time: this.date,
        stop_time: '2020-04-21 14:00:00',
        offset: this.page++ * this.limit,
        limit: this.limit
      }).then(res => {
        // console.log(res);
        if (res.is_succ) {
          this.data = res.data.records;
          this.kLine.updateHistoryQuote({data: this.data, type: this.type, callback: this.renderHistoryData, reloadData});
          this.loadRealStatus = true;
        }
      })
    },
    renderRealTimeData() {
      let realTime = `{
        "time": 1575858840, 
        "open_price": "1690.91", 
        "high": "1692.12", 
        "low": "1689.96", 
        "close": "1691.91", 
        "vol": 102
      }`;
      // 模拟实时数据
      setInterval(() => {
        if (!this.loadRealStatus) return;
        let realTimeCopy = JSON.parse(realTime);
        realTimeCopy.time = parseInt(new Date().getTime()/1000);
        realTimeCopy.close = (1690.96 - (Math.random() * 2 - 1)).toFixed(2);
        this.kLine.updateRealTimeQuote(realTimeCopy);
      }, parseInt(Math.random() * 1000 + 500))
    }
  }
}
</script>

<style scoped>
#myCanvasBox {
  width: 80%;
  height: 500px;
  border: 10px solid #ccc;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
}
</style>
