const message_service = require("../services/message.js");
const jwt = require("jsonwebtoken");

message_read = async (req, res) => {
  try {
    const all_message = await message_service.message_get_all();
    return res.status(201).json({ message: "讀取成功", data: all_message });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

message_create = async (req, res) => {
  try {
    if (!req.body.content) {
      return res.status(403).json({ message: "留言內容為空" });
    }
    let token = req.headers.token || req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (err) {
          return res.status(402).json({ message: "token錯誤" });
        } else {
          await message_service.message_create(
            decoded["username"],
            req.body.content
          );
          return res.status(201).json({ message: "新增成功" });
        }
      });
    } else {
      await message_service.message_create("guest", req.body.content);
      return res.status(201).json({ message: "新增成功" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

message_delete = async (req, res) => {
  try {
    const message_delete = await message_service.message_delete(
      req.decoded["username"],
      req.body.id
    );
    if (message_delete > 0) {
      return res.status(201).json({ message: "刪除成功" });
    } else {
      return res.status(404).json({ message: "找不到所選留言" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

message_update = async (req, res) => {
  try {
    const message_update = await message_service.message_update(
      req.decoded["username"],
      req.body.id,
      req.body.content
    );
    if (message_update > 0) {
      return res.status(201).json({ message: "修改成功" });
    } else {
      return res.status(404).json({ message: "找不到所選留言" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  message_read,
  message_create,
  message_delete,
  message_update,
};
