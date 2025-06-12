import { FastifyInstance } from "fastify";
import { authenticator } from "otplib";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return reply.status(400).send({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed } });
    reply.send({ message: "User registered", user });
  });

  fastify.post("/login", async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };
  
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }
  
    if (user.twoFA) {
      return reply.send({ twoFARequired: true });
    }
  
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    reply.send({ token });
  });
  

  fastify.post("/2fa/login", async (req, reply) => {
    const { email, token } = req.body as { email: string; token: string };
  
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.secret) {
      return reply.status(400).send({ error: "2FA not configured" });
    }
  
    const isValid = authenticator.verify({ token, secret: user.secret });
  
    if (!isValid) {
      return reply.status(401).send({ error: "Invalid 2FA token" });
    }
  
    const jwtToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    reply.send({ token: jwtToken });
  });
  
}
