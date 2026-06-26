const config = require("./src/config");

const connectDB = require("./src/config/db");
const app = require("./src/app");

async function start() {
await connectDB(config.mongo_uri);

app.listen(config.port, () => {console.log("Server Running")});
}

start();