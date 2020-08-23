const db = require('./index');

module.exports = {
    get(name){
        return new Promise(resolve=>{
            db.query("select * from `users` where `username`=?",[name], function(err, rs) {
                if (err) {
                    reject('服务器查询 [username] 错误-->', err);
                } else {
                    console.log( ' --- ', rs,' --- ');
                    resolve(rs);
                }
            });
        });
    }
};