const User = require("../models/user.model");
const upload = require("./upload.service");

async function updateAvatar(userId, file) {
    const image = await upload.uploadImage(file.buffer);

    return User.findByIdAndUpdate(
        userId,
        {
            avatar: image.secure_url
        },
        {
            new: true
        }
    )
    .select("-password")
}

module.exports = updateAvatar;