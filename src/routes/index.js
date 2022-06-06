const token_authentication_middleware = require("../middleware/token_authentication");
const user_controller = require("../controller/user.js");
const message_controller = require("../controller/message.js");

module.exports = function (router) {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post("/api/register", user_controller.register);
  router.post("/api/login", user_controller.login);

  router.get("/api/message", message_controller.message_read);
  router.get("/api/messagesearch", message_controller.message_search);
  router.post("/api/message", message_controller.message_create);

  router.use(token_authentication_middleware);

  router.put("/api/message", message_controller.message_update);
  router.delete("/api/message", message_controller.message_delete);
};
