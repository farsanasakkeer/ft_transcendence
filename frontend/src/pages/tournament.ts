export function tournamentSetupPage(): string {
    return `
      <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 space-y-6">
        <h1 class="text-3xl font-extrabold text-yellow-400">🏆 Tournament Setup</h1>
        <p class="text-gray-400 mb-4 text-center max-w-md">Enter names of 8 players. Random matchups will be created. Let the battle begin!</p>
  
        <form id="tournamentForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full">
          ${Array.from({ length: 8 }, (_, i) => `
            <input type="text" name="player${i}" placeholder="Player ${i + 1}" required
              class="p-2 rounded bg-gray-800 border border-gray-600 text-white text-center" />
          `).join("")}
        </form>
  
        <button id="startTournamentBtn" class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded transition">
          🎮 Start Tournament
        </button>
  
        <button onclick="window.route('/dashboard')" class="text-sm text-gray-400 hover:text-white underline">← Back to Dashboard</button>
      </div>
    `;
  }
  