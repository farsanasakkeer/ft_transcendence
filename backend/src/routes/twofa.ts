import { FastifyInstance } from "fastify";
import { authenticator } from "otplib";
import qrcode from "qrcode";
import { PrismaClient } from "@prisma/client";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

export async function twofaRoutes(fastify: FastifyInstance) {
  // GET /2fa/setup - generates secret + QR code
  fastify.get("/2fa/setup", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
    const email = req.user.email;

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, "GameZone", secret);
    const qrCodeDataURL = await qrcode.toDataURL(otpauth);

    // Store secret temporarily
    await prisma.user.update({
      where: { email },
      data: { secret },
    });

    return reply.send({ qrCodeDataURL });
  });

  // POST /2fa/verify - verifies code and enables 2FA
  fastify.post("/2fa/verify", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
    const { token } = req.body as { token: string };
    const email = req.user.email;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.secret) {
      return reply.status(400).send({ error: "No 2FA secret found" });
    }

    const isValid = authenticator.verify({ token, secret: user.secret });

    if (!isValid) {
      return reply.status(401).send({ error: "Invalid token" });
    }

    await prisma.user.update({
      where: { email },
      data: { twoFA: true },
    });

    return reply.send({ message: "2FA successfully enabled" });
  });

  // Optional: disable 2FA
  fastify.post("/2fa/disable", { preHandler: authenticate }, async (req: AuthenticatedRequest, reply) => {
    const email = req.user.email;

    await prisma.user.update({
      where: { email },
      data: { twoFA: false, secret: null },
    });

    return reply.send({ message: "2FA disabled" });
  });
}
