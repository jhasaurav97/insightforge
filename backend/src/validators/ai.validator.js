import { z } from "zod";

const analyzeSchema = z.object({
    body: z.object({
        text: z.string().trim().min(1, "Test is required"),
    }),
});

const getInsightsSchema = z.object({
    query: z.object({
        page: z
        .coerce.number().int().min(1).default(1),
            
        limit: z
            .coerce.number().int().min(1).max(50).default(50),
    }),
});

export { analyzeSchema, getInsightsSchema };