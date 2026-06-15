const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const {createAccessToken, createRefreshToken} = require("../utils/token");

function register(data) {
    return User.create(data);
}

async function login(email, password) {
    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(401, "Invalid credentials");
    }

    const ok = await user.comparePassword(password);

    if(!ok){
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = createAccessToken(user);

    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    return {
        accessToken,
        refreshToken,
        user
    };
}


module.exports = {register, login};