const repo = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");
const {createAccessToken, createRefreshToken} = require("../utils/token");
const config = require("../config");
const queue = require("../jobs/email.queue");
const { randomToken } = require("../utils/token.util");
const crypto = require("crypto");

async function register(data) {
    
    const existing = await repo.findByEmail(data.email);

    if(existing){
        throw new ApiError(409, "Email already exists");
    }

    const token = randomToken();

    const user = repo.create({ ...data, verificationToken: token });

    await queue.add(
        "verify",
        {
            to: data.email,
            
            subject: "Verify Account",

            html: `<a href="${config.app_url}/auth/verify/${token}"> Verify </a>`
        }
    );

    return user;
}

async function verify(token) {
    const user = await repo.findByVerificationToken(token);

    if(!user){
        throw new ApiError(400, "Invalid token");
    }

    user.isVerified = true;
    user.verificationToken = null;

    await user.save();
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

async function forgotPassword(email) {
    const user = await repo.findByEmail(email);

    if(!user) {
        throw new ApiError(400, "User not found");
    }

    const resetPasswordToken = randomToken();
    
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes expiry

    await user.save();

    await queue.add(
        "reset",
        {
            to: user.email,
            subject: "Reset Password",
            html: `<a href="${config.app_url}/auth/reset/${resetPasswordToken}">Reset</a>`
        }
    );

}

async function resetPassword(token, password) {
    const user = await repo.resetUser(token);

    if(!user) {
        throw new ApiError(400, "Token invalid or expired");
    }

    user.resetPasswordToken = null;
    user.password = password;

    await user.save();
}

module.exports = {register, verify, login, getProfile, refresh, logout, forgotPassword, resetPassword};