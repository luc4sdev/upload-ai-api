import {
  createTranscriptionRoute
} from "./chunk-3OVTDGIB.mjs";
import {
  generateAiCompletionRoute
} from "./chunk-KVHMCPET.mjs";
import "./chunk-65KB7CUY.mjs";
import {
  getAllPromptsRoute
} from "./chunk-B7KIXG6M.mjs";
import {
  uploadVideoRoute
} from "./chunk-CG7MCISV.mjs";
import "./chunk-YVGXYLIE.mjs";
import "./chunk-OLNOUFRH.mjs";

// src/server.ts
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);
app.listen({
  port: 3333
}).then(() => {
  console.log("HTTP Server Running!");
});
