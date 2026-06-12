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
        .trim()
});

module.exports = {
    createUserSchema
}