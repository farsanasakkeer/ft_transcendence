import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export interface AuthenticatedRequest extends FastifyRequest {
  user?: any;
}

export const authenticate = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new Error("No token");

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    request.user = decoded;
  } catch {
    reply.status(401).send({ error: "Unauthorized" });
  }
};
