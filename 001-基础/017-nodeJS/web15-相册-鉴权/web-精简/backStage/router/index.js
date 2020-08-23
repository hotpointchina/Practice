const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const KoaBody = require('koa-body');
const koaJwt = require('koa-jwt');

const uploadMiddleware = require('../middlewares/upload');
const loginCtrl = require('../controller/login');
const photosCtrl = require('../controller/photos');

const tokenCheck = require('../verify/tokenCheck');


const router = new KoaRouter();
module.exports = function(app){
    
    let passArray = [/^\/login/, '/', /^\/public/];

    app.use(async (ctx,next)=>{
        if(
            ctx.request.url == '/getPhotos' &&
            ctx.header.authorization
        ){
            let tokenStatus = tokenCheck(ctx.header.authorization);
            ctx.state.jwtdata = tokenStatus;
    
            if( tokenStatus.code == 1 ){
                console.log('routerIndex/getPhotos - token 验证通过-->', tokenStatus);
                passArray.push('/getPhotos');
            }
        }
        if(
            ctx.request.url == '/upload' &&
            ctx.header.authorization
        ){
            let tokenStatus = tokenCheck(ctx.header.authorization);
            ctx.state.jwtdata = tokenStatus;
    
            if( tokenStatus.code == 1 ){
                console.log('routerIndex/getPhotos - token 验证通过-->', tokenStatus);
                passArray.push('/upload');
            }
        }
        await next();
    });


    // 路由鉴权
    app.use(async function(ctx, next){
        return await next().catch((err) => {
            if (401 == err.status) {
                console.log('[ 路由鉴权 ERR] header -->', ctx.request.header);

                ctx.status = 401;
                ctx.body = 'Protected resource, use Authorization header to get access\n';
            } else {
                throw err;
            }
        });
    });

   
    // 获取所有图片
    router.get('/getPhotos',  photosCtrl.get );
    
  
    app.use(koaJwt({secret:'greedwithfear.com'}).unless({
        // path:[/^\/login/,'/']
        path:passArray
    }));
    app.use(koaJwt({ secret: 'greedwithfear.com', passthrough: true }));
    
    
    // 上传图片
    router.post('/upload', uploadMiddleware(), photosCtrl.add );
    
    router.post('/login', KoaBody({
        multipart: true
    }),  loginCtrl );

    
    // 静态文件代理
    app.use(KoaStaticCache('./public', {
        prefix: '/public',
        gzip: true,
        dynamic: true
    }));
    
    app.use( router.routes() );
}