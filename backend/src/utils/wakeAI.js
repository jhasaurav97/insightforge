import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

// wake AI container safely
export const wakeAIService = async () => {
    try {
        await axios.get(`${AI_SERVICE_URL}/health`, {
            timeout: 60000
        });
        console.log("✅ AI service awake");
    } catch (error) {
        console.error("⚠️ AI wake retry...");
        await axios.get(`${AI_SERVICE_URL}/health`, {
            timeout: 60000
        });
    }
};