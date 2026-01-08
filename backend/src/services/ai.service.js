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
        console.log("⚠️ AI warm-up failed, will retry on demand");
    }
};

// ---- Analyze with retry ----
export const analyzeText = async (text, retries = 1) => {
    try {
        const response = await aiAxios.post("/ai/analyze", { text });
        return response.data;
    } catch (error) {
        if (retries > 0) {
            console.log("🔁 AI analyze failed, retrying...");
            await warmUpAI();
            return analyzeText(text, retries - 1);
        }

        console.error("❌ AI error:", error.message);
        throw error;
    }
};
