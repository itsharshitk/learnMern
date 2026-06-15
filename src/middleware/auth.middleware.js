const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const auth = (req, res, next) => {
    
    const token = req.headers.authorization?.replace("Bearer ", "");

    if(!token){
        return next(new ApiError(401, "Unauthorized"));
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        
        next();
    } catch{
        next(
            new ApiError(401, "Invalid token")
        );
    }

}

module.exports = auth;