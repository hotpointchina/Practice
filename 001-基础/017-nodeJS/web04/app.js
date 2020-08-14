const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaBody = require('koa-body');
const router = require('./router');

const app = new Koa();

app.use(KoaStaticCache('./static',{
    prefix: '/static',
    gzip: true,
    dynamic:true
}));

app.use( KoaBody({
    multipart: true,
    formidable: {
        uploadDir: __dirname + '/static/upload',
        keepExtensions: true
    }
}) );

app.use(router.routes());
app.listen(8080,()=>{
    console.log('服务已启动：http://localhost:8080');
});





