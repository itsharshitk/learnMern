const cloudinary = require("cloudinary").v2;
const config = require("./index");

cloudinary.config({
    
    cloudinary_name: process.env.CLOUDINARY_NAME,

    api_key: process.env.CLOUDINARY_KEY,
    
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = cloudinary;