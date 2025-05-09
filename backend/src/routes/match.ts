import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

export async function matchRoutes(fastify: FastifyInstance) {
  // Save a new match
  fastify.post("/matches", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
    const { playerScore, guestScore, game } = req.body as {
      playerScore: number;
      guestScore: number;
      game: string;
    };
  
    if (!["pong", "xo", "pong-ai"].includes(game)) {
      return reply.status(400).send({ error: "Invalid game type" });
    }
  
    const result = playerScore > guestScore ? "win" : playerScore < guestScore ? "loss" : "draw";
  
    const match = await prisma.match.create({
      data: {
        playerScore,
        guestScore,
        result,
        game,
        userId: req.user.id,
      },
    });
  
    reply.send({ success: true, match });
  });
  

  // Get match history for logged-in user
  fastify.get("/matches", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
    const gameFilter = (req.query as any).game; // optional query param
  
    const matches = await prisma.match.findMany({
      where: {
        userId: req.user.id,
        ...(gameFilter ? { game: gameFilter } : {}), // conditional filter
      },
      orderBy: { createdAt: "desc" },
    });
  
    reply.send({ matches });
  });
  
}
