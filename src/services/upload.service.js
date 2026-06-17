const cloudinary = require("../config/cloudinary");

function uploadImage(buffer) {
    return new Promise(
        (resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "mern-learning"
                },
                (err, result) => {
                    if(err){
                        return reject(err);
                    }
                    resolve(result);
                }
            );

            stream.end(buffer);
        }
    );
}

module.exports = {uploadImage};