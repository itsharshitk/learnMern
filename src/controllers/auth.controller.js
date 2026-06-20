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

exports.verify = asyncHandler(
    async (req, res) => {
        
        await service.verify(req.params.token);
        
        res.json(
            { success: true }
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

exports.me = asyncHandler(async (req, res) => {
    const user = await service.getProfile(req.user.id);

    res.json(
        new ApiResponse(200, "User profile fetched", {data: user})
    );
});

exports.refresh = asyncHandler(async (req, res) => {
    
    const token = req.cookies.refreshToken;

    const access = await service.refresh(token);

    res.json(
        new ApiResponse(200, "Token created", {accessToken: access})
    );

});

exports.logout = asyncHandler(async (req, res) => {

    await service.logout(req.user.id);

    res.clearCookie("refreshToken");

    res.json(
        new ApiResponse(200, "Logout successful")
    );
    
});

exports.forgotPassword = asyncHandler(
    async (req, res) => {
        await service.forgotPassword(req.body.email);

        res.json({
            success: true
        });
    }
);

exports.resetPassword = asyncHandler(
    async (req, res) => {
        await service.resetPassword(req.params.token, req.body.password);

        res.json({
            success: true
        });
    }
);