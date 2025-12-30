import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
    // Zod validation error
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: err.issues.map(e => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    }
    // Existing ApiError handling
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }
    // Fallback (real 500)
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

export default errorHandler;