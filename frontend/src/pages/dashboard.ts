import { getCurrentLanguage } from "../utils/i18n";
import axios from "axios";

async function fetchTournaments() {
  console.log("check_tow");
  try {
    const response = await axios.get("/api/tournaments");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tournaments:", error);
    throw error;
  }
}

async function renderDashboard() {
  console.log("check_one");
  try {
    const tournaments = await fetchTournaments();
    const tournamentList = document.getElementById("tournament-list");
    if (tournamentList) {
      tournamentList.innerHTML = tournaments
        .map(
          (tournament: any) =>
            `<li>${tournament.name} - Starts on ${new Date(
              tournament.startDate
            ).toLocaleDateString()}</li>`
        )
        .join("");
    }
  } catch (error) {
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorMessage.textContent =
        "Failed to load tournaments. Please try again later.";
    }
  }
}

export function dashboardPage(translations: any): string {
  const t = translations.dashboard;
  const currentLang = getCurrentLanguage();

  return `
    <div class="bg-gray-900 text-white min-h-screen flex flex-col relative">
      <!-- Navbar -->
      <nav class="bg-gradient-to-r from-purple-700 to-blue-600 py-4 px-6 flex justify-between items-center shadow-md relative">
        <h1 class="text-2xl font-extrabold tracking-wide">🎮 ${t.title}</h1>

        <div class="flex items-center gap-4">
          <!-- Language Dropdown -->
          <div class="relative group">
            <button class="bg-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition">
              🌐 ${currentLang.toUpperCase()}
            </button>
            <div class="absolute right-0 mt-1 w-40 bg-gray-900 rounded shadow-lg hidden group-hover:block z-10 border border-gray-700">
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800" data-lang="en">🇺🇸 English</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800" data-lang="pt">🇵🇹 Portuguese</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800" data-lang="fr">🇫🇷 French</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800" data-lang="es">🇪🇸 Spanish</button>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="relative group">
            <button class="bg-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition">
              👤 ${t.profile.title}
            </button>
            <div class="absolute right-0 mt-1 w-40 bg-gray-900 rounded shadow-lg hidden group-hover:block z-10 border border-gray-700">
              <a href="#" onclick="event.preventDefault(); window.route('/profile')" class="block w-full px-4 py-2 text-left hover:bg-gray-800">${
                t.profile.profile
              }</a>
              <button id="logoutBtn" class="block w-full text-left px-4 py-2 hover:bg-gray-800">${
                t.logout
              }</button>
            </div>
          </div>
        </div>
      </nav>

      


      <!-- Main -->
      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-800 p-6 shadow-lg">
          <h2 class="text-lg font-bold text-gray-300 mb-4">${
            t.sidebar.title
          }</h2>
          <ul class="space-y-3">
            <li><a href="#" onclick="event.preventDefault(); window.route('/dashboard')" class="block text-blue-400 hover:text-white transition">🏠 ${
              t.sidebar.home
            }</a></li>
            <li><a href="#" onclick="event.preventDefault(); window.route('/profile')" class="block text-blue-400 hover:text-white transition">📝 ${
              t.sidebar.profile
            }</a></li>
            <li><a href="#" class="block text-blue-400 hover:text-white transition">⚙️ ${
              t.sidebar.settings
            }</a></li>
          </ul>
        </aside>

        <!-- Content -->
        <main class="flex-1 p-8 space-y-10">
          <section>
            <h2 class="text-3xl font-bold text-blue-400">${t.welcome}</h2>
            <p class="text-gray-400 mt-2">${t.description}</p>

            <div class="grid grid-cols-3 gap-6 mt-6">
              <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-blue-500">
                <h3 class="text-3xl font-bold text-blue-400" id="totalWins">🏆 0</h3>
                <p class="text-gray-400">${t.stats.wins}</p>
              </div>
              <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-green-500">
                <h3 class="text-3xl font-bold text-green-400" id="activeMatches">🔥 0</h3>
                <p class="text-gray-400">${t.stats.active}</p>
              </div>
              <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-red-500">
                <h3 class="text-3xl font-bold text-red-400" id="totalLosses">💀 0</h3>
                <p class="text-gray-400">${t.stats.defeats}</p>
              </div>
            </div>
          </section>

          <section class="mt-10">
            <h3 class="text-2xl font-bold text-gray-300 mb-4">🎮 Games</h3>

            <div class="flex overflow-x-auto gap-4 pb-2 pr-2 pt-2 pl-2 scroll-smooth custom-scroll">
              <!-- Ping Pong Card -->
              <div class="min-w-[250px] flex-shrink-0 bg-gray-800 p-6 rounded-lg border border-blue-600 shadow-md hover:scale-105 transition transform duration-200 cursor-pointer">
                <h4 class="text-xl font-bold text-white">🏓 Ping Pong</h4>
                <p class="text-gray-400 mt-2">Play locally with a friend. First to 5 wins!</p>
                <button onclick="event.preventDefault(); window.route('/pong')" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">▶️ Play Now</button>
              </div>

              <!-- AI Ping Pong Card -->
              <div class="min-w-[250px] flex-shrink-0 bg-gray-800 p-6 rounded-lg border border-green-600 shadow-md hover:scale-105 transition transform duration-200 cursor-pointer">
                <h4 class="text-xl font-bold text-white">🤖 AI Ping Pong</h4>
                <p class="text-gray-400 mt-2">Play locally with AI. First to 5 wins!</p>
                <button onclick="event.preventDefault(); window.route('/pong-ai')" class="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">▶️ Play Now</button>
              </div>

              <!-- XO Card -->
              <div class="min-w-[250px] flex-shrink-0 bg-gray-800 p-6 rounded-lg border border-purple-600 shadow-md hover:scale-105 transition transform duration-200 cursor-pointer">
                <h4 class="text-xl font-bold text-white">❌ Tic-Tac-Toe</h4>
                <p class="text-gray-400 mt-2">X vs O! Local multiplayer — classic fun!</p>
                <button onclick="event.preventDefault(); window.route('/xo')" class="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">▶️ Play Now</button>
              </div>
              <div id="dashboard-container" class="space-y-8">
                <!-- Other dashboard content -->
              </div>

              <!-- Add more cards in future here -->
            </div>
          </section>



          <!-- Match History Section -->
          <section class="mt-10">
            <h3 class="text-2xl font-bold text-gray-300 mb-4">📜 Match History</h3>

            <!-- Filter Tabs -->
            <div class="flex gap-2 mb-4">
              <button data-filter="all" class="filter-tab bg-blue-600 text-white px-3 py-1 rounded">All</button>
              <button data-filter="pong" class="filter-tab bg-gray-700 text-white px-3 py-1 rounded">🏓 Pong</button>
              <button data-filter="pong-ai" class="filter-tab bg-gray-700 text-white px-3 py-1 rounded">🤖 Pong AI</button>
              <button data-filter="xo" class="filter-tab bg-gray-700 text-white px-3 py-1 rounded">❌ X/O</button>
            </div>

            <!-- Match Cards -->
            <div id="matchHistory" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
          </section>


          <section>
            <h3 class="text-2xl font-bold text-gray-300">${t.recent.title}</h3>
            <ul class="mt-4 space-y-3">
              <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">✅ ${
                t.recent.activity1
              }</li>
              <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">🏅 ${
                t.recent.activity2
              }</li>
              <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">💬 ${
                t.recent.activity3
              }</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  `;
}

renderDashboard();
