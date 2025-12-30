import prisma from "../db/prisma.js";
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"

const createUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new ApiError(400, "Name and email are required");
    }

    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists with this email")
    }

    const user = await prisma.user.create({
        data: { name, email }
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                user,
                "User created successfully"
            )
        )
});

const getUsers = asyncHandler(async (req, res) => {
    const { page, limit, search } = req.query;

    // Pagination method
    const skip = (page - 1) * limit;

    // Built filter only if search exists
    const where = search
        ? {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
            ],
        } : {};

    // DB calls
    const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            },
        }),
        prisma.user.count({ where }),
    ]);

    // Edge cases
    if (!users) {
        throw new ApiError(404, "Users not found");
    }

    const totalPages = Math.ceil(totalUsers / limit);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {
                users,
                pagination: {
                    page,
                    limit,
                    totalUsers,
                    totalPages,
                },
            })
        );
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, user)
        );
});

export { createUser, getUsers, getUserById };