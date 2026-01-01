import { analyzeText } from "../services/ai.service.js";
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"
import prisma from "../db/prisma.js";

const analyze = asyncHandler(async (req, res) => {
    const { text } = req.body;

    // TEMP: fake user (until auth is added)
    const userId = 2;

    const aiResult = await analyzeText(text); 

    // save to DB
    const insight = await prisma.insight.create({
        data: {
            input: text,
            output: aiResult.insight,
            userId,
        },
    });


    return res
        .status(201)
        .json(
            new ApiResponse(201, insight, "AI insight saved successfully")
        );
});

export { analyze };