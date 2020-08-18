const Koa = require('koa');
const KoaStaticCache = require('koa-static-cache')
const app = new Koa();
const moment = require('moment');


app.use(KoaStaticCache('./public', {
    prefix: '/public',
    gzip: true,
    dynamic: true
}))
const server = require('http').createServer(app.callback());
const users = [];

const options = { /* ... */ };
// io 的第一个参数接收的是原始http对象
const io = require('socket.io')(server, options);

io.on('connection', socket => { 
    users.push({
       id:  socket.id
    });
    console.log('有人通过socket链接了');

    let d = moment( new Date() ).format('hh:mm a');
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
        // console.log('message', data);
        // socket.broadcast.emit('message', `${socket.id} 说：${data} - ${d}`);

        let json = JSON.stringify({
            id:socket.id,
            time:d,
            str:data
        });

        socket.emit('message', json);
        socket.broadcast.emit('message', json);

    });
});

server.listen(8081);