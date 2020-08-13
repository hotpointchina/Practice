const Koa = require('koa');
const KoaRouter = require('koa-router');
const mysql = require('mysql2/promise');
const app = new Koa();
const router = new KoaRouter();

let connection;
(async function(){
    connection = await mysql.createConnection({
        host:'localhost', 
        user: 'root', 
        password: "ZhaoXu$82",
        database: 'studynodejs03'
    });
})();

router.get('/addUser', async ctx=>{
    let {username,age} = ctx.request.query;
    if(username && age){
        try{
            await connection.execute('insert into `users` (`username`, `age`) values (?, ?)', [
                username,
                age
            ]);
        }catch(err){
            console.log('Errors-->', err);
        }
    }
    console.log('username, age -->',username,age);
});

app.use(router.routes());
const port = 8080;
app.listen(port, ()=>{
    console.log(`您的服务已启动：http:/\/\localhost:${port}`);
});