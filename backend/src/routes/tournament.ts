import { FastifyInstance } from "fastify";
import {
  createTournament,
  getTournaments,
  getTournament,
  joinTournament,
  createTournamentMatch,
  updateMatchResult,
} from "../controllers/tournament";
import { authenticate } from "../middlewares/auth";

export default async function tournamentRoutes(fastify: FastifyInstance) {
  // Create a new tournament
  fastify.post("/tournaments", {
    preHandler: authenticate,
    handler: async (request, reply) => {
      try {
        const { name, startDate } = request.body as {
          name: string;
          startDate: string;
        };
        if (!name || !startDate) {
          return reply
            .status(400)
            .send({ error: "Name and startDate are required" });
        }
        const tournament = await createTournament(name, new Date(startDate));
        reply.send(tournament);
      } catch (error) {
        reply
          .status(500)
          .send({
            error: "Failed to create tournament",
            details: error.message,
          });
      }
    },
  });

  // Get all tournaments
  fastify.get("/tournaments", {
    handler: async (request, reply) => {
      try {
        const tournaments = await getTournaments();
        reply.send(tournaments);
      } catch (error) {
        reply
          .status(500)
          .send({
            error: "Failed to fetch tournaments",
            details: error.message,
          });
      }
    },
  });

  // Get a specific tournament
  fastify.get("/tournaments/:id", {
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const tournament = await getTournament(parseInt(id));
        if (!tournament) {
          return reply.status(404).send({ error: "Tournament not found" });
        }
        reply.send(tournament);
      } catch (error) {
        reply
          .status(500)
          .send({
            error: "Failed to fetch tournament",
            details: error.message,
          });
      }
    },
  });

  // Join a tournament
  fastify.post("/tournaments/:id/join", {
    preHandler: authenticate,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const userId = (request.user as any).id;
        const tournament = await joinTournament(parseInt(id), userId);
        reply.send(tournament);
      } catch (error) {
        reply
          .status(500)
          .send({ error: "Failed to join tournament", details: error.message });
      }
    },
  });

  // Create a tournament match
  fastify.post("/tournaments/:id/matches", {
    preHandler: authenticate,
    handler: async (request, reply) => {
      try {
        const { id } = request.params as { id: string };
        const { player1Id, player2Id, round } = request.body as {
          player1Id: number;
          player2Id: number;
          round: number;
        };
        const match = await createTournamentMatch(
          parseInt(id),
          player1Id,
          player2Id,
          round
        );
        reply.send(match);
      } catch (error) {
        reply
          .status(500)
          .send({ error: "Failed to create match", details: error.message });
      }
    },
  });

  // Update match result
  fastify.put("/tournaments/:tournamentId/matches/:id", {
    preHandler: authenticate,
    handler: async (request, reply) => {
      const { tournamentId, id } = request.params as {
        tournamentId: string;
        id: string;
      };
      const { player1Score, player2Score } = request.body as {
        player1Score: number;
        player2Score: number;
      };
      const match = await updateMatchResult(
        parseInt(id),
        player1Score,
        player2Score
      );
      reply.send(match);
    },
  });
}
