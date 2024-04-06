import {
  openai
} from "./chunk-65KB7CUY.mjs";
import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/create-transcription.ts
import fs from "node:fs";
import { z } from "zod";
async function createTranscriptionRoute(app) {
  app.post("/videos/:videoId/transcription", async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid()
    });
    const { videoId } = paramsSchema.parse(req.params);
    const bodySchema = z.object({
      prompt: z.string()
    });
    const { prompt } = bodySchema.parse(req.body);
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    });
    const videoPath = video.path;
    const audioReadStream = fs.createReadStream(videoPath);
    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt
    });
    const transcription = response.text;
    await prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        transcription
      }
    });
    return { transcription };
  });
}

export {
  createTranscriptionRoute
};
