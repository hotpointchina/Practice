const dbUsers = require('../model/users');
const jwt = require('jsonwebtoken');
const tokenCheck = require('../verify/tokenCheck');

module.exports = async function(ctx){
    let utoken = ctx.request.header.authorization;

    if(utoken !== 'null'){
        let tokenStatus = tokenCheck(utoken);
        ctx.state.jwtdata = tokenStatus;
        if( tokenStatus.code == 1 ){
            return ctx.body = tokenStatus;
        }
    }


    let data = ctx.request.body;
    let {username, password} = data;
    console.log( 'router - login [username, password]--> ', username, password);

    
    if (!username) {
        ctx.status = 400;
        return ctx.body = {
            code: 0,
            message: '用户名不能为空！'
        };
    }

    let [rs] = await dbUsers.get(username);

    // 只请求查询 【用户名】
    if(rs && !password){
        return ctx.body = {
            code: 1,
            username: rs.username,
            message: '用户名正确！'
        };
    }

    if (!rs) {
        ctx.status = 404;
        return ctx.body = {
            code: 4,
            message: '用户不存在'
        };
    }

    if (rs.password != password) {
        ctx.status = 404;
        return ctx.body = {
            code: 3,
            message: '密码错误'
        };
    }

    /*
        在登录成功后，添加 'bearer '
        - 【注意：】要使用 koa-jwt 的话，在登录后，使用 jwt 压包的时候，在 token 前必须加上其独有的字段                   
            + 只有添加了特定的 'Bearer ' 或 'bearer ' 字段（不区分大小写），后端路由收到请求时：                     
                + 【特别注意】：Bearer 后面必须跟一个  ‘空格’。                          
                + 检查请求头是否有 authorization ，如果没有 autoorization(同样不区分大小写)，直接拒绝访问。               
                + 如果有 authorization ，则进行校验。 
    */ 

    ctx.set('Authorization', 'bearer ' + jwt.sign({
        id: rs.id,
        username: rs.username
    }, 'greedwithfear.com',{ expiresIn: '9d' }));
    let token = {
        'Authorization': 'bearer ' + jwt.sign({
            id: rs.id,
            username: rs.username
        }, 'greedwithfear.com')
    };
    console.log( '[token] - router - login--> ', token);
    
    ctx.body = {
        code: 1,
        id: rs.id,
        username: rs.username,
        token
    }
};

