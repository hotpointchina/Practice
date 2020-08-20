const modelImages = require('../model/images');

module.exports = {
    index(ctx){
        let css = `
            display:table;
            margin:60px auto 0px; padding:6px 23px;
            background:cornflowerblue none;
            border-radius:8px;
            color:#fff;
            font-size:36px;
            text-align:center;
            text-decoration:none;
        `;
        ctx.body = `<a href="/index.html" style="${css}">去上传</a>`;
    },


    // 上传
    async uploadimg(ctx){
        // console.log(ctx.request.files.file.path);
        let reg = /(?<=upload\\)\w+\.\w{3,4}$/g;
        let result = ctx.request.files.file.path.match(reg);
        let imgName = result[0];
        
        // 存储到数据库
        modelImages.add(imgName);

        // console.log('filename-->', result[0]);
        ctx.body = {
            url: '/upload/' + imgName
        };
    },


    // 获取数据库中所有的图片
    async getPhotos(ctx){
        let dbImgs = await modelImages.get();
        // console.log('查询的IMG-->', dbImgs);

        let images = dbImgs.map(img=>img.url='/upload/'+img.imgName);
        images = JSON.stringify(dbImgs);
        ctx.body = images;
    }   
    
}