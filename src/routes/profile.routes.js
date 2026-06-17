const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/profile.controller");

router.post(
    "/avatar", 
    auth, 
    upload.single("avatar"), 
    controller.uploadAvatar
);

module.exports = router;