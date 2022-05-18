const token_authentication_middleware = require("../middleware/token_authentication");
const user_controller = require("../controller/user.js");

module.exports = function (router) {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post("/api/register", user_controller.register);
  router.post("/api/login", user_controller.login);

  router.use(token_authentication_middleware);

  router.get("/api/message", admin_controller.login);
  router.post("/api/message", admin_controller.login);
};
