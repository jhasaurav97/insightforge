import prisma from "../db/prisma.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { comparePassword, hashPassword } from "../utils/password.util.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });

    return res.status(201).json(
        new ApiResponse(201, {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
        }, "User registered successfully")
    )
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    })

    return res.status(200).json(
        new ApiResponse(200, {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            accessToken,
            refreshToken,
        }, "Login successfully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });

    return res.status(200).json(
        new ApiResponse(200, null, "Logout successfully")
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token required");
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )

    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
    });

    if(!user || user.refreshToken !== refreshToken){
        throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: newRefreshToken }
    });

    return res.status(200).json(
        new ApiResponse(200, {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }, "Token refreshed successfully")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    return res.status(200).json(
        new ApiResponse(200, user)
    );
});

const updateMe = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { name, email } = req.body;

    const user = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    return res.status(200).json(
        new ApiResponse(200, user)
    );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateMe
};