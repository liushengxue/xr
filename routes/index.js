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
  let sqlStr = "SELECT * from product WHERE is_delete = 0 ";
  if (name) {
    sqlStr = sqlStr + " AND name LIKE '%" + name + "%'";
  }
  sqlStr += ` ORDER BY create_time desc`;
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

router.post("/api/model/list", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const name = req.body.name;
  let sqlStr = "SELECT * from model WHERE is_delete != 1 ";
  if (name) {
    sqlStr = sqlStr + " AND name LIKE '%" + name + "%'";
  }
  sqlStr += ` ORDER BY create_time desc`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      res.json({ code: 200, result: results });
    }
  });
});

router.post("/api/model/add", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { name, typeId } = req.body;
  let add_sql = "INSERT INTO model(name,type_id,createBy) VALUES (?,?,?)";
  let sql_params = [name, typeId, userId];
  conn.query(add_sql, sql_params, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "添加失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

router.post("/api/model/delete", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { id } = req.body;
  let sqlStr = "UPDATE model SET is_delete=? WHERE id =" + id;
  let strParams = [1];
  conn.query(sqlStr, strParams, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "删除失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

router.post("/api/brand/list", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const name = req.body.name;
  let sqlStr = "SELECT * from brand WHERE is_delete != 1";
  if (name) {
    sqlStr = sqlStr + " AND name LIKE '%" + name + "%'";
  }
  sqlStr += ` ORDER BY create_time desc`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      res.json({ code: 200, result: results });
    }
  });
});

router.post("/api/brand/add", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { name, typeId } = req.body;
  let add_sql = "INSERT INTO brand(name,type_id,createBy) VALUES (?,?,?)";
  let sql_params = [name, typeId, userId];
  conn.query(add_sql, sql_params, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "添加失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

router.post("/api/brand/delete", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { id } = req.body;
  let sqlStr = "UPDATE brand SET is_delete=? WHERE id =" + id;
  let strParams = [1];
  conn.query(sqlStr, strParams, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "删除失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

router.post("/api/getModelAndBrandByType", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const typeId = req.body.typeId;
  const result = { modelList: [], brandList: [] };
  let sqlStr =
    "SELECT * from brand WHERE type_id = " + typeId + " AND is_delete != 1";
  conn.query(sqlStr, (error, results, fields) => {
    if (!error) {
      result.brandList = results;
    }
  });

  let sqlStr2 =
    "SELECT * from model WHERE type_id = " + typeId + " AND is_delete != 1";
  conn.query(sqlStr2, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "删除失败" });
    } else {
      result.modelList = results;
      res.json({ code: 200, result });
    }
  });
});

function uuid() {
  var random_no = "";
  for (var i = 0; i < 4; i++) {
    random_no += Math.floor(Math.random() * 10);
  }
  random_no = `${random_no}-${new Date().getTime()}`;
  return random_no;
}

router.post("/api/order/list/", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const {
    current = 1,
    pageSize = 30,
    startTime,
    endTime,
    customName,
  } = req.body;
  let query = "1 = 1";
  if (startTime) {
    query += ` AND o.create_time >= '${startTime}'`;
  }
  if (endTime) {
    query += ` AND o.create_time <= '${endTime}'`;
  }
  if (customName) {
    query += ` AND o.custom_name like '%${customName}%'`;
  }
  query += ` ORDER BY o.create_time desc`;
  let sqlStr =
    "SELECT o.*,p.name type_name,u.name create_by_nickname, b.name brand_name, m.name model_name FROM orders as o LEFT JOIN product as p on o.type_id = p.id LEFT JOIN brand  as b on b.id = o.brand_id LEFT JOIN model as m on m.id = o.model_id LEFT JOIN user_info as u on u.id = o.createBy";

  sqlStr += ` WHERE ${query}`;

  let total = null;

  conn.query(sqlStr, (error, results, fields) => {
    console.log(sqlStr);
    if (error) {
      res.json({ code: 400, message: error });
    } else {
      res.json({
        code: 200,
        result: { list: results, pagination: { current, pageSize, total } },
      });
    }
  });
});

router.post("/api/order/add", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { orderList, customInfo: c } = req.body;

  let sql = "INSERT INTO order_num(num,custom_name,createBy) VALUES (?,?,?)";
  const uid = uuid();
  let params = [uid, c.customName, userId];
  conn.query(sql, params, (error, results, fields) => {});

  let add_sql =
    "INSERT INTO orders(order_num,createBy,type_id,model_id,brand_id,price,count,note,status,custom_name, custom_phone, custom_address,pay_type,deposit,total_price,express_name, express_phone,express_address) VALUES";
  orderList.forEach((i, index) => {
    const note = i.note === undefined ? null : `'${i.note}'`;
    const customName = c.customName === undefined ? null : `'${c.customName}'`;
    const customPhone =
      c.customPhone === undefined ? null : `'${c.customPhone}'`;
    const customAddress =
      c.customAddress === undefined ? null : `'${c.customAddress}'`;
    const payType = c.payType === undefined ? null : `'${c.payType}'`;
    const deposit = c.deposit === undefined ? null : `'${c.deposit}'`;
    const totalPrice = c.totalPrice === undefined ? null : `'${c.totalPrice}'`;
    const expressName =
      c.expressName === undefined ? null : `'${c.expressName}'`;
    const expressPhone =
      c.expressPhone === undefined ? null : `'${c.expressPhone}'`;
    const expressAddress =
      c.expressAddress === undefined ? null : `'${c.expressAddress}'`;
    add_sql =
      add_sql +
      `('${uid}',${userId},${i.type},${i.model},${i.brand},${i.price},${i.count},${note},'未入库',${customName},${customPhone},${customAddress},${payType},${deposit},${totalPrice},${expressName},${expressPhone},${expressAddress})`;
    if (index !== orderList.length - 1) {
      add_sql = add_sql + " ,";
    }
    console.log(add_sql);
  });
  conn.query(add_sql, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "添加失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

router.post("/api/order/update", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { realCount, status, storageAddress, id } = req.body;

  let sqlStr =
    "UPDATE orders SET real_count=?, status=?,storage_address=? WHERE id =" +
    id;
  let strParams = [realCount, status, storageAddress];
  conn.query(sqlStr, strParams, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "修改失败" });
    } else {
      res.json({ code: 200, message: "修改成功" });
    }
  });
});

