const z = require("zod");

exports.registerSchema = z.object({
    name: z.string()
        .min(3, "Name must be atleast 3 characters long")
        .max(50, "Name must be atmost 50 characters long")
        .trim(),
    
    email: z.string()
        .email("Invalid Email Address")
        .toLowerCase()
        .trim(),
    
    password: z.string()
        .min(8, "Password must be atleast 8 characters long")
        .max(68, "Password must not exceed 68 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        )
});

exports.loginSchema = z.object({
    email: z.string()
        .email("Invalid Email Address")
        .toLowerCase()
        .trim(),
    
    password: z.string()
});