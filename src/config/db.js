const mongoose = require("mongoose");
const config = require("./index");

async function connectDB() {
    try {
        await mongoose.connect(config.mongo_uri);

        console.log("DB Connected");
    } catch (err) {
        console.log(err);

        process.exit(1);
    }
}

module.exports = connectDB;