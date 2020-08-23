const jwt = require('jsonwebtoken');


module.exports = (token)=>{
    let user = jwt.verify(token, 'greedwithfear.com');

    if (!user) {
        ctx.status = 401;
        return {
            code: 0,
            message:'你还没有登录'
        }
    }else{
        return {
            code: 1,
            id: user.id,
            username: user.username,
            message:'token 可用，直接登录'
        }
    }
}
