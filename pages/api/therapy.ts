import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface HuggingFaceResponse {
  generated_text?: string;
  error?: string;
}

interface TherapyResponse {
  reply: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TherapyResponse>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;

  if (!prompt?.trim()) {
    return res.status(400).json({ reply: "Please provide a prompt." });
  }

  if (!process.env.HF_API_KEY) {
    console.error("HF_API_KEY environment variable is not set");
    return res
      .status(500)
      .json({ reply: "Server configuration error. Please try again later." });
  }

  try {
    const response = await axios.post<HuggingFaceResponse>(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    const reply = response.data.generated_text || "I'm here for you. Tell me more.";
    res.status(200).json({ reply });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Bot error:", errorMsg);
    res.status(500).json({ reply: "I'm having trouble responding at the moment." });
  }
}
