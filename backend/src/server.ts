import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";

dotenv.config();

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Register CORS Middleware
fastify.register(cors, {
    origin: "http://localhost:5173", // Allow frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true // Allow cookies or auth headers
});

fastify.register(require("@fastify/formbody"));

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

interface AuthenticatedRequest extends FastifyRequest {
    user?: any;
}

// Middleware to protect routes
const authenticate = async (request: AuthenticatedRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Error("No token provided");

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        request.user = decoded;
    } catch (err) {
        reply.status(401).send({ error: "Unauthorized" });
    }
};

// Protected Dashboard Route
fastify.get("/dashboard", { preHandler: authenticate }, async (request: AuthenticatedRequest, reply: FastifyReply) => {
    reply.send({ message: "Welcome to your dashboard!", user: request.user });
});

// Register a new user and save in SQLite
fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string };

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return reply.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { email, password: hashedPassword },
    });

    reply.send({ message: "User registered", user: newUser });
});

// Login user
fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string };

    // Find user in DB
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return reply.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    reply.send({ token });
});

// Protected route
fastify.get("/protected", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new Error("No token provided");

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        reply.send({ message: "Protected data", user: decoded });
    } catch (err) {
        reply.status(401).send({ error: "Unauthorized" });
    }
});

// Start the Fastify server
fastify.listen({ port: 3000, host: "0.0.0.0" }, () => console.log("Server running on port 3000"));
