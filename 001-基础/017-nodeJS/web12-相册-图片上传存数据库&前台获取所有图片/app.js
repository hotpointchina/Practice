const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const router = require('./router/router');
const app = new Koa();

app.use(KoaStaticCache('./static', {
    prefix: '/',
    gzip: true,
    dynamic: true
}));

app.use( router.routes() );
app.listen(8080,()=>{
    console.log('http://localhost:8080/index.html');
});