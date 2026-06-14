const express = require("express");
const pinoHttp = require("pino-http");
const logger = require("./utils/logger");
const app = express();

app.use(pinoHttp({logger}));

app.use(express.json());

app.use("/users", require("./routes/user.routes"));

const errorHandler = require("./middleware/error.middleware");

app.use(errorHandler);

module.exports = app;