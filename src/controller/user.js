const user_service = require("../services/user.js")
const bcrypt = require("bcrypt");

login = async (req, res) => {
  try {
    const user = await user_service.is_user(req.body);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = await user_service.token_create(user);
      return res.status(201).json({ message: "登入成功", token: token });
    } else {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

register = async (req, res) => {
  try {
    const user = await user_service.is_user(req.body);
    if (!user) {
      await user_service.token_create(user);
      const token = await user_service.token_create(user);
      return res.status(201).json({ message: "註冊成功", token: token });
    } else {
      return res.status(401).json({ message: "已有帳號" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  login,
};
