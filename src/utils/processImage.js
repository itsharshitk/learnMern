const sharp = require("sharp");


const processedProfile = async (buffer) => {
    return await sharp(buffer)
                    .resize(500, 500, {fit: "cover"})
                    .webp({quality: 80})
                    .toBuffer();
}

module.exports = {processedProfile}