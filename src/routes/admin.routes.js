const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const allow = require("../middleware/role.middleware");

/**
 * @swagger
 * /dashboard:
 *   get:
 *     tags: [Admin]
 *     summary: Get admin dashboard
 *     description: Returns dashboard data accessible only by admin users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *       401:
 *         description: Unauthorized - Authentication required.
 *       403:
 *         description: Forbidden - Admin access required.
 */
router.get("/dashboard", auth, allow("admin"), (req, res) => {
    res.json({
        message: "Dashboard is for admin only"
    });
});

module.exports = router;