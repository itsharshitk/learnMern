const config = require("./src/config");

const connectDB = require("./src/config/db");
const app = require("./src/app");

connectDB();

app.listen(config.port, () => {console.log("Server Running")});