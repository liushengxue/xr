const express = require("express");
const router = express.Router();
const conn = require("./../db/db");

/* 修改用户信息 */
router.post("/api/change_user_msg", (req, res) => {
  // 1. getUserInfo
  const id = req.body.user_id;
  const user_name = req.body.user_name || "";
  const user_sex = req.body.user_sex || "";
  const user_address = req.body.user_address || "";
  const user_phone = req.body.user_phone || "";
  const user_birthday = req.body.user_birthday || "";
  const user_sign = req.body.user_sign || "";
  // 2.Authentication
  if (!id) {
    res.json({ err_code: 0, message: "修改用户信息失败" });
  } else {
    // 3. update 更新数据
    let sqlStr =
      "UPDATE pdd_user_info SET user_name=?, user_sex=?,user_address=?,user_birthday=?,user_phone=?,user_sign=? WHERE id =" +
      id;
    let strParams = [
      user_name,
      user_sex,
      user_address,
      user_birthday,
      user_phone,
      user_sign,
    ];
    conn.query(sqlStr, strParams, (error, results, fields) => {
      if (error) {
        res.json({ err_code: 0, message: "修改用户信息失败" });
      } else {
        res.json({ success_code: 200, message: "修改用户信息成功" });
      }
    });
  }
});

// xr
router.get("/api/test", (req, res) => {
  let user_id = req.body.user_id;
  let sqlStr = "SELECT * from test";
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ err_code: 0, message: "请求数据失败" });
    } else {
      res.json({ success_code: 200, message: results });
    }
  });
});

/* 用户名和密码登陆 */
router.post("/api/login", (req, res) => {
  const user_name = req.body.username;
  const user_pwd = req.body.password;

  let sqlStr =
    "SELECT * from user_info where job_number = '" + user_name + "'LIMIT 1";
  conn.query(sqlStr, (error, results, fields) => {
    results = JSON.parse(JSON.stringify(results));
    if (results[0]) {
      if (results[0].password === user_pwd) {
        req.session.userId = results[0].id;
        return res.json({
          code: 200,
          message: results[0],
        });
      }
    }
    res.json({ code: 400, message: "用户名或密码不正确" });
  });
});

/* 退出登陆 */
router.get("/api/logout", (req, res) => {
  delete req.session.userId;
  res.json({
    code: 200,
    message: "",
  });
});

/*根据session中的用户id获取用户信息*/
router.get("/api/user_info", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  let sqlStr = "SELECT * from user_info where id = '" + userId + "'LIMIT 1";
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      results = JSON.parse(JSON.stringify(results));
      results;
      if (!results[0]) {
        delete req.session.userId;
        res.json({ code: 4011, message: "请先登录" });
      } else {
        res.json({
          code: 200,
          result: results[0],
        });
      }
    }
  });
});

// 商品类别
router.post("/api/product/list", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const name = req.body.name;
  let sqlStr = "SELECT * from product WHERE is_delete = 0";
  if (name) {
    sqlStr = sqlStr + " AND name LIKE '%" + name + "%'";
  }
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      res.json({ code: 200, result: results });
    }
  });
});

router.post("/api/product/add", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const name = req.body.name;
  let add_sql = "INSERT INTO product(name,createBy) VALUES (?,?)";
  let sql_params = [name, userId];
  conn.query(add_sql, sql_params, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "添加失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

router.post("/api/product/delete", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { id } = req.body;
  let sqlStr = "UPDATE product SET is_delete=? WHERE id =" + id;
  let strParams = [1];
  conn.query(sqlStr, strParams, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "删除失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

module.exports = router;
