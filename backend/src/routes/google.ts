import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { OAuth2Namespace } from "@fastify/oauth2";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export async function googleAuthRoutes(fastify: FastifyInstance) {
    const typedFastify = fastify as FastifyInstance & { googleOAuth2: OAuth2Namespace }; // 👈 ADD THIS
  
    typedFastify.get("/auth/google/callback", async (req, reply) => {
      const token = await typedFastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
  
      const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${token.token.access_token}`,
        },
      });
  
      const userInfo = await userInfoRes.json();
  
      let user = await prisma.user.findUnique({ where: { email: userInfo.email } });
  
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: userInfo.email,
            password: "",
          },
        });
      }

      if (user.twoFA) {
        // Don’t send token yet. Send a redirect that triggers 2FA challenge
        return reply.redirect(`http://localhost:5173/auth/google/2fa?email=${user.email}`);
      }
      
  
      const jwtToken = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  
      reply.redirect(`http://localhost:5173/auth/google/success?token=${jwtToken}`);
    });
  }
  