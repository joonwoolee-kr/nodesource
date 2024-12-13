const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

// 데이터베이스 연결 모듈 import
const conn = require("./schemas/connect");

// 라우터 연결
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");

const app = express();

// 웹 서버 세팅
const port = 3000;
app.set("port", process.env.PORT || port);
app.set("view engine", "njk");

// nunjucks 세팅
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 데이터베이스 연결
conn();

// 미들웨어 연결
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public"))); // static 파일 경로
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/comments", commentRouter);

// 404 오류
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 에러처리 미들웨어 호출
});

// 에러처리 미들웨어 - 에러 발생 시 에러코드와 매세지 넘겨주기
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(500 || err.status);
  res.render("common/error");
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
