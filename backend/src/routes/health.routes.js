import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({ status: "OK", message: "InsightForge backend is running" })
});

export default router;