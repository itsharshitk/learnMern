const jwt = require("jsonwebtoken");
const config = require("../config");

function createAccessToken(user){
    return jwt.sign(
        
        {
            id:user._id,
            role: user.role
        },

        config.jwt_secret,

        {expiresIn: "15m"}

    );
}

function createRefreshToken(user){
    return jwt.sign(

        {id:user._id},

        config.jwt_refresh,

        {expiresIn: "7d"}

    );
}

module.exports = {
    createAccessToken,
    createRefreshToken
}