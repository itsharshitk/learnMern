const ApiError = require("../utils/ApiError")

function allow(...roles){
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ApiError(403, "Access denied")
            );
        }
        
        next();
    };
}

module.exports = allow;