import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://ai-service:8000";

export const analyzeText = async (text) => {
    const response = await axios.post(`${AI_SERVICE_URL}/ai/analyze`,
        { text },
        {
            timeout: 5000,                                      
        }
    );

    return response.data;
};