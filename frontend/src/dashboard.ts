import axios from "axios";
import { showToast } from "./utils/toast";
import { setCurrentLanguage } from "./utils/i18n";
import { handleRouteChange } from "./route";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function setupDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    showToast("Unauthorized! Please login.", "error");
    window.route("/login");
    return;
  }

  // Try protected request
  axios.get(`${API_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(response => {
      console.log("Protected data:", response.data);
    })
    .catch(() => {
      showToast("Session expired. Please log in again.", "error");
      localStorage.removeItem("token");
      window.route("/login");
    });

  // 🔐 Logout Button
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.route("/login");
  });

  // 🌐 Language Switch Buttons
  document.querySelectorAll("[data-lang]")?.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const lang = (e.target as HTMLElement).getAttribute("data-lang");
      if (lang) {
        setCurrentLanguage(lang);
        handleRouteChange(); // Re-render page with new language
      }
    });
  });

  // 👤 Profile Button (inside dropdown)
  document.getElementById("profileBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.route("/profile");
  });

  axios.get("http://localhost:3000/matches", {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    const container = document.getElementById("matchHistory");
    if (!container) return;
  
    const matches = res.data.matches;

    // Stats
    const totalWins = matches.filter((m: any) => m.result === "win").length;
    const totalLosses = matches.filter((m: any) => m.result === "loss").length;
    const totalDraws = matches.filter((m: any) => m.result === "draw").length;

    document.getElementById("totalWins")!.textContent = totalWins.toString();
    document.getElementById("totalLosses")!.textContent = totalLosses.toString();
    document.getElementById("activeMatches")!.textContent = totalDraws.toString();

    const gameIcons: Record<string, string> = {
      pong: "🏓 Pong",
      "pong-ai": "🤖 Pong AI",
      xo: "❌ X/O"
    };

    function renderMatches(filtered: any[]) {
      const historyHtml = filtered.slice(0, 5).map((match: any) => {
        const game = gameIcons[match.game] || "🎮 Unknown";
        const resultColor =
          match.result === "win" ? "text-green-400" :
          match.result === "loss" ? "text-red-400" : "text-yellow-400";

        return `
          <div class="bg-gray-800 p-4 rounded border border-gray-700 shadow-sm hover:shadow-md transition text-sm">
            <div class="text-blue-300 font-semibold">${game}</div>
            <div class="text-gray-400 text-xs mb-1">${new Date(match.createdAt).toLocaleString()}</div>
            <div class="mb-1">
              🧑‍💻 You: <span class="font-bold text-blue-400">${match.playerScore}</span> vs 
              Guest: <span class="font-bold text-red-400">${match.guestScore}</span>
            </div>
            <div>🏆 Result: <span class="font-semibold ${resultColor}">${match.result}</span></div>
          </div>
        `;
      }).join("");

      document.getElementById("matchHistory")!.innerHTML = historyHtml;
    }

    // Default view: latest 5 of all games
    renderMatches(matches);

    // Filter button listeners
    document.querySelectorAll(".filter-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = (btn as HTMLElement).getAttribute("data-filter");
        const filtered = filter === "all" ? matches : matches.filter((m: any) => m.game === filter);
        renderMatches(filtered);
      });
    });

  });
  
  // Add Tournaments Section
  const tournamentsSection = `
    <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-8">
      <h2 class="text-xl font-semibold mb-4">🏆 Tournaments</h2>
      <p class="text-gray-400 mb-4">Join or create tournaments to compete with others!</p>
      <button id="goToTournaments" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        View Tournaments
      </button>
    </div>
  `;

  const dashboardContainer = document.getElementById("dashboard-container");
  if (dashboardContainer) {
    dashboardContainer.insertAdjacentHTML("beforeend", tournamentsSection);

    // Add event listener to the button
    document.getElementById("goToTournaments")?.addEventListener("click", () => {
      window.route("/tournaments");
    });
  }

}
