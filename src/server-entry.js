import createApp from './app';

// 服务端渲染打包需要返回一个函数
// 调用 renderToString, 会传入信息, 渲染实例
export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
  
    // 跳转时路由可能是异步加载的
    router.push(context.url);
    
    // 路由有可能懒加载，需要等待加载完成
    router.onReady(() => {
      // 前端如果没有配置路由 应该返回 404 页面
      const matchComponents = router.getMatchedComponents(); // 获取匹配的组件个数
      
      if (!matchComponents.length) {
        // 交给 server.js 处理 404
        return reject({code: 404});
      }

      // 匹配到路由了
      Promise.all(matchComponents.map(component => {
        // asyncData 只能定义在路由级别的组件中，供后端调用，操作vuex
        if (component.asyncData) {
          // 如果组件定义了 asyncData 方法，就调用，初始化state
          return component.asyncData(store);  // 必须返回promise
        }
      })).then(() => {
        // 把state放到当前上下文中
        context.state = store.state;
        resolve(app);
      });
    }, reject);
  });
}