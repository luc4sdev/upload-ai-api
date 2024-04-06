import {
  prisma
} from "./chunk-YVGXYLIE.mjs";

// src/routes/get-all-prompts.ts
async function getAllPromptsRoute(app) {
  app.get("/prompts", async () => {
    const prompts = await prisma.prompt.findMany();
    return prompts;
  });
}

export {
  getAllPromptsRoute
};
