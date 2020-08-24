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

