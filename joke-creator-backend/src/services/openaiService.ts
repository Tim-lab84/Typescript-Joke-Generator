import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateJoke(prompt: string): Promise<string> {
  try {
    // Using the newer chat completion API with gpt-3.5-turbo or gpt-4
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can also use "gpt-4" if you have access
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates jokes.",
        },
        {
          role: "user",
          content: `Create a joke based on this prompt: ${prompt}`,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return response.choices[0].message.content?.trim() || "No joke generated";
  } catch (error) {
    console.error("Error generating joke:", error);
    throw new Error("Failed to generate joke");
  }
}
