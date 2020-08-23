const dbPhotos = require('../model/photos');
const jwt = require('jsonwebtoken');

let check = (ctx)=>{
    return jwt.verify(ctx.header.authorization, 'greedwithfear.com');
};


// 获取所有图片
module.exports = {
    async get(ctx){
        let user = check(ctx);

        
        let rs = await dbPhotos.get(user.id);
        rs = rs.map( r => ({
            ...r,
            url: '/public/upload/' + r.name
        }) );
    
        ctx.body = rs;
    },

    async add(ctx){
        let reg = /(?<=[\/\\]upload[/\\])\w+\.\w{3,4}$/g;
        let filename = ctx.request.files.file.path.match(reg);


        let user = check(ctx);
        let rs = await dbPhotos.add(filename, user.id);
        // console.log('插入数据库结果--> ', rs);

        ctx.body = {
            url: '/public/upload/' + filename
        };
    }
};

