const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const auth = require("../middleware/auth.middleware");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Creates a new user account and sends verification instructions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", validate(registerSchema), controller.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user
 *     description: Authenticates a user and returns an access token. A refresh token is stored in an HttpOnly cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: HttpOnly refresh token cookie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginApiResponse'
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", validate(loginSchema), controller.login);

/**
 * @swagger
 * /auth/verify/{token}:
 *   get:
 *     tags: [Authentication]
 *     summary: Verify user account
 *     description: Verifies a user's email address using a verification token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Email verification token
 *     responses:
 *       200:
 *         description: Account verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.get("/verify/:token", controller.verify);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileApiResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/me", auth, controller.me);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags: [Authentication]
 *     summary: Refresh access token
 *     description: Generates a new access token using the refresh token stored in cookies.
 *     responses:
 *       200:
 *         description: Access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshApiResponse'
 *       401:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 */
router.post("/refresh", controller.refresh);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logout user
 *     description: Logs out the authenticated user and clears the refresh token cookie.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutApiResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/logout", auth, controller.logout);

/**
 * @swagger
 * /auth/forgot:
 *   post:
 *     tags: [Authentication]
 *     summary: Request password reset
 *     description: Sends a password reset link to the user's email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/forgot", controller.forgotPassword);

/**
 * @swagger
 * /auth/reset/{token}:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset password
 *     description: Resets a user's password using a valid reset token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid or expired reset token
 *       500:
 *         description: Internal server error
 */
router.post("/reset/:token", controller.resetPassword);

module.exports = router;


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

