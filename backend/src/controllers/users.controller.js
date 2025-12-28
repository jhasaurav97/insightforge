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
    // Read params query
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Defensive checks
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if (limit > 50) limit = 50;

    // Pagination method
    const skip = (page - 1) * limit;

    // DB calls
    const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
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
        prisma.user.count(),
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
                    totalPages
                },
            })
        );
});

export { createUser, getUsers };