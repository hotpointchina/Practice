const KoaBody = require('koa-body');

module.exports = function(dir = 'upload') {
    return KoaBody({
        multipart: true,
        formidable: {
            uploadDir: __dirname + '/../public/' + dir,
            keepExtensions: true
        }
    })
}