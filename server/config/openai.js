import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.BASE_URL,
});

export default openai;