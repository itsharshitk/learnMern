const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const config = require("../config");

const auth = (req, res, next) => {
    
    const token = req.headers.authorization?.replace("Bearer ", "");

    if(!token){
        return next(new ApiError(401, "Unauthorized"));
    }

    try{
        const decoded = jwt.verify(token, config.jwt_secret);
        
        req.user = decoded;
        
        next();
    } catch{
        next(
            new ApiError(401, "Invalid token")
        );
    }

}

module.exports = auth;