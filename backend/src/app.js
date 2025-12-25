import express from "express";

const app = express();

app.use(express.json());

app.get("/health", async (req, res) => {
    res.json({
        status: "OK",
        message: "InsightForge  backend is running"
    })
});

export default app;