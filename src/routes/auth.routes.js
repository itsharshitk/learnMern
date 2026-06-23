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

/**
 * @swagger
 * /auth/register:
 *   get:
 *     summary: Verify user
 *     tags:
 *       - Auth
 *
 *     parameters:
 *       - in: path
 *         name: token
 *         description: Verification token
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123
 *     responses:
 *       200:
 *         description: User verified
 */
router.get("/verify/:token", controller.verify);

router.get("/me", auth, controller.me);

router.post("/refresh", controller.refresh);

router.post("/logout", auth, controller.logout);

router.post("/forgot", controller.forgotPassword);

router.post("/reset/:token", controller.resetPassword);

module.exports = router;


// Improved Prompt

// Generate Swagger (OpenAPI 3.0) JSDoc comments for my Express authentication routes.

// Requirements:

// Use swagger-jsdoc style comments directly above each route in auth.routes.js
// Follow OpenAPI 3.0 format
// Use bearer JWT auth for protected routes (me, logout)
// Assume responses are wrapped in ApiResponse format:
// { statusCode, message, data }
// Include reusable schemas under components/schemas
// Include request body schemas for register, login, forgot password, reset password
// Include proper response codes (200, 201, 400, 401, 404)
// Keep output clean and production-ready (no explanations)

// Here are my files:
// (paste routes, controller, model)


// Even better (pro-level version)

// If you want very consistent enterprise-grade output:

// Generate Swagger JSDoc comments for auth.routes.js.
// Only output annotated route code (no explanation).
// Use:

// OpenAPI 3.0
// JWT Bearer auth (bearerAuth)

// Standard response format:

// {
//   "statusCode": number,
//   "message": string,
//   "data": any
// }

// Group all reusable schemas under components/schemas.
// Assume this is a production API.

// Files:
// [routes]
// [controllers]
// [models]

// src/routes/auth.routes.js:

// const router = require("express").Router();
// const controller = require("../controllers/auth.controller");
// const validate = require("../middleware/validate");
// const {registerSchema, loginSchema} = require("../validators/auth.validator");
// const auth = require("../middleware/auth.middleware");

// router.post("/register", validate(registerSchema), controller.register);

// router.post("/login", validate(loginSchema), controller.login);

// router.get("/verify/:token", controller.verify);

// router.get("/me", auth, controller.me);

// router.post("/refresh", controller.refresh);

// router.post("/logout", auth, controller.logout);

// router.post("/forgot", controller.forgotPassword);

// router.post("/reset/:token", controller.resetPassword);

// module.exports = router;

// src/controllers/auth.controller.js:

// const ApiResponse = require("../utils/ApiResponse"); 
// const asyncHandler = require("../utils/asyncHandler");
// const service = require("../services/auth.service");

// exports.register = asyncHandler(
//     async (req, res) => {
        
//         const user = await service.register(req.body);
       
//         res.status(201).json(
//             new ApiResponse(201, "User Registered", user)
//         );

//     }
// );

// exports.verify = asyncHandler(
//     async (req, res) => {
        
//         await service.verify(req.params.token);
        
//         res.json(
//             { success: true }
//         );
//     }
// );

// exports.login = asyncHandler(async (req, res) => {
    
//     const result = await service.login(req.body.email, req.body.password);
    
//     res.cookie("refreshToken", result.refreshToken, {httpOnly:true, secure:false})
//     .status(200).json(
//         new ApiResponse(200, "Login Successful", {accessToken: result.accessToken})
//     );

// });

// exports.me = asyncHandler(async (req, res) => {
//     const user = await service.getProfile(req.user.id);

//     res.json(
//         new ApiResponse(200, "User profile fetched", {data: user})
//     );
// });

// exports.refresh = asyncHandler(async (req, res) => {
    
//     const token = req.cookies.refreshToken;

//     const access = await service.refresh(token);

//     res.json(
//         new ApiResponse(200, "Token created", {accessToken: access})
//     );

// });

// exports.logout = asyncHandler(async (req, res) => {

//     await service.logout(req.user.id);

//     res.clearCookie("refreshToken");

//     res.json(
//         new ApiResponse(200, "Logout successful")
//     );
    
// });

// exports.forgotPassword = asyncHandler(
//     async (req, res) => {
//         await service.forgotPassword(req.body.email);

//         res.json({
//             success: true
//         });
//     }
// );

// exports.resetPassword = asyncHandler(
//     async (req, res) => {
//         await service.resetPassword(req.params.token, req.body.password);

//         res.json({
//             success: true
//         });
//     }
// );


// src/models/user.model.js:

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },

//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },

//         password: {
//             type: String,
//             required: true
//         },

//         role: {
//             type: String,
//             enum: ["user", "admin"],
//             default: "user"
//         },

//         avatar: {
//             url: String,
//             publicId: String,
//             size: Number,
//             width: Number,
//             height: Number
//         },

//         isVerified: {
//             type: Boolean,
//             default:false
//         },

//         refreshToken: String,
        
//         verificationToken: String,

//         resetPasswordToken: String,
        
//         resetPasswordExpire: Date

//     },
//     {
//         timestamps: true
//     }
// )

// userSchema.pre("save", async function(){
    
//     if(!this.isModified("password")){
//         return;
//     }

//     this.password = await bcrypt.hash(this.password, 10);

// });

// userSchema.methods.comparePassword = function(password){
//     return bcrypt.compare(password, this.password)
// }



// module.exports = mongoose.model("User", userSchema);

