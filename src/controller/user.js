const user_service = require("../services/user.js");
const form_verification = require("../services/form_verification.js");
const bcrypt = require("bcrypt");

login = async (req, res) => {
  try {
    if (req.body.username == "guest") {
      return res.status(403).json({ message: "訪客無法登入" });
    }
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
      const mail_verification = await form_verification.is_mail(req.body.mail);
      if(!mail_verification){
        return res.status(403).json({ message: "Email格式錯誤" });
      }
      const register_user = await user_service.user_create(req.body);
      if (register_user) {
        const token = await user_service.token_create(register_user);
        return res.status(201).json({ message: "註冊成功", token: token });
      } else {
        return res.status(402).json({ message: "註冊錯誤" });
      }
    } else {
      return res.status(401).json({ message: "帳號重複" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
  register,
};
