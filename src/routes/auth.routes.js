const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const validate = require("../middleware/validate");
const {registerSchema, loginSchema} = require("../validators/auth.validator");
const auth = require("../middleware/auth.middleware");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Harshit Katiyar
 *
 *               email:
 *                 type: string
 *                 example: harshit@yopmail.com
 *
 *               password:
 *                 type: string
 *                 example: Password@123
 *
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/register", validate(registerSchema), controller.register);

router.get("/verify/:token", controller.verify);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *
 *             properties:
 *               email:
 *                 type: string
 *                 example: harshit@yopmail.com
 *
 *               password:
 *                 type: string
 *                 example: Password@123
 *
 *     responses:
 *       200:
 *         description: Login Successful
 */
router.post("/login", validate(loginSchema), controller.login);

router.get("/me", auth, controller.me);

router.post("/refresh", controller.refresh);

router.post("/logout", auth, controller.logout);

router.post("/forgot", controller.forgotPassword);

router.post("/reset/:token", controller.resetPassword);

module.exports = router;