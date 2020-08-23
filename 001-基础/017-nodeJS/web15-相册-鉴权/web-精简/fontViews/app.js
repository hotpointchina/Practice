const Koa = require('koa');
const proxy = require('koa-server-http-proxy');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');

const app = new Koa();

app.use( proxy('/api', {
    target: 'http://localhost:8080',
    pathRewrite: { 
        '^/api': ''
    }
}) );


const router = new KoaRouter();
router.get('/', ctx=>{
    ctx.redirect('/public/login.html');
});
app.use(router.routes());


// 提供静态资源服务 
app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

app.listen(9999, ()=>{
    console.log('前台--> http://localhost:9999');
});




