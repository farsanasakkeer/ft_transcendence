import { getCurrentLanguage } from "../utils/i18n";

export function dashboardPage(translations: any): string {
  const t = translations.dashboard;
  const currentLang = getCurrentLanguage();

  return `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <!-- Navbar -->
      <nav class="bg-[#0f172a] border-b border-blue-900 py-4 px-6 flex justify-between items-center shadow-xl">
        <div class="flex items-center gap-3">
          <img src="https://42abudhabi.ae/wp-content/themes/42ad/coming-soon/imgs/favicon.ico" alt="42 Logo" class="w-6 h-6 rounded-full" />
          <h1 class="text-2xl font-extrabold text-white">🎮 ${t.title}</h1>
        </div>

        <div class="flex items-center gap-4">
          <!-- Language Dropdown -->
          <div class="relative group">
            <button class="bg-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition border border-gray-700">
              🌐 ${currentLang.toUpperCase()}
            </button>
            <div class="absolute right-0 mt-2 w-40 bg-[#0f172a] rounded-lg shadow-xl hidden group-hover:block z-10 border border-blue-900 overflow-hidden">
              <button class="block w-full px-4 py-2.5 text-left hover:bg-gray-800 transition duration-150" data-lang="en">🇺🇸 English</button>
              <button class="block w-full px-4 py-2.5 text-left hover:bg-gray-800 transition duration-150" data-lang="pt">🇵🇹 Portuguese</button>
              <button class="block w-full px-4 py-2.5 text-left hover:bg-gray-800 transition duration-150" data-lang="fr">🇫🇷 French</button>
              <button class="block w-full px-4 py-2.5 text-left hover:bg-gray-800 transition duration-150" data-lang="es">🇪🇸 Spanish</button>
            </div>
          </div>

          <!-- Profile Dropdown -->
          <div class="relative group">
            <button class="bg-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              👤 ${t.profile.title}
            </button>
            <div class="absolute right-0 mt-2 w-40 bg-[#0f172a] rounded-lg shadow-xl hidden group-hover:block z-10 border border-blue-900 overflow-hidden">
              <a href="#" onclick="event.preventDefault(); window.route('/profile')" class="block w-full px-4 py-2.5 text-left hover:bg-gray-800 transition duration-150">${t.profile.profile}</a>
              <button id="logoutBtn" class="block w-full text-left px-4 py-2.5 hover:bg-gray-800 transition duration-150">${t.logout}</button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main -->   
      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="w-64 bg-[#0f172a] p-6 shadow-xl border-r border-blue-900">
          <h2 class="text-lg font-bold text-blue-400 mb-6 uppercase tracking-wider">${t.sidebar.title}</h2>
          <ul class="space-y-2">
            <li>
              <a href="#" onclick="event.preventDefault(); window.route('/dashboard')" 
                 class="flex items-center gap-3 text-white bg-blue-600/20 border border-blue-600/50 px-4 py-3 rounded-lg transition duration-200">
                <span class="text-xl">🏠</span> 
                <span class="font-medium">${t.sidebar.home}</span>
              </a>
            </li>
            <li>
              <a href="#" onclick="event.preventDefault(); window.route('/profile')" 
                 class="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg transition duration-200">
                <span class="text-xl">📝</span> 
                <span class="font-medium">${t.sidebar.profile}</span>
              </a>
            </li>
            <li class="hidden">
              <a href="#" 
                 class="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg transition duration-200">
                <span class="text-xl">⚙️</span> 
                <span class="font-medium">${t.sidebar.settings}</span>
              </a>
            </li>
          </ul>
        </aside>

        <!-- Content -->
        <main class="flex-1 p-8 space-y-12 overflow-y-auto">
          <!-- Welcome Section -->
          <section>
            <div class="mb-8">
              <h2 class="text-4xl font-extrabold text-white mb-3">${t.welcome}</h2>
              <p class="text-blue-400 text-lg font-medium">${t.description}</p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-[#0f172a] p-8 rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-700 transition-all duration-300 group">
                <div class="text-center space-y-3">
                  <span class="text-5xl block group-hover:scale-110 transition-transform duration-300">🏆</span>
                  <h3 class="text-4xl font-bold text-blue-400" id="totalWins">0</h3>
                  <p class="text-gray-300 font-medium uppercase tracking-wide text-sm">${t.stats.wins}</p>
                </div>
              </div>
              
              <div class="bg-[#0f172a] p-8 rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-700 transition-all duration-300 group hidden">
                <div class="text-center space-y-3">
                  <span class="text-5xl block group-hover:scale-110 transition-transform duration-300">🔥</span>
                  <h3 class="text-4xl font-bold text-orange-400" id="activeMatches">0</h3>
                  <p class="text-gray-300 font-medium uppercase tracking-wide text-sm">${t.stats.active}</p>
                </div>
              </div>
              
              <div class="bg-[#0f172a] p-8 rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-700 transition-all duration-300 group">
                <div class="text-center space-y-3">
                  <span class="text-5xl block group-hover:scale-110 transition-transform duration-300">💀</span>
                  <h3 class="text-4xl font-bold text-gray-400" id="totalLosses">0</h3>
                  <p class="text-gray-300 font-medium uppercase tracking-wide text-sm">${t.stats.defeats}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Games Section -->
          <section>
            <h3 class="text-3xl font-bold text-white mb-8">${t.games.title}</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Ping Pong Card -->
              <div class="bg-[#0f172a] rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group overflow-hidden">
                <div class="relative h-32 bg-gradient-to-br from-blue-600/20 to-blue-900/20 p-4">
                  <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-xs font-semibold">
                      Popular
                    </span>
                  </div>
                  <div class="flex items-center justify-center h-full">
                    <span class="text-6xl group-hover:scale-110 transition-transform duration-300">🏓</span>
                  </div>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">${t.games.pong.title}</h4>
                  <p class="text-gray-400 text-sm mb-4 leading-relaxed">${t.games.pong.desc}</p>
                  <button onclick="event.preventDefault(); window.route('/pong')" 
                          class="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/20">
                    ${t.games.pong.cta}
                  </button>
                </div>
              </div>

              <!-- AI Ping Pong Card -->
              <div class="bg-[#0f172a] rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group overflow-hidden">
                <div class="relative h-32 bg-gradient-to-br from-purple-600/20 to-purple-900/20 p-4">
                  <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs font-semibold">
                      AI Challenge
                    </span>
                  </div>
                  <div class="flex items-center justify-center h-full">
                    <span class="text-6xl group-hover:scale-110 transition-transform duration-300">🤖</span>
                  </div>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">${t.games.pongAi.title}</h4>
                  <p class="text-gray-400 text-sm mb-4 leading-relaxed">${t.games.pongAi.desc}</p>
                  <button onclick="event.preventDefault(); window.route('/pong-ai')" 
                          class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200">
                    ${t.games.pongAi.cta}
                  </button>
                </div>
              </div>

              <!-- XO Card -->
              <div class="bg-[#0f172a] rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group overflow-hidden">
                <div class="relative h-32 bg-gradient-to-br from-green-600/20 to-green-900/20 p-4">
                  <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-green-600/30 text-green-300 rounded-full text-xs font-semibold">
                      Quick Play
                    </span>
                  </div>
                  <div class="flex items-center justify-center h-full">
                    <span class="text-6xl group-hover:scale-110 transition-transform duration-300">❌</span>
                  </div>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">${t.games.xo.title}</h4>
                  <p class="text-gray-400 text-sm mb-4 leading-relaxed">${t.games.xo.desc}</p>
                  <button onclick="event.preventDefault(); window.route('/xo')" 
                          class="w-full bg-gray-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200">
                    ${t.games.xo.cta}
                  </button>
                </div>
              </div>

              <!-- Tournament Card -->
              <div class="bg-[#0f172a] rounded-2xl border border-blue-900 shadow-xl hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group overflow-hidden relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500"></div>
                <div class="relative h-32 bg-gradient-to-br from-yellow-600/20 to-yellow-900/20 p-4">
                  <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 bg-yellow-600/30 text-yellow-300 rounded-full text-xs font-semibold">
                      Championship
                    </span>
                  </div>
                  <div class="flex items-center justify-center h-full">
                    <span class="text-6xl group-hover:scale-110 transition-transform duration-300">🏆</span>
                  </div>
                </div>
                <div class="p-6">
                  <h4 class="text-xl font-bold text-white mb-2">${t.games.tournament.title}</h4>
                  <p class="text-gray-400 text-sm mb-4 leading-relaxed">${t.games.tournament.desc}</p>
                  <button onclick="event.preventDefault(); window.route('/tournament')" 
                          class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-3 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg shadow-yellow-600/20">
                    ${t.games.tournament.cta}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Match History Section -->
          <section>
            <h3 class="text-3xl font-bold text-white mb-8">${t.matchHistory.title}</h3>

            <!-- Filter Tabs -->
            <div class="flex flex-wrap gap-3 mb-8">
              <button data-filter="all" class="filter-tab bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                ${t.matchHistory.filters.all}
              </button>
              <button data-filter="pong" class="filter-tab bg-gray-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-600">
                ${t.matchHistory.filters.pong}
              </button>
              <button data-filter="pong-ai" class="filter-tab bg-gray-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-600">
                ${t.matchHistory.filters.pongAi}
              </button>
              <button data-filter="xo" class="filter-tab bg-gray-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-600">
                ${t.matchHistory.filters.xo}
              </button>
            </div>

            <!-- Match Cards Grid -->
            <div id="matchHistory" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Match history cards will be dynamically inserted here -->
            </div>
          </section>
        </main>
      </div>
    </div>
  `;
}