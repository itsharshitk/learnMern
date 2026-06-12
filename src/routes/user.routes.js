const router = require("express").Router();
const controller = require("../controllers/user.controller");
const validate = require("../middleware/validate");
const {createUserSchema} = require("../validators/user.validator");

router.get("/", controller.getUsers);
router.post("/", validate(createUserSchema), controller.createUser);
router.get("/:id", controller.getUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;