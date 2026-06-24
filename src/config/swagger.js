const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Learn Mern APIs",
            version: "1.0.0"
        }
    },
    apis: [
        "./src/routes/*.js",
        "./src/docs/*.js"
    ]
}

module.exports = swaggerJsdoc(options);