require("dotenv").config();

module.exports = {
    port: process.env.PORT,

    node_env: process.env.NODE_ENV,
    
    mongo_uri: process.env.MONGO_URI,
    
    jwt_secret: process.env.JWT_SECRET,
    
    jwt_refresh: process.env.JWT_REFRESH,

    cloudinary_name: process.env.CLOUDINARY_NAME,

    cloudinary_key: process.env.CLOUDINARY_KEY,
    
    cloudinary_secret: process.env.CLOUDINARY_SECRET,

    redis_url: process.env.REDIS_URL,

    smtp_host: process.env.SMTP_HOST,
    smpt_port: process.env.SMTP_PORT,

    smpt_user: process.env.SMTP_USER,
    smpt_pass: process.env.SMTP_PASS,

    app_url: process.env.APP_URL
}