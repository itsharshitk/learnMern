const userService = require("../services/user.service");

exports.getUsers = async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
};

exports.createUser = async (req, res) => {
    const createdUser = await userService.createUser(req.body);
    res.status(201).json(createdUser);
}

exports.getUser = async (req, res) => {
    const user = await userService.getUser(req.params.id);
    res.json(user);
}

exports.deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.send("User Deleted");
}