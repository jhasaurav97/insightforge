import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://ai-service:8000";

export const analyzeText = async (text) => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/ai/analyze`,
            { text },
            {
                timeout: 60000,
            }
        );

        return response.data;
    } catch (error) {
        console.error("AI error:", error.message);
        throw error;
    }
};