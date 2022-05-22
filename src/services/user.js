require("dotenv").config();
const db = require("../models/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

is_user = async (body) => {
  const is_user = await db.Users.findOne({
    where: {
      [Op.or]: [{ username: body.username }, { mail: body.username }],
    },
  });
  return is_user;
};

user_create = async (register_data) => {
  const register_user = await db.Users.create({
    username: register_data.username,
    password: bcrypt.hashSync(register_data.password, bcrypt.genSaltSync(10)),
    mail: register_data.mail,
  });
  return register_user;
};

token_create = async (user_data) => {
  const token = jwt.sign(
    { username: user_data.username },
    process.env.JWT_SECRET,
    { expiresIn: "60 minutes" }
  );
  await db.Users.update(
    {
      token: token,
    },
    {
      where: {
        username: user_data.username,
      },
    }
  );
  return token;
};

module.exports = {
  is_user,
  user_create,
  token_create,
};
