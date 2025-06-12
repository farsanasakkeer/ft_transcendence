import Fastify from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import fastifyOauth2 from "@fastify/oauth2";

import { authRoutes } from "./routes/auth";
import { dashboardRoutes } from "./routes/dashboard";
import { twofaRoutes } from "./routes/twofa";
import { googleAuthRoutes } from "./routes/google";
import { matchRoutes } from "./routes/match";


dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(fastifyOauth2, {
  name: "googleOAuth2",
  scope: ["profile", "email"],
  credentials: {
    client: {
      id: process.env.GOOGLE_CLIENT_ID!,
      secret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    auth: fastifyOauth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: "/auth/google",
  callbackUri: "http://localhost:3000/auth/google/callback",
});

fastify.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});

fastify.register(formbody);

// Register route modules
fastify.register(authRoutes);
fastify.register(googleAuthRoutes);
fastify.register(dashboardRoutes);
fastify.register(twofaRoutes);
fastify.register(matchRoutes);
fastify.listen({ port: 3000, host: "0.0.0.0" }, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
