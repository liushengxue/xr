const mysql = require("mysql");

const isDev = process?.env?.npm_lifecycle_event === "devStart";

let conn;
if (isDev) {
  conn = mysql.createConnection({
    host: "127.0.0.1", // 数据库地址
    user: "root", // 账号
    password: "xue251888",
    database: "xr", // 数据库名称
  });
} else {
  conn = mysql.createConnection({
    host: "43.139.188.146", // 数据库地址
    user: "root", // 账号
    password: "Qweasd123!",
    database: "xr", // 数据库名称
  });
}

conn.connect();
module.exports = conn;
