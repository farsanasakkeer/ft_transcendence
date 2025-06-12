import { getCurrentLanguage } from "../utils/i18n";

export function dashboardPage(translations: any): string {
  const t = translations.dashboard;
  const currentLang = getCurrentLanguage();

  return `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <!-- Navbar -->
      <nav class="bg-[#0f172a] border-b border-blue-900 py-4 px-6 flex justify-between items-center shadow-xl">
        <div class="flex items-center gap-2">
          <img src="https://42abudhabi.ae/wp-content/themes/42ad/coming-soon/imgs/favicon.ico" alt="42 Logo" class="w-6 h-6 rounded-full" />
          <h1 class="text-2xl font-extrabold text-white">🎮 ${t.title}</h1>
        </div>

        <div class="flex items-center gap-4">
          <!-- Language Dropdown -->
          <div class="relative group">
            <button class="bg-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition border border-gray-700">
              🌐 ${currentLang.toUpperCase()}
            </button>
            <div class="absolute right-0 mt-1 w-40 bg-[#0f172a] rounded-lg shadow-xl hidden group-hover:block z-10 border border-blue-900">
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800 rounded-t-lg transition" data-lang="en">🇺🇸 English</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800 transition" data-lang="pt">🇵🇹 Portuguese</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800 transition" data-lang="fr">🇫🇷 French</button>
              <button class="block w-full px-4 py-2 text-left hover:bg-gray-800 rounded-b-lg transition" data-lang="es">🇪🇸 Spanish</button>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="relative group">
            <button class="bg-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              👤 ${t.profile.title}
            </button>
            <div class="absolute right-0 mt-1 w-40 bg-[#0f172a] rounded-lg shadow-xl hidden group-hover:block z-10 border border-blue-900">
              <a href="#" onclick="event.preventDefault(); window.route('/profile')" class="block w-full px-4 py-2 text-left hover:bg-gray-800 rounded-t-lg transition">${t.profile.profile}</a>
              <button id="logoutBtn" class="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded-b-lg transition">${t.logout}</button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main -->   
      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="w-64 bg-[#0f172a] p-6 shadow-xl border-r border-blue-900">
          <h2 class="text-lg font-bold text-blue-400 mb-6">${t.sidebar.title}</h2>
          <ul class="space-y-4">
            <li>
              <a href="#" onclick="event.preventDefault(); window.route('/dashboard')" 
                 class="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition">
                <span>🏠</span> <span>${t.sidebar.home}</span>
              </a>
            </li>
            <li>
              <a href="#" onclick="event.preventDefault(); window.route('/profile')" 
                 class="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition">
                <span>📝</span> <span>${t.sidebar.profile}</span>
              </a>
            </li>
            <li class="hidden">
              <a href="#" 
                 class="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition">
                <span>⚙️</span> <span>${t.sidebar.settings}</span>
              </a>
            </li>
          </ul>
        </aside>

        <!-- Content -->
        <main class="flex-1 p-8 space-y-10">
          <!-- Welcome Section -->
          <section>
            <h2 class="text-4xl font-extrabold text-white">${t.welcome}</h2>
            <p class="text-blue-400 text-lg font-semibold mt-2">${t.description}</p>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div class="bg-[#0f172a] p-6 rounded-2xl border border-blue-900 shadow-xl text-center hover:shadow-2xl transition">
                <h3 class="text-3xl font-bold text-blue-400" id="totalWins">🏆 0</h3>
                <p class="text-gray-300 mt-2">${t.stats.wins}</p>
              </div>
              <div class="bg-[#0f172a] p-6 rounded-2xl border border-blue-900 shadow-xl text-center hover:shadow-2xl transition hidden">
                <h3 class="text-3xl font-bold text-blue-400" id="activeMatches">🔥 0</h3>
                <p class="text-gray-300 mt-2">${t.stats.active}</p>
              </div>
              <div class="bg-[#0f172a] p-6 rounded-2xl border border-blue-900 shadow-xl text-center hover:shadow-2xl transition">
                <h3 class="text-3xl font-bold text-gray-400" id="totalLosses">💀 0</h3>
                <p class="text-gray-300 mt-2">${t.stats.defeats}</p>
              </div>
            </div>
          </section>

          <!-- Games Section -->
          <section>
            <h3 class="text-2xl font-bold text-white mb-6">${t.games.title}</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Ping Pong Card -->
              <div class="bg-[#0f172a] p-6 rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition group">
                <div class="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4 group-hover:bg-blue-600/30 transition">
                  <span class="text-2xl">🏓</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2">${t.games.pong.title}</h4>
                <p class="text-gray-300 text-sm mb-4">${t.games.pong.desc}</p>
                <button onclick="event.preventDefault(); window.route('/pong')" 
                        class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  ${t.games.pong.cta}
                </button>
              </div>

              <!-- AI Ping Pong Card -->
              <div class="bg-[#0f172a] p-6 rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition group">
                <div class="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4 group-hover:bg-blue-600/30 transition">
                  <span class="text-2xl">🤖</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2">${t.games.pongAi.title}</h4>
                <p class="text-gray-300 text-sm mb-4">${t.games.pongAi.desc}</p>
                <button onclick="event.preventDefault(); window.route('/pong-ai')" 
                        class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition">
                  ${t.games.pongAi.cta}
                </button>
              </div>

              <!-- XO Card -->
              <div class="bg-[#0f172a] p-6 rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition group">
                <div class="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4 group-hover:bg-blue-600/30 transition">
                  <span class="text-2xl">❌</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2">${t.games.xo.title}</h4>
                <p class="text-gray-300 text-sm mb-4">${t.games.xo.desc}</p>
                <button onclick="event.preventDefault(); window.route('/xo')" 
                        class="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition">
                  ${t.games.xo.cta}
                </button>
              </div>

              <!-- Tournament Card -->
              <div class="bg-[#0f172a] p-6 rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition group">
                <div class="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4 group-hover:bg-blue-600/30 transition">
                  <span class="text-2xl">🏆</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2">${t.games.tournament.title}</h4>
                <p class="text-gray-300 text-sm mb-4">${t.games.tournament.desc}</p>
                <button onclick="event.preventDefault(); window.route('/tournament')" 
                        class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  ${t.games.tournament.cta}
                </button>
              </div>
            </div>
          </section>

          <!-- Match History Section -->
          <section>
            <h3 class="text-2xl font-bold text-white mb-6">${t.matchHistory.title}</h3>

            <!-- Filter Tabs -->
            <div class="flex gap-2 mb-6">
              <button data-filter="all" class="filter-tab bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-blue-700">
                ${t.matchHistory.filters.all}
              </button>
              <button data-filter="pong" class="filter-tab bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-gray-600">
                ${t.matchHistory.filters.pong}
              </button>
              <button data-filter="pong-ai" class="filter-tab bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-gray-600">
                ${t.matchHistory.filters.pongAi}
              </button>
              <button data-filter="xo" class="filter-tab bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-gray-600">
                ${t.matchHistory.filters.xo}
              </button>
            </div>

            <!-- Match Cards -->
            <div id="matchHistory" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Match history cards will be dynamically inserted here -->
            </div>
          </section>
        </main>
      </div>
    </div>
  `;
}