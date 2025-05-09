/*
  Warnings:

  - You are about to drop the `TournamentParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `player1Id` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `player2Id` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `round` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `winnerId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `organizerId` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TournamentParticipant_tournamentId_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TournamentParticipant";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TournamentMatch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tournamentId" INTEGER NOT NULL,
    "player1Id" INTEGER NOT NULL,
    "player2Id" INTEGER NOT NULL,
    "player1Score" INTEGER NOT NULL DEFAULT 0,
    "player2Score" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "round" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TournamentMatch_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TournamentMatch_player1Id_fkey" FOREIGN KEY ("player1Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TournamentMatch_player2Id_fkey" FOREIGN KEY ("player2Id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TournamentToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TournamentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TournamentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerScore" INTEGER NOT NULL,
    "guestScore" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "game" TEXT NOT NULL DEFAULT 'pong',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("createdAt", "game", "guestScore", "id", "playerScore", "result", "userId") SELECT "createdAt", "game", "guestScore", "id", "playerScore", "result", "userId" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE TABLE "new_Tournament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tournament" ("createdAt", "id", "name", "status", "updatedAt") SELECT "createdAt", "id", "name", "status", "updatedAt" FROM "Tournament";
DROP TABLE "Tournament";
ALTER TABLE "new_Tournament" RENAME TO "Tournament";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentToUser_AB_unique" ON "_TournamentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentToUser_B_index" ON "_TournamentToUser"("B");
