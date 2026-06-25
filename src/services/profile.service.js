const sharp = require("sharp");
const User = require("../models/user.model");
const {uploadImage, deleteImage} = require("./upload.service");
const ApiError = require("../utils/ApiError");

async function updateAvatar(userId, file) {
    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const processedBuffer = await sharp(file.buffer)
                                .resize(500, 500, {fit: "cover"})
                                .webp({quality: 80})
                                .toBuffer();
    
    if(user.avatar?.publicId){
        await deleteImage(user.avatar.publicId);
    }

    const uploadedImage = await uploadImage(processedBuffer);
    
    user.avatar = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id,
        size: uploadedImage.bytes,
        width: uploadedImage.width,
        height: uploadedImage.height
    }
    
    await user.save();

    // return User.findById(userId).select("-password");

    user.password = undefined;
    
    return user;

}

module.exports = {updateAvatar};