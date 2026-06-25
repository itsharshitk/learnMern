/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665b2b9c0f9a8a1d4e3b1234
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@yopmail.com
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: user
 *         isVerified:
 *           type: boolean
 *           example: true
 *         avatar:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *             publicId:
 *               type: string
 *             size:
 *               type: number
 *             width:
 *               type: number
 *             height:
 *               type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@yopmail.com
 *         password:
 *           type: string
 *           format: password
 *           example: Password@123
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: admin
 *         avatar:
 *           type: string
 *           format: binary
 *           description: Avatar image file
 *
 *     UserResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               $ref: '#/components/schemas/User'
 *
 *     UsersResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
