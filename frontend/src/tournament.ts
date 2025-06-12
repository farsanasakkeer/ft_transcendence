import { initTournament } from "./tournamentState";

export function setupTournament() {
  document.getElementById("startTournamentBtn")?.addEventListener("click", () => {
    const form = document.getElementById("tournamentForm") as HTMLFormElement;
    const data = new FormData(form);
    const names: string[] = [];

    for (let i = 0; i < 8; i++) {
      const name = data.get(`player${i}`)?.toString().trim();
      if (name) names.push(name);
    }

    if (names.length !== 8) {
      alert("Please enter all 8 player names.");
      return;
    }

    initTournament(names);
    window.route("/tournament/bracket");
  });
}