router.post("/api/order/updateSentCount", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { payload = [] } = req.body;

  let sql = `UPDATE orders SET sent_count = CASE id `;
  payload.forEach((item, index) => {
    sql += ` WHEN ${item.id} THEN '${item.sendCount}'`;
    if (index === payload.length - 1) {
      sql += ` END, status = CASE id`;
    }
  });
  payload.forEach((item, index) => {
    sql += ` WHEN ${item.id} THEN '已打单'`;
    if (index === payload.length - 1) {
      sql += ` END WHERE id IN (`;
    }
  });
  payload.forEach((item, index) => {
    sql += `${item.id},`;
    if (index === payload.length - 1) {
      sql += `${item.id})`;
    }
  });

  conn.query(sql, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "修改失败" });
    } else {
      res.json({ code: 200, message: "修改成功" });
    }
  });
});

router.post("/api/order/list/user", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const {
    current = 1,
    pageSize = 30,
    startTime,
    endTime,
    customName,
  } = req.body;
  let query = `o.createBy = '${userId}'`;
  if (startTime) {
    query += ` AND o.create_time >= '${startTime}'`;
  }
  if (endTime) {
    query += ` AND o.create_time <= '${endTime}'`;
  }
  if (customName) {
    query += ` AND o.custom_name like '%${customName}%'`;
  }
  let sqlStr =
    "SELECT o.*,p.name type_name, b.name brand_name, m.name model_name FROM orders as o LEFT JOIN product as p on o.type_id = p.id LEFT JOIN brand  as b on b.id = o.brand_id LEFT JOIN model as m on m.id = o.model_id";

  let sql = "SELECT count(*) total from orders";
  if (query) {
    sqlStr += ` WHERE ${query}`;
    sql += ` WHERE ${query}`;
  }

  let total = null;
  conn.query(sql, (error, results, fields) => {
    if (!error) {
      total = results[0].total;
    }
  });
  sqlStr += ` ORDER BY o.create_time desc`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      res.json({
        code: 200,
        result: { list: results, pagination: { current, pageSize, total } },
      });
    }
  });
});

router.post("/api/order/listByNum", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const { num } = req.body;
  let sqlStr =
    "SELECT o.*,p.name type_name, b.name brand_name, m.name model_name FROM orders as o LEFT JOIN product as p on o.type_id = p.id LEFT JOIN brand  as b on b.id = o.brand_id LEFT JOIN model as m on m.id = o.model_id LEFT JOIN  order_num as n on n.num = o.order_num";
  sqlStr += ` WHERE n.num = '${num}' ORDER BY o.create_time desc`;

  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      res.json({
        code: 200,
        result: results,
      });
    }
  });
});

router.post("/api/storage/list", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const name = req.body.name;
  let sqlStr =
    "SELECT o.*,p.name type_name, b.name brand_name, m.name model_name FROM storage as o LEFT JOIN product as p on o.type_id = p.id LEFT JOIN brand  as b on b.id = o.brand_id LEFT JOIN model as m on m.id = o.model_id";
  if (name) {
    sqlStr = sqlStr + " AND name LIKE '%" + name + "%'";
  }
  sqlStr += ` ORDER BY o.create_time desc`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      res.json({ code: 200, result: results });
    }
  });
});

router.post("/api/storage/add", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const {
    typeId,
    modelId,
    brandId,
    count,
    note,
    storageAddress,
    factory,
    config,
  } = req.body;
  let add_sql =
    "INSERT INTO storage(type_id,model_id,brand_id,count,note,storage_address,factory,createBy,config) VALUES (?,?,?,?,?,?,?,?,?)";
  let sql_params = [
    typeId,
    modelId,
    brandId,
    count,
    note,
    storageAddress,
    factory,
    userId,
    config,
  ];

  conn.query(add_sql, sql_params, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "添加失败" });
    } else {
      res.json({ code: 200 });
    }
  });
});

router.post("/api/orderNum/list", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    return res.status(401).send("请先登录");
  }
  const name = req.body.name;
  let sqlStr =
    "SELECT o.*,u.name FROM order_num as o LEFT JOIN user_info as u on o.createBy = u.id WHERE o.is_delete != 1 ";
  if (name) {
    sqlStr = sqlStr + " AND name LIKE '%" + name + "%'";
  }
  sqlStr += ` ORDER BY o.create_time desc`;
  conn.query(sqlStr, (error, results, fields) => {
    if (error) {
      res.json({ code: 400, message: "请求数据失败" });
    } else {
      res.json({ code: 200, result: results });
    }
  });
});

module.exports = router;
