import { getCurrentLanguage } from "../utils/i18n";

export function dashboardPage(translations: any): string {
  const t = translations.dashboard;
  const currentLang = getCurrentLanguage();

  return `
    <div class="bg-gray-900 text-white h-screen flex flex-col relative">

      <!-- Navbar -->
      <nav class="bg-gradient-to-r from-purple-700 to-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md relative">
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
              <a href="#" onclick="event.preventDefault(); window.route('/profile')" class="block w-full px-4 py-2 text-left hover:bg-gray-800">${t.profile.profile}</a>
              <button id="logoutBtn" class="block w-full text-left px-4 py-2 hover:bg-gray-800">${t.logout}</button>
            </div>
          </div>
        </div>
      </nav>


      <!-- Main Content -->
      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-800 p-6 shadow-lg">
          <h2 class="text-lg font-bold text-gray-300 mb-4">${t.sidebar.title}</h2>
          <ul class="space-y-3">
            <li><a href="/" onclick="event.preventDefault(); window.route('/dashboard')" class="block text-blue-400 hover:text-white transition">🏠 ${t.sidebar.home}</a></li>
            <li><a href="#" onclick="event.preventDefault(); window.route('/profile')" class="block text-blue-400 hover:text-white transition">📝 ${t.sidebar.profile}</a></li>
            <li><a href="#" class="block text-blue-400 hover:text-white transition">⚙️ ${t.sidebar.settings}</a></li>
          </ul>
        </aside>

        <!-- Dashboard Content -->
        <main class="flex-1 p-8">
          <div class="mt-10">
            <h3 class="text-2xl font-bold text-gray-300 mb-4">🎮 Games</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-800 p-6 rounded-lg border border-blue-600 hover:scale-105 transition cursor-pointer" onclick="event.preventDefault(); window.route('/pong')">
                <h4 class="text-xl font-bold text-white">🏓 Ping Pong Classic</h4>
                <p class="text-gray-400 mt-2">Play locally with a friend. First to 5 wins!</p>
              </div>
            </div>
          </div>


          <div class="mt-10">
            <h3 class="text-2xl font-bold text-gray-300 mb-4">📜 Match History</h3>
            <div id="matchHistory" class="grid gap-4"></div>
          </div>


          <h2 class="text-3xl font-bold text-blue-400">${t.welcome}</h2>
          <p class="text-gray-400 mt-2">${t.description}</p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 mt-6">
            <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-blue-500">
              <h3 class="text-3xl font-bold text-blue-400">🏆 25</h3>
              <p class="text-gray-400">${t.stats.wins}</p>
            </div>
            <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-green-500">
              <h3 class="text-3xl font-bold text-green-400">🔥 12</h3>
              <p class="text-gray-400">${t.stats.active}</p>
            </div>
            <div class="bg-gray-800 shadow-lg p-6 rounded-lg text-center border border-red-500">
              <h3 class="text-3xl font-bold text-red-400">💀 8</h3>
              <p class="text-gray-400">${t.stats.defeats}</p>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="mt-8">
            <h3 class="text-2xl font-bold text-gray-300">${t.recent.title}</h3>
            <ul class="mt-4 space-y-3">
              <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">✅ ${t.recent.activity1}</li>
              <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">🏅 ${t.recent.activity2}</li>
              <li class="bg-gray-800 shadow-md p-4 rounded-lg border border-gray-700">💬 ${t.recent.activity3}</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  `;
}
