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
  
    const historyHtml = res.data.matches.map((match: any) => `
      <div class="bg-gray-800 p-3 rounded border border-gray-700 text-sm">
        <div>🎮 Pong | ${new Date(match.createdAt).toLocaleString()}</div>
        <div>🧑‍💻 You: <span class="font-bold text-blue-400">${match.playerScore}</span> vs 
             Guest: <span class="font-bold text-red-400">${match.guestScore}</span></div>
        <div>🏆 Result: <span class="font-semibold ${match.result === 'win' ? 'text-green-400' : 'text-red-400'}">${match.result}</span></div>
      </div>
    `).join("");
  
    container.innerHTML = historyHtml;
  });  
}
