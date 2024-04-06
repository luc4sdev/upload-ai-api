import {
  openai
} from "./chunk-65KB7CUY.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/generate-ai-completion.ts
import { z } from "zod";
import { streamToResponse, OpenAIStream } from "ai";
async function generateAiCompletionRoute(app) {
  app.post("/ai/complete", async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5)
    });
    const { videoId, prompt, temperature } = bodySchema.parse(req.body);
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    });
    if (!video.transcription) {
      return reply.status(400).send({ error: "Video transcription was not generated yet." });
    }
    const promptMessage = prompt.replace("{transcription}", video.transcription);
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      temperature,
      messages: [
        { role: "user", content: promptMessage }
      ],
      stream: true
    });
    const stream = OpenAIStream(response);
    streamToResponse(stream, reply.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
      }
    });
  });
}

export {
  generateAiCompletionRoute
};
