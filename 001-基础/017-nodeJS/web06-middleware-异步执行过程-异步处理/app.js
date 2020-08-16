const Koa = require('koa');
const KoaRouter = require('koa-router');
const app = new Koa();
const router = new KoaRouter();

// app.use((ctx, next)=>{
//     next();
//     console.log(111);
// });

// app.use((ctx, next)=>{
//     setTimeout(()=>{
//         console.log(222);
//     });
//     // setTimeout 没有设置时间
//     next();
// });

// app.use((ctx, next)=>{
//     console.log(333);
//     next();
// });

// app.use((ctx, next)=>{
//     console.log(444);
//     next();
// });

// 中间件 => 函数调用的过程（递归）
app.use(  (ctx, next) => {
    console.log(1111);
    // next 类似 promise 的 resolve 方法
     next();
} );

app.use( async (ctx, next) => {
    await new Promise(resolve => {
        setTimeout(() => {
            console.log(2222);
            resolve();
        }, 3000);
    })
    next();
} );

router.get('/', ctx=>{
    console.log(3333);
    ctx.body = '<h1>Greed with fear.</h1>';
});
app.use( router.routes() );
app.listen(8080, ()=>{
    console.log('The server is done. --> http://localhost:8080');
});