const mysql2 = require('mysql2');

let db = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ZhaoXu$82',
    database: 'studynodejs03'
});

module.exports = db;