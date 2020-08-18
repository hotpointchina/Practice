const fs = require('fs');
const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-body');
const app = new Koa();
const router = new KoaRouter();
const moment = require('moment');

const usersVIP = [
    {
        id:0,
        name:'a',
        pwd:'a'
    },
    {
        id:1,
        name:'cctv',
        pwd:'ccc'
    }
];

app.use(KoaBody());
app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}));


// app.use((ctx, next)=>{
//     ctx.req.post = function(){
//         if(ctx.req.url == '/check'){
//             let {name, pwd} = JSON.parse(ctx.request.body);
//             console.log('【name, pwd】-->', name, pwd);
//             usersVIP.forEach(vip=>{
//                 if(vip.name === name && vip.pwd === pwd){
//                     ctx.body = '';
//                     ctx.body = {
//                         status:1,
//                         mes:'登录成功！'
//                     };
//                     // ctx.res.write('1');
//                     next();
//                 }
//             });
//         }   
//     };
// });
router.post('/check', (ctx, next)=>{
    let {name, pwd} = JSON.parse(ctx.request.body);
    console.log('【name, pwd】-->', name, pwd);
    ctx.body = '';
    let vip = usersVIP.find(vip=>vip.name === name && vip.pwd === pwd);
    if(vip){
        ctx.body = {
            status:1,
            mes:'登录成功！'
        };
        next();
    }else{
        ctx.body = {
            status:0,
            mes:'用户名密码错误'
        };
        next();
    }
});
    
app.use(async (ctx, next)=>{
    console.log('ctx.req.url-->', ctx.req.url);
    if(ctx.req.url !== '/public/room.html'){
        ctx.res.write(fs.readFileSync('./public/login.html'));
        next(); 
    }
});

app.use( router.routes() );



const server = require('http').createServer(app.callback());
const users = [];

const options = { /* ... */ };
// io 的第一个参数接收的是原始http对象
const io = require('socket.io')(server, options);

io.on('connection', socket => { 
    users.push({
       id: socket.id
    });
    console.log('有人通过socket链接了');

    let d = moment( new Date() ).format('hh:mm A');
    socket.emit('hello', JSON.stringify({
        id:socket.id,
        time:d
    }));

    //通过socket通知给其它socket
    socket.broadcast.emit('hello', JSON.stringify({
        id:socket.id,
        time:d
    }));

    socket.broadcast.emit('userUpdate', users);

    socket.on('message', data => {
        let json = JSON.stringify({
            id:socket.id,
            time:d,
            str:data
        });
        socket.emit('message', json);
        socket.broadcast.emit('message', json);
    });
});


server.listen(8080, ()=>{
    console.log('The Server at: http://localhost:8080');
});