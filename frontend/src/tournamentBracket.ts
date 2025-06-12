import { tournamentState } from "./tournamentState";

export function setupTournamentBracket() {
  document.querySelectorAll(".playMatchBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt((btn as HTMLElement).getAttribute("data-match") || "0");
      const match = tournamentState.rounds[tournamentState.currentRoundIndex].matches[index];

      const p1 = encodeURIComponent(match.player1.name);
      const p2 = encodeURIComponent(match.player2.name);

      // 🔁 Navigate to game screen with player names in query string
      window.route(`/tournament/game?p1=${p1}&p2=${p2}`);
    });
  });
}
