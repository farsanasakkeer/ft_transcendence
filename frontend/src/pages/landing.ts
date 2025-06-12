import { getCurrentLanguage } from "../utils/i18n";

export function landingPage(translations: any): string {
  const t = translations.landing;
  const currentLang = getCurrentLanguage();

  return `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white px-4">
      <div class="bg-[#0f172a] rounded-2xl shadow-xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden border border-blue-900">

        <!-- Left Content -->
        <div class="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-6">
          <div class="flex items-center gap-2 text-sm text-blue-300">
            <img src="https://42abudhabi.ae/wp-content/themes/42ad/coming-soon/imgs/favicon.ico" alt="42 Logo" class="w-5 h-5 rounded-full" />
            <span>42 ft_transcendence</span>
          </div>

          <h1 class="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to Play?
          </h1>
          <p class="text-blue-400 text-lg font-semibold">Challenge friends. Rise in ranks. Transcend the game.</p>
          <p class="text-gray-300 text-md leading-relaxed">
            Dive into a competitive arena built by 42 minds. Ping Pong, AI duels, tournaments — all in one game zone. Login to compete or register to begin your journey.
          </p>

          <div class="flex gap-4">
            <button onclick="event.preventDefault(); window.route('/register')" class="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition">
              ${t.registerBtn}
            </button>
            <button onclick="event.preventDefault(); window.route('/login')" class="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow hover:bg-gray-600 transition">
              ${t.loginBtn}
            </button>
          </div>
        </div>

        <!-- Right Visual -->
        <div class="flex-1 hidden md:flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
          <div class="relative w-48 h-48">
            <div class="absolute w-48 h-48 bg-gradient-to-br from-blue-500 to-green-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
            <svg class="relative w-48 h-48 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="4" />
              <line x1="4" y1="12" x2="20" y2="12" stroke-width="2" />
              <line x1="6" y1="8" x2="18" y2="8" stroke-width="2" />
              <line x1="6" y1="16" x2="18" y2="16" stroke-width="2" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Language Selector -->
      <div class="absolute top-4 right-4">
        <select id="langSelect" class="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700">
          <option value="en" ${currentLang === "en" ? "selected" : ""}>🇺🇸 English</option>
          <option value="pt" ${currentLang === "pt" ? "selected" : ""}>🇵🇹 Portuguese</option>
          <option value="fr" ${currentLang === "fr" ? "selected" : ""}>🇫🇷 French</option>
          <option value="es" ${currentLang === "es" ? "selected" : ""}>🇪🇸 Spanish</option>
        </select>
      </div>

      <!-- Footer Caption -->
      <div class="absolute bottom-4 text-sm text-gray-500 text-center w-full animate-pulse">
        Transcend your limits. Enter the arena. Built by coders, for coders.
      </div>
    </div>
  `;
}
