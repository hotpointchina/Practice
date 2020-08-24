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
    // 定义一个变量，如果匹配到数组中的内容，则可以不经过鉴权，直接放行
    let passArray = [/^\/login/, '/', /^\/public/];

    /*
      获取登录用户的图片、上传图片，需要鉴权
        - 这里做了一点处理，在做次练习的时候发现，跨域请求有不能成功携带自定义请求头的情况。
        - 即使后台做 CORS 处理，还是会会丢失自定义请求头 
        - 可能是会先行被 koa-jwt 给拦截，在中间件的处理过程中丢失了
        - 因为在主入口文件 app.js 文件中， CORS 后会 await next(); 会等待其后面的第一个中间件执行完再向后进行
        - 所以这里的处理方案是：在进入 router后先做请求路径、是否携带 token 的校验
          + 如果请求路径是 '/getPhotos' 或 '/upload'，并且 token 校验成功，则将对应路径添加到 passArray 放行数组中
    */ 
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
    /*
      - 官方文档给的示例，没有添加 async/await 的处理，直接 return next();
      - 为避免后面有异步的内容，添加了 async/await 的步骤
      - 后面的内容鉴权不成功则进入到这里
    */
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
    
    /*
      secret 是固定的 key，其值是使用 jwt 压包时设定的开包密钥
      unless 中，在其 path 数组中被匹配到的路径可以不经过鉴权直接放行
        - 在此之前定义了 passArray ，为了动态改变放行名单
    */ 
    app.use(koaJwt({secret:'greedwithfear.com'}).unless({
        // path:[/^\/login/,'/']
        path:passArray
    }));
    app.use(koaJwt({ secret: 'greedwithfear.com', passthrough: true }));
    
    
    /*
      【上传图片】
      - uploadMiddleware() return 出来的是 koa-body 中间件
      - 这样操作就解决了无论通个那个路由上传，都都转存到同一的路径下的问题
    */ 
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