import { z } from "zod";

export const getUsersSchema = z.object({
    query: z.object({
        page: z
            .string()
            .optional()
            .transform(Number)
            .refine((v) => Number.isInteger(v) && v >= 1, {
                message: "page must be a positive integer",
            })
            .default(1),

        limit: z
            .string()
            .optional()
            .transform(Number)
            .refine((v) => Number.isInteger(v) && v >= 1 && v <= 50, {
                message: "limit must be between 1 and 50",
            })
            .default(10),
    }),
});