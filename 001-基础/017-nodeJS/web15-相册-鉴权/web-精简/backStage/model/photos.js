const db = require('./index');

module.exports = {
    get(id){
        return new Promise(resolve=>{
            db.query("select * from `photos` where `user_id`=? ORDER BY id DESC",[id], function(err, rs) {
                if (err) {
                    reject('服务器查询 [所有图片] 错误-->', err);
                } else {
                    console.log( '查询 [所有图片]--> ', rs);
                    resolve(rs);
                }
            });
        });
    },

    add(imgname, id){
        return new Promise(resolve=>{
            db.query("insert into `photos` (`name`, `user_id`) values (?, ?)",[imgname, id], function(err, rs) {
                if (err) {
                    reject('服务器添加 [图片] 错误-->', err);
                } else {
                    console.log( '添加 [图片]--> ', rs);
                    resolve(rs);
                }
            });
        });
    },    
};

