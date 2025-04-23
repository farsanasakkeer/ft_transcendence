import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

export async function matchRoutes(fastify: FastifyInstance) {
  // Save a new match
  fastify.post("/matches", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
    const { playerScore, guestScore } = req.body as {
      playerScore: number;
      guestScore: number;
    };

    const result = playerScore > guestScore ? "win" : "loss";

    const match = await prisma.match.create({
      data: {
        userId: req.user.id,
        playerScore,
        guestScore,
        result,
      },
    });

    return reply.send({ match });
  });

  // Get match history for logged-in user
  fastify.get("/matches", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
    const matches = await prisma.match.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return reply.send({ matches });
  });
}
