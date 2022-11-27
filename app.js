const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const compression = require("compression");

const indexRouter = require("./routes/index");

const app = express();

app.use(compression());
app.use(
  session({
    secret: "1234568979869", // 对session id相关的cookie 进行签名
    resave: false,
    saveUninitialized: true, // 是否保存未初始化的对话
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 设置session的有效时间,单位毫秒
  })
);

app.all("*", function (req, res, next) {
  if (!req.get("Origin")) return next();
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// 解决刷新404
app.all("*", (req, res, next) => {
  res.set({
    "Content-Type": "text/html; charset=utf-8",
  });
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
