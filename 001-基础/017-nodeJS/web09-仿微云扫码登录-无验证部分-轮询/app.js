const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');

const app = new Koa();
const router = new KoaRouter();
app.use( KoaStaticCache('./views', {
    prefix:'/',
    gzip:true,
    dynamic:true
}) );

let id=0;
let user = null;

router.get('/check', (ctx)=>{
    if(!user){
        ctx.body = {
            status:0,
            mes:'未登录'
        };
    }else{
        ctx.body = {
            status:1,
            mes:'登录成功'
        };
    }
});

router.get('/user', ctx=>{
    user = {
        id:id++
    };
});
app.use( router.routes() );
app.listen(8080,()=>{console.log('http://localhost:8080')});