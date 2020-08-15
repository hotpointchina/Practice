const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.post('/upload', ctx=>{
    console.log('--file-->', ctx.request.files);
    ctx.body = `
        <h1>添加成功</h1>
        <a href="/static/index.html">返回</a>
    `;
});
module.exports = router;