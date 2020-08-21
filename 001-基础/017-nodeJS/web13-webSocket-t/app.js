const http = require('http');
const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const moment = require('moment');
const cookie = require('cookie');
const socketIo = require('socket.io');


// node http
// 因为我们这个应用除了要websocket服务，还提供http的服务（静态资源，基于http的数据请求）
// const server = http.createServer( function(req, res) {
//     // 处理http请求
// } );

// 并不是用app来启动服务，而只是用它来帮助我们代理处理请求的回调
const app = new Koa();

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));

const router = new KoaRouter();

router.get('/getData', async ctx => {
    ctx.body = '开课吧';
});

app.use( router.routes() );

// app.callback() 返回的就是一个 function(req, res) {} 函数
const server = http.createServer( app.callback() );

// 处理websocket请求
let io = socketIo( server );

let users = [];

io.on('connection', socket => {
    // console.log('有人通过socket链接了', socket.request.headers.cookie);
    let cookies = cookie.parse(socket.request.headers.cookie);
    if (!cookies || !cookies.user) {
        return;
    }
    // console.log('cookies', cookies);
    let user = JSON.parse(cookies.user);

    if (!user.id) {
        return;
    }

    users.push({
        ...user,
        socket
    });

    // 同时，发送一个欢迎到消息给当前这个链接socket
    socket.emit('hello', `欢迎你，你是我们的第 ${users.length} 个客人`);
    socket.broadcast.emit('hello', `${socket.id} 进来了，大家欢迎👏!`);

    // 把接收到的message转发到每一个链接的socket上
    socket.on('message', message => {
        console.log('message', message);
        // socket.emit('message', message);
        // socket.broadcast.emit('message', message);

        message = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]： ${message}`;
        users.forEach(user => {
            user.emit('message', message);
        });
    });

    socket.on('privateMessage', data => {
        data = {fromUserId: 1, toUserId: 2, message: '我稀饭你'}
        let user = users.find( data.toUserId );
        user.socket.emit('privateMessage', {
            fromUserId: 1, 
            fromUserName: user.name,
            toUserId: 2, 
            message,
        })
    })
})

server.listen(8081);

