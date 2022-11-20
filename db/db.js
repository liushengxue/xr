const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '43.139.188.146', // 数据库地址
    user: 'root', // 账号
    password: 'Qweasd123!',
    database: 'xr' // 数据库名称
})

conn.connect();
module.exports = conn
