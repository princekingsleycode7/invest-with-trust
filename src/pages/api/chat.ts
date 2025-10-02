import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import express from 'express';

const router = express.Router();
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.VITE_GEMINI_API_KEY;

router.post('/', async (req, res) => {
  const { history, question } = req.body;

  if (!API_KEY) {
    return res.status(500).json({ error: "Gemini API key not found" });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        ...history,
        {
          role: "user",
          parts: [{ text: "You are RehobothBot, an AI assistant for Rehoboth Bank, an investment platform. Your goal is to provide helpful and accurate information to users about the company, its investment products, and how to use the platform. You should be friendly, professional, and always act in the user's best interest. Do not provide financial advice, but you can explain the features and benefits of different investment options. Information about the company: Rehoboth Bank is a leading investment platform in Nigeria, offering a range of curated investment opportunities in various sectors like agriculture, real estate, and technology. Our mission is to democratize access to wealth-creating opportunities for everyone. We provide a secure and transparent platform for investing." }],
        },
        {
          role: "model",
          parts: [{ text: "Hello! I'm RehobothBot. I'm here to help you with any questions you have about Rehoboth Bank and our investment platform. How can I assist you today?" }]
        }
      ],
    });

    const result = await chat.sendMessage(question);
    const response = result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;
}
