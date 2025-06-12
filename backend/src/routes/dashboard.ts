import { FastifyInstance } from "fastify";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function dashboardRoutes(fastify: FastifyInstance) {
    fastify.get("/dashboard", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
      reply.send({ message: "Welcome to your dashboard!", user: req.user });
    });
  
    fastify.get("/protected", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
      reply.send({ message: "Protected data", user: req.user });
    });

    fastify.get("/me", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
      const user = await prisma.user.findUnique({
        where: { email: req.user.email },
        select: {
          email: true,
          twoFA: true,
        },
      });
    
      reply.send({ user });
    });
    
  }
  