const User = require("../models/user.model");
const repo = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");

async function getUsers(page=1, limit=10){

    const skip = (page-1) * limit;

    const users = await User.find()
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await User.countDocuments();

    return {users, page, limit, total};

}

async function createUser(data){
    return User.create(data);
}

async function getUser(id){
    const user = await User.findById(id)
        .lean();

    if(!user){
        throw new ApiError(404, "User not found");
    }

    return user;
}

async function deleteUser(id){
    const delUser = await User.findByIdAndDelete(id);

    if(!delUser){
        throw new ApiError(404, "User not found");
    }

    return delUser;
}


module.exports = {
    getUsers,
    createUser,
    getUser,
    deleteUser
}