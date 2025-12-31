import { analyzeText } from "../services/ai.service.js";
import { ApiResponse } from "../utils/api-response.js"
import { asyncHandler } from "../utils/async-handler.js"

const analyze = asyncHandler(async (req, res) => {
    const { text } = req.body;

    const result = await analyzeText(text);

    return res
        .status(200)
        .json(
            new ApiResponse(200, result, "AI analysis successful")
        );
});

export { analyze };