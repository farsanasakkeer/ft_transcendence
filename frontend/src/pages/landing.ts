import { getCurrentLanguage } from "../utils/i18n";

export function landingPage(translations: any): string {
  const t = translations.landing;
  const currentLang = getCurrentLanguage();

  return `
    <div class="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 to-black text-white relative">
      <!-- Language Selector -->
      <select id="langSelect" class="absolute top-4 right-4 bg-gray-800 text-white px-2 py-1 rounded">
        <option value="en" ${currentLang === "en" ? "selected" : ""}>🇺🇸 English</option>
        <option value="pt" ${currentLang === "pt" ? "selected" : ""}>🇵🇹 Portuguese</option>
        <option value="fr" ${currentLang === "fr" ? "selected" : ""}>🇫🇷 French</option>
        <option value="es" ${currentLang === "es" ? "selected" : ""}>🇪🇸 Spanish</option>
      </select>

      <!-- Header -->
      <h1 class="text-5xl font-extrabold text-blue-400 mb-4 drop-shadow-lg">${t.title}</h1>

      <!-- Buttons -->
      <div class="space-x-6">
        <button onclick="event.preventDefault(); window.route('/register')"
          class="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition duration-300 transform">
          ${t.registerBtn}
        </button>
        <button onclick="event.preventDefault(); window.route('/login')"
          class="px-6 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 hover:scale-105 transition duration-300 transform">
          ${t.loginBtn}
        </button>
      </div>

      <!-- Animated Glow Effect -->
      <div class="absolute bottom-10 text-gray-500 text-sm animate-pulse">
        <p>${t.subtitle}</p>
      </div>
    </div>
  `;
}
