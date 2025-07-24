import express from 'express';
import OpenAI from 'openai';
import { systemPrompt } from '../config.js';
import { getMemory, addToMemory } from '../memory.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  const messages = [
    { role: "system", content: systemPrompt },
    ...getMemory(),
    { role: "user", content: userMessage }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    addToMemory(userMessage, response);

    const confirmed = response.includes("*****");

    res.json({ response, confirmed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI API failed" });
  }
});

export default router;
