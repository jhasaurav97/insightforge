import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { analyzeSchema } from "../validators/ai.validator.js";
import { analyze } from "../controllers/ai.controller.js";

const router = Router();

router.post("/analyze", validate(analyzeSchema), analyze);

export default router;