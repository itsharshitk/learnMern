/**
 * @swagger
 * components:
 *  schemas:
 *      Avatar:
 *          type: object
 *          required:
 *              - avatar
 *          properties:
 *              avatar:
 *                  type: string
 *                  format: binary
 *                  description: Avatar image file
 *      AvatarResponse:
 *          type: object
 *          properties:
 *              success:
 *                  type: boolean
 *                  example: true
 *              message:
 *                  type: string
 *                  example: Avatar updated successfully
 *              avatarUrl:
 *                  type: string
 *                  example: https://cdn.example.com/avatar.jpg
 */