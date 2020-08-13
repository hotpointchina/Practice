const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/getData', ctx=>{
    let message = {name:'koa'};
    ctx.res.setHeader("Content-Type", "application/json");
    ctx.body = JSON.stringify(message);
});



app.use(router.routes());
const port = 8080;
app.listen(port, ()=>{
    console.log(`您的服务已启动：http:/\/\localhost:${port}`);
});

