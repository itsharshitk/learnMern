const pino = require("pino");
const config = require("../config");

const logger = pino({

    transport: config.node_env !== "production" ? {target: "pino-pretty"} : undefined

});

module.exports = logger;