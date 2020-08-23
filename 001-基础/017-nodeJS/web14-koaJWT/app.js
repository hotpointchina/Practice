const koaStaticCache = require('koa-static-cache');
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const koaBody = require('koa-body');

const koaJwt = require('koa-jwt'); //路由权限控制

const app = new Koa();
const  router = new Router();

//秘钥
const jwtSecret = 'jwtSecret'
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function(ctx, next){
    return next().catch((err) => {
        if (401 == err.status) {
            console.log('[ERR]-->', ctx.request.url);
            console.log('[ERR] header -->', ctx.request.header);
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});

app.use(koaJwt({secret:jwtSecret}).unless({
    path:[/^\/login/,'/']
}))

router.get('/', (ctx) => {
    ctx.body = 'Hello koa-jwt'
})

router.get('/t', (ctx) => {
    ctx.body = 'tttt-111'
})


app.use(koaStaticCache('./views',{
    prefix: '/login',
    gzip: true,
    dynamic: true
}));
router.get('/login',  (ctx=>{
    ctx.body = '<b>login</b>'
    console.log('get - /login');
}));

router.post('/login', koaBody(), (ctx) => {

    
    const user = ctx.request.body;
    // const user = JSON.parse(ctx.request.body);
    // console.log('ctx.request-->',ctx.request);
    console.log('ctx.request.body-->',ctx.request.body);
    console.log('== user == -->', user.name);

    if (user && user.name){
        let payload = {
            exp:Date.now() + tokenExpiresTime,
            name:user.name
        }
        let token = jwt.sign(payload, jwtSecret)

        ctx.body = {
            user:user.name,
            code:1,
            token
        }
    }else {
        ctx.body = {
            code:-1
        }
    }
})

// E:\FrontEnd-Study\KaiKeBa\003-开课吧--课件\00-直播课\A-直播课-20191129-前后端交互02\code

router.get('/userInfo', ctx => {
    let token = ctx.header.authorization;
    console.log('/userInfo--> ', token);

    ctx.body = {
        token:token,
        user:ctx.state.user
    }

    //使用jwt-simple自行解析数据
   let payload = jwt.verify(token.split(' ')[1], jwtSecret);
   console.log(payload)
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(7070, () => {
    console.log('app listening 7070...')
})