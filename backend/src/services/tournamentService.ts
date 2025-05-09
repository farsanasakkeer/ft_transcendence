// src/services/tournamentService.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createTournament(name: string, participantIds: number[], organizerId: number) {
  const tournament = await prisma.tournament.create({
    data: {
      name,
      organizerId,
      participants: {
        create: participantIds.map(userId => ({
          userId,
        })),
      },
    },
  })

  // Randomly shuffle participants
  const shuffled = [...participantIds].sort(() => Math.random() - 0.5)

  // Generate initial matches (Round 1)
  const matches = []
  for (let i = 0; i < shuffled.length; i += 2) {
    const player1Id = shuffled[i]
    const player2Id = shuffled[i + 1] ?? null // Bye if odd

    matches.push({
      player1Id,
      player2Id,
      tournamentId: tournament.id,
      round: 1,
    })
  }

  await prisma.match.createMany({ data: matches })

  return tournament
}
