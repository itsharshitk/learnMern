const router = require("express").Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.get("/:id", controller.getUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;