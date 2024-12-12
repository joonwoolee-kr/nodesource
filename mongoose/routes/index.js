const express = require("express");
const User = require("../schemas/user");

// 라우터(경로 지정)
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // db.users.find({})
    const users = await User.find({});

    // 템플릿, 데이터 전송
    res.render("user/user", { users: users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
