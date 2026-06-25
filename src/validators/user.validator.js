const z = require('zod');

const createUserSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name can not exceed 50 characters")
        .trim(),

    email: z
        .email("Invalid email address")
        .toLowerCase()
        .trim(),

    password: z
        .string()
        .min(6, "Min 6 characters are required"),
    
    role: z
        .enum(["admin", "user"], {error: "Role must be either 'admin' or 'user'"}),

    avatar: z.object({
        url: z.url("Invalid avatar URL"),
        publicId: z.string(),
        size: z.number(),
        width: z.number(),
        height: z.number(),
    }).optional(),
});

module.exports = {
    createUserSchema
}