const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const validate = require("../middleware/validate");
const {registerSchema, loginSchema} = require("../validators/auth.validator");
const auth = require("../middleware/auth.middleware");

router.post("/register", validate(registerSchema), controller.register);

router.post("/login", validate(loginSchema), controller.login);

router.get("/me", auth, controller.me);

router.post("/refresh", controller.refresh);

router.post("/logout", auth, controller.logout);

module.exports = router;