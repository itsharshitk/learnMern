const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/profile.controller");

/**
 * @swagger
 * /profile/avatar:
 *   patch:
 *     tags: [Profile]
 *     summary: Update Avatar of a user
 *     description: Updates the Avatar image of the user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Avatar'
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvatarResponse'
 *       400:
 *         description: Invalid file upload
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
    "/avatar", 
    auth, 
    upload.single("avatar"), 
    controller.uploadAvatar
);

module.exports = router;