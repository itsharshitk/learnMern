require("dotenv").config();

module.exports = {
    port: process.env.PORT,

    node_env: process.env.NODE_ENV,
    
    mongo_uri: process.env.MONGO_URI,
    
    jwt_secret: process.env.JWT_SECRET,
    
    jwt_refresh: process.env.JWT_REFRESH
}