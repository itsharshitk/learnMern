const jwt = require("jsonwebtoken");

function createAccessToken(user){
    return jwt.sign(
        
        {id:user._id},

        process.env.JWT_SECRET,

        {expiresIn: "15m"}

    );
}

function createRefreshToken(user){
    return jwt.sign(

        {id:user._id},

        process.env.JWT_REFRESH,

        {expiresIn: "7d"}

    );
}

module.exports = {
    createAccessToken,
    createRefreshToken
}