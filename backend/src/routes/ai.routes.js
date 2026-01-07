import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { analyzeSchema, getInsightsSchema } from "../validators/ai.validator.js";
import { analyze, deleteInsight, getInsights} from "../controllers/ai.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/analyze", verifyJWT, validate(analyzeSchema), analyze);
router.get("/insights", verifyJWT, validate(getInsightsSchema), getInsights);
router.delete("/insights/:id", verifyJWT, deleteInsight);

export default router;