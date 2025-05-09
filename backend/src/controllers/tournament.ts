import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTournament = async (name: string, startDate: Date) => {
  return prisma.tournament.create({
    data: {
      name,
      startDate,
    },
  });
};

export const getTournaments = async () => {
  return prisma.tournament.findMany({
    include: {
      participants: true,
      matches: {
        include: {
          player1: true,
          player2: true,
        },
      },
    },
  });
};

export const getTournament = async (id: number) => {
  return prisma.tournament.findUnique({
    where: { id },
    include: {
      participants: true,
      matches: {
        include: {
          player1: true,
          player2: true,
        },
      },
    },
  });
};

export const joinTournament = async (tournamentId: number, userId: number) => {
  return prisma.tournament.update({
    where: { id: tournamentId },
    data: {
      participants: {
        connect: { id: userId },
      },
    },
  });
};

export const createTournamentMatch = async (
  tournamentId: number,
  player1Id: number,
  player2Id: number,
  round: number
) => {
  return prisma.tournamentMatch.create({
    data: {
      tournamentId,
      player1Id,
      player2Id,
      round,
    },
  });
};

export const updateMatchResult = async (
  matchId: number,
  player1Score: number,
  player2Score: number
) => {
  return prisma.tournamentMatch.update({
    where: { id: matchId },
    data: {
      player1Score,
      player2Score,
      status: 'completed',
    },
  });
}; 