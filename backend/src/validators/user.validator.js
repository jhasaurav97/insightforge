import { z } from "zod";

export const getUsersSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().min(1).default(1),

        limit: z.coerce.number().int().min(1).max(50).default(10),

        search: z.string().trim().min(1).optional(),
    }),
});

export const getUserByIdSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().min(1)
    }),
});

export const updateUserSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().min(1),
    }),
    body: z.object({
        name: z.string().trim().min(1).optional(),
        email: z.email().optional(),
    }).refine(data => Object.keys(data).length > 0, {
        message: "At least one field (name or email) is required",
    }),
});

export const deleteUserSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().min(1),
    }),
});