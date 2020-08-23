const Koa = require('koa');
const router = require('./router');
const app = new Koa();

let whiteList = [
    'http://localhost:8080',
    'http://localhost:9999'
]
// CORS
app.use( async (ctx, next) => {
    let requestOrigin = ctx.header.origin;
    if ( whiteList.includes(requestOrigin) ) {
        ctx.set('Access-Control-Allow-Origin', requestOrigin);
    }

    if (ctx.method.toLowerCase() == 'options') {
        ctx.set('Access-Control-Request-Method', 'GET,OPTIONS,POST,PUT');
        // 允许设置的头部信息；
        ctx.set("Access-Control-Allow-Headers","Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild, authorization");
        // 允许前端获取的头部
        ctx.set("Access-Control-Expose-Headers","Date,Authorization");
        ctx.set("Access-Control-Allow-Credentials",true);
        ctx.set("Access-Control-Max-Age", "1728000");

        ctx.body = '';
    }
    
    await next();
} )

router(app);
app.listen(8080, ()=>{
    console.log('后台--> http://localhost:8080');
});