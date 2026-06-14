const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const service = require("../services/auth.service");

exports.register = asyncHandler(
    async (req, res) => {
        
        const user = await service.register(req.body);
       
        res.status(201).json(
            new ApiResponse(201, "User Registered", user)
        );

    }
);

exports.login = asyncHandler(async (req, res) => {
    
    const result = await service.login(req.body.email, req.body.password);
    
    res.cookie("refreshToken", result.refreshToken, {httpOnly:true, secure:false})
    .status(200).json(
        new ApiResponse(200, "Login Successful", {accessToken: result.accessToken})
    );

});