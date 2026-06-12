const User = require("../models/user.model");

async function getUsers(){
    return User.find();
}

async function createUser(data){
    return User.create(data);
}

async function getUser(id){
    return User.findById(id);
}

async function deleteUser(id){
    return User.findByIdAndDelete(id);
}


module.exports = {
    getUsers,
    createUser,
    getUser,
    deleteUser
}