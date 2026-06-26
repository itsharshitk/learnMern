const mongoose = require("mongoose");

async function connectDB(uri) {
    try {
        await mongoose.connect(uri);

        console.log("DB Connected");
    } catch (err) {
        console.log(err);

        process.exit(1);
    }
}

module.exports = connectDB;