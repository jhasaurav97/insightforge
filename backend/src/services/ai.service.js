import axios from "axios";

const AI_SERVICE_URL =
    process.env.AI_SERVICE_URL || "http://ai-service:8000";

let aiWarmedUp = false;

// Axios instance
const aiAxios = axios.create({
    baseURL: AI_SERVICE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000, // cold start friendly
});

// ---- Warm-up ----
export const warmUpAI = async () => {
    if (aiWarmedUp) return;

    try {
        await aiAxios.get("/health", { timeout: 5000 });
        aiWarmedUp = true;
        console.log("✅ AI service warmed up");
    } catch (err) {
        console.log("⚠️ AI warm-up failed, will retry later");
    }
};

// ---- Analyze with retry ----
export const analyzeWithRetry = async (payload, retries = 1) => {
    try {
        const response = await aiAxios.post("/ai/analyze", payload);
        return response.data;
    } catch (err) {
        if (retries > 0) {
            console.log("🔁 AI request failed, retrying...");
            await warmUpAI();
            return analyzeWithRetry(payload, retries - 1);
        }

        throw err;
    }
};