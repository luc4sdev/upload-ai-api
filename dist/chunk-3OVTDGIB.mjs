import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/create-transcription.ts
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
    return true;
  });
}

export {
  createTranscriptionRoute
};
