import { z } from "zod";

export const analyzeSchema = z.object({
    body: z.object({
        text: z.string().trim().min(1, "Text is required")
    }),
}); 