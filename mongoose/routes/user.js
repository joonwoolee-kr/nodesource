const express = require("express");
const User = require("../schemas/user");

// 라우터(경로 지정)
const router = express.Router();

router
  .get("/", async (req, res, next) => {
    try {
      // db.users.find({})
      const users = await User.find({});

      res.json(users);
    } catch (error) {
      next(error);
    }
  })
  .post("/", async (req, res, next) => {
    try {
      // db.users.insertOne({name:"홍길동",age:20,married:true})
      // req.body: form 안의 내용 가져올 수 있음
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log("user 삽입 결과 {}", user);
      res.status(201).json(user);

      res.json(user);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
