const Koa = require('koa');
const fs = require('fs');
const KoaStaticCache = require('koa-static-cache')
const app = new Koa();
const moment = require('moment');

app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}))

app.use(async (ctx, next)=>{
    console.log('ctx.req.url-->', ctx.req.url);
    if(ctx.req.url !== '/public/room.html'){
        ctx.res.end(fs.readFileSync('./public/index.html'));
        next(); 
    }
});
const server = require('http').createServer(app.callback());
const users = [];

const io = require('socket.io')(server, {});
io.on('connection', socket => { 
    users.push({
       id: socket.id
    });
    let d = moment( new Date() ).format('hh:mm A');
    socket.emit('hello', JSON.stringify({
        id:socket.id,
        time:d
    }));
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