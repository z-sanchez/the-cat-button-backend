import OpenAI, { ClientOptions } from "openai";

const openAiConfig: ClientOptions = { apiKey: process.env.OPENAI_API_KEY };

export const client = new OpenAI(openAiConfig);
