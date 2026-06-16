const repo = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");
const {createAccessToken, createRefreshToken} = require("../utils/token");
const config = require("../config");

async function register(data) {
    
    const existing = await repo.findByEmail(data.email);

    if(existing){
        throw new ApiError(409, "Email already exists");
    }

    return repo.create(data);
}

async function login(email, password) {
    const user = await repo.findByEmail(email);

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
    return await repo.findById(id);
}

async function refresh(refreshToken) {
    const jwt = require("jsonwebtoken");

    const payload = jwt.verify(refreshToken, config.jwt_refresh);

    const user = await repo.findByIdWithToken(payload.id);
    
    if(!user || user.refreshToken !== refreshToken){
        throw new ApiError(401, "Invalid token");
    }

    const access = createAccessToken(user);

    return access;

}

async function logout(id) {
    await repo.update(id, {refreshToken: null});
}

module.exports = {register, login, getProfile, refresh, logout};