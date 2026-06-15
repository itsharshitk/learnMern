const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const allow = require("../middleware/role.middleware");

router.get("/dashboard", auth, allow("admin"), (req, res) => {
    res.json({
        message: "Dashboard is for admin only"
    });
});

module.exports = router;