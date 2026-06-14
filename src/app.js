const express = require("express");
const pinoHttp = require("pino-http");
const logger = require("./utils/logger");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.use(pinoHttp({logger}));

app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));

app.use("/users", require("./routes/user.routes"));

const errorHandler = require("./middleware/error.middleware");

app.use(errorHandler);

module.exports = app;