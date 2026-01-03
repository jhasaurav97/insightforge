import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Not authorized");
        }

        const token = authHeader.split(" ")[1];
    

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true },
        });

        

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
      }
});

export { verifyJWT };