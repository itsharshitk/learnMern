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

async function getProfile(id) {
    return await User
                .findById(id)
                .select("-password, -refreshToken")
                .lean()
}

async function refresh(refreshToken) {
    const jwt = require("jsonwebtoken");

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);

    const user = User.findById(payload.id);

    if(!user || user.refreshToken !== refreshToken){
        throw new ApiError(401, "Invalid token");
    }

    const access = createAccessToken(user);

    return access;

}

async function logout(id) {
    await User.findByIdAndUpdate(id, {refreshToken: null});
}

module.exports = {register, login, getProfile, refresh};