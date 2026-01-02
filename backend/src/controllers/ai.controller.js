import { analyzeText } from "../services/ai.service.js";
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import prisma from "../db/prisma.js";
import { email } from "zod";


const analyze = asyncHandler(async (req, res) => {
    const { text } = req.body;

    const userId = 2;

    const aiResult = await analyzeText(text);

    const insight = await prisma.insight.create({
        data: {
            input: text,
            output: aiResult.insight,
            userId: userId,
        },
    });

    return res.status(201)
        .json(
            new ApiResponse(201, insight, "AI insight saved successfully")
        );
});

const getInsights = asyncHandler(async (req, res) => {
    const userId = 2;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [insights, total] = await Promise.all([
        prisma.insight.findMany({
            where: { userId },
            orderBy: {createdAt: "desc"},
            skip,
            take: limit,
            select: {
                id: true,
                input: true,
                output: true,
                createdAt: true,
            },
        }),
        prisma.insight.count({
            where: { userId }
        }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {
                insights,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                },
            }, "AI insights fetched successfully")
        );
});

export { analyze, getInsights };