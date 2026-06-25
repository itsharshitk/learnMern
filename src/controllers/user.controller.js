const userService = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


exports.getUsers = asyncHandler( async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const users = await userService.getUsers(page, limit);
    
    res.json(new ApiResponse(200, "Fetched users", users));

});

exports.createUser = asyncHandler( async (req, res) => {
    const createdUser = await userService.createUser(req.body, req.file);

    res.status(201).json(
        new ApiResponse(201, "User Created Successfully", createdUser)
    );
});

exports.getUser = asyncHandler( async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.json(new ApiResponse(200, "Fetched user", user));
});

exports.deleteUser = asyncHandler( async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.json(new ApiResponse(204, "Deleted user"));
});