const fs = require('fs');
const path = require('path');
const VueServerRenderer = require('vue-server-renderer');
const Koa = require('koa');
const Router = require('@koa/router');
const static = require('koa-static');

let app = new Koa();  //创建一个server实例
let router = new Router();  //创建一个router实例

// 客户端激活需要动态插入 客户端js 需要配合json 文件拿到js 文件名字引入
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./dist/index-ssr.html', 'utf-8');

let render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest  // 会自动找到对应关系找到 客户端js 文件名字, 并插入到服务端生成的 html 模版中
});

// 匹配所有路由，并根据VueRouter列表渲染对应组件，返回html或404
router.get('*', async ctx => {
  try {
    ctx.body = await new Promise((resolve, reject) => {
      render.renderToString({url: ctx.url}, (err, html) => {
        if (err && err.code === 404) {
          resolve("Page Not Found");
        }
        resolve(html);
      })
    })
  } catch (e) {
    console.log(e);
  }
});

// 把dist设置成静态目录
app.use(static(path.resolve(__dirname, 'dist')));
// 注册路由
app.use(router.routes());
// 当请求出错时的处理逻辑
app.use(router.allowedMethods());

app.listen(3000);