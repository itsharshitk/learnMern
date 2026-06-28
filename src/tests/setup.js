const mongoose = require("mongoose");
const connectDB = require("../config/db");
const config = require("../config");

beforeAll(async () => {
    await connectDB(config.mongo_uri_test);
});

beforeEach(async function clearDatabase(){
    const collections = mongoose.connection.collections;

    for(const key in collections){
        await collections[key].deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

// docker compose exec api npm test