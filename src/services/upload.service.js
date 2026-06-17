const cloudinary = require("../config/cloudinary");

async function uploadImage(buffer) {
    return new Promise(
        (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "mern-learning"
                },
                (err, result) => {
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                }
            );
            stream.end(buffer);
        }
    );
}

module.exports = {uploadImage};