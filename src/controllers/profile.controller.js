const asyncHandler = require("../utils/asyncHandler");
const service = require("../services/profile.service");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

exports.uploadAvatar = asyncHandler(
    async (req, res) => {
        if(!req.file){
            throw new ApiError(400, "Image required");
        }
        
const user = await service.updateAvatar(req.user.id, req.file);


        res.json(
            new ApiResponse(200, "Image updated successfully", user)
        );
    }
);