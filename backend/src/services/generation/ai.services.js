
// talking to openAI / GROQ AI

import OpenAI from "openai";
import { AI_MODEL } from "../../config/ai.config.js"; 

// wrapper - SDK client
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
})

// call openAI to generate Content
export async function generateContent(prompt){
    try {
            const response = await client.chat.completions.create({
                model: AI_MODEL,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })

            const tokensUsed = response.usage?.total_tokens || 0
            const result = response.choices[0].message.content

            return {result, tokensUsed}
    } catch (error) {
        console.error("AI API Error:", error)
        throw new Error("AI generation failed")
    }
}