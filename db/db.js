const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1', // 数据库地址
    user: 'root', // 账号
    password: '123456',
    database: 'xr' // 数据库名称
})

conn.connect();
module.exports = conn
