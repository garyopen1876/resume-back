require("dotenv").config();
const db = require("../models/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

is_user = async (body) => {
  const is_user = await db.Users.findOne({
    where: {
      [Op.or]: [{ username: body.username }, { mail: body.username }],
    },
  });
  return is_user;
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
  token_create,
};
