const db = require('./model');

module.exports = {
    get(){
        return new Promise( (resolve, reject) => {
            db.query("SELECT * FROM `photos` ORDER BY id DESC", function(err, rs) {
                if (err) {
                    reject('服务器查询错误-->', err);
                } else {
                    resolve(rs);
                }
            });
        } );
    },

    async add(imgName){
        try {
            await db.execute('insert into `photos` (`imgName`) value (?)',[imgName]);
        } catch (error) {
            console.log('服务器存储错误-->', error);
        }
    }
}
