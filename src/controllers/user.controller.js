const userService = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");


exports.getUsers = asyncHandler( async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
});

exports.createUser = asyncHandler( async (req, res) => {
    const createdUser = await userService.createUser(req.body);
    res.status(201).json(createdUser);
});

exports.getUser = asyncHandler( async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.json(user);
});

exports.deleteUser = asyncHandler( async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.send("User Deleted");
});