const express = require("express");
const pinoHttp = require("pino-http");
const logger = require("./utils/logger");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const app = express();

app.use(cookieParser());

app.use(pinoHttp({logger}));

app.use(express.json());

app.use(
    "/docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            docExpansion: "none",
            defaultModelsExpandDepth: -1 
        },
    })
);

app.use("/auth", require("./routes/auth.routes"));

app.use("/users", require("./routes/user.routes"));

app.use("/profile", require("./routes/profile.routes"));

const errorHandler = require("./middleware/error.middleware");

app.use(errorHandler);

module.exports = app;