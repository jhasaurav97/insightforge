import { analyzeText } from "../services/ai.service.js";
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import prisma from "../db/prisma.js";


const analyze = asyncHandler(async (req, res) => {
    console.log("BODY 👉", req.body);

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

    const insights = await prisma.insight.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            input: true,
            output: true,
            createdAt: true,
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200, insights, "AI insights fetched successfully")
        );
});

export { analyze, getInsights };