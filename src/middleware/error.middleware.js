function errorHandler(err, req, res, next) {

    if(err.code === 11000){
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        });
    }
    
    const status = err.statusCode || 500;

    res.status(status)
        .json({
            success: false,
            message: err.message || "Internal Server Error"
        });

}

module.exports = errorHandler;