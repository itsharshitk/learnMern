const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

async function getUsers(){
    return User.find();
}

async function createUser(data){
    return User.create(data);
}

async function getUser(id){
    const user = await User.findById(id);

    if(!user){
        throw new ApiError(404, "Users not found");
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