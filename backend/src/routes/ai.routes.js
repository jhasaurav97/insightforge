import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { analyzeSchema, getInsightsSchema } from "../validators/ai.validator.js";
import { analyze, getInsights} from "../controllers/ai.controller.js";

const router = Router();

router.post("/analyze", validate(analyzeSchema), analyze);
router.get("/insights", validate(getInsightsSchema), getInsights);

export default router;