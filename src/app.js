const express = require("express");
const app = express();

app.use(express.json());
app.use("/users", require("./routes/user.routes"));

const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;