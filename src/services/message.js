const db = require("../models/index.js");

message_get_all = async () => {
  const all_message = await db.Messages.findAll();
  return all_message;
};

module.exports = {
  message_get_all,
};
