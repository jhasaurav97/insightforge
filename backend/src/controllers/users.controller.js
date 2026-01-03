import prisma from "../db/prisma.js";
import { ApiError } from "../utils/api-error.js"
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"

const getUsers = asyncHandler(async (req, res) => {
    const { page, limit, search, sortBy, order } = req.query;

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
    
    const orderBy = {
        [sortBy]: order,
    };

    // DB calls
    const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
            where,
            skip,
            take: limit,
            orderBy,
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

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body; //alreeady validate

    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedUser, "User updated successfully")
        );
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

    await prisma.user.delete({
        where: {id}
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "User deleted successfully")
        );
});

export { getUsers, getUserById, updateUser, deleteUser };