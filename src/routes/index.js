const token_authentication_middleware = require("../middleware/token_authentication");
const admin_controller = require("../controller/admin.js");

module.exports = function (router) {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post("/api/login", admin_controller.login);

  router.use(token_authentication_middleware);
};
