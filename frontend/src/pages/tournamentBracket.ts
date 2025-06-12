import { tournamentState } from "../tournamentState";

export function tournamentBracketPage(): string {
  const round = tournamentState.rounds[tournamentState.currentRoundIndex];
  const roundLabel = ["Quarter Finals", "Semi Finals", "Final"][tournamentState.currentRoundIndex] || "Tournament";

  return `
    <div class="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6 space-y-8 flex flex-col items-center">
      <h1 class="text-4xl font-extrabold text-yellow-400 drop-shadow-lg">🏆 ${roundLabel}</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl w-full">
        ${round.matches.map((match, index) => `
          <div class="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-600 shadow-xl transform hover:scale-105 transition duration-300">
            <h2 class="text-xl font-bold mb-3 text-yellow-300">⚔️ Match ${index + 1}</h2>

            <div class="flex flex-col gap-2 text-lg">
              <div class="flex justify-between items-center bg-gray-700 px-4 py-2 rounded">
                <span class="text-blue-400 font-semibold">🟦 ${match.player1.name}</span>
                <span class="text-gray-500 text-sm">vs</span>
                <span class="text-red-400 font-semibold">🟥 ${match.player2.name}</span>
              </div>
            </div>

            <div class="mt-4">
              ${match.winner
                ? `<p class="text-green-400 font-extrabold text-center text-lg animate-pulse">🏆 Winner: ${match.winner.name}</p>`
                : `<button class="playMatchBtn bg-yellow-500 text-black font-semibold px-4 py-2 rounded mt-2 w-full hover:bg-yellow-600 transition">
                     🎮 Play Match
                   </button>`
              }
            </div>
          </div>
        `).join("")}
      </div>

      <button onclick="window.route('/dashboard')" class="text-sm text-gray-300 hover:text-white underline mt-6">← Back to Dashboard</button>
    </div>
  `;
}
