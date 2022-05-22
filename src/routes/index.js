const token_authentication_middleware = require("../middleware/token_authentication");
const user_controller = require("../controller/user.js");

module.exports = function (router) {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post("/api/register", user_controller.register);
  router.post("/api/login", user_controller.login);

  router.get("/api/message");
  router.post("/api/message");

  router.use(token_authentication_middleware);

  router.put("/api/message");
  router.delete("/api/message");
};
