const db = require("../models/index.js");
const { Op } = require("sequelize");

message_get_all = async () => {
  const all_message = await db.Messages.findAll({ order: [["id", "ASC"]] });
  return all_message;
};

message_search = async (keyword) => {
  const message_search = await db.Messages.findAll({
    where: {
      content: {
        [Op.like]: "%" + keyword + "%",
      },
    },
    order: [["id", "ASC"]],
  });
  return message_search;
};

message_create = async (message_owner, message_content) => {
  const message_create = await db.Messages.create({
    owner: message_owner,
    content: message_content,
  });
  return message_create;
};

message_delete = async (username, message_id) => {
  const message_delete = await db.Messages.destroy({
    where: {
      id: message_id,
      owner: username,
    },
  });
  return message_delete;
};

message_update = async (username, message_id, message_content) => {
  const message_update = await db.Messages.update(
    {
      content: message_content,
    },
    {
      where: {
        id: message_id,
        owner: username,
      },
    }
  );
  return message_update;
};

module.exports = {
  message_get_all,
  message_search,
  message_create,
  message_delete,
  message_update,
};
