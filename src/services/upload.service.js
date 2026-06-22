const cloudinary = require("../config/cloudinary");

function uploadImage(buffer){

    console.log(
        "Uploading bytes:",
        buffer.length
    );

    return new Promise(
        (resolve, reject)=>{

            const stream =
                cloudinary.uploader.upload_stream(
                    {
                        folder:"mern-learning",
                        timeout:60000
                    },
                    (err,result)=>{

                        console.log(
                            "Cloudinary callback"
                        );

                        if(err){
                            console.error(err);
                            return reject(err);
                        }

                        return resolve(result);
                    }
                );

            stream.on(
                "error",
                console.error
            );

            stream.end(buffer);
        }
    );
}

async function deleteImage(publicId) {
    if(!publicId) return;

    await cloudinary.uploader.destroy(publicId);
}

module.exports = {uploadImage, deleteImage};