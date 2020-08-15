const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaBody = require('koa-body');
const router = require('./router');

const app = new Koa();
app.use( KoaBody({
    multipart: true,
    formidable: {
        uploadDir: __dirname + '/static/upload',
        keepExtensions: true
    }
}) );
app.use(KoaStatic(__dirname + '/static'));
app.use(router.routes());


app.listen(8080,()=>{
    console.log('服务已启动：http://localhost:8080');
    console.log('作业URL：http://localhost:8080');
    console.log('作业URL也可以：http://localhost:8080/index.html');
});
