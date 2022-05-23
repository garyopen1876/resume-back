const message_service = require("../services/message.js");

message_read = async (req, res) => {
  try {
    const all_message = await message_service.message_get_all();
    return res.status(201).json({ message: "讀取成功", data: all_message });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

message_create = async (req, res) => {};

message_delete = async (req, res) => {};

message_update = async (req, res) => {};

module.exports = {
  message_read,
  message_create,
  message_delete,
  message_update,
};
