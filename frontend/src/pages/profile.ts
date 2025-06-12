import { getCurrentLanguage } from "../utils/i18n";

export function profilePage(translations: any): string {
  const t = translations.profile;
  const currentLang = getCurrentLanguage();

  return `
    <div class="min-h-screen bg-gray-900 text-white p-8">
      <!-- Navbar Section -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-blue-400">👤 ${t.title}</h1>

        <!-- Language Switcher -->
        <select id="langSelect" class="bg-gray-800 text-white px-2 py-1 rounded">
          <option value="en" ${currentLang === "en" ? "selected" : ""}>🇺🇸 English</option>
          <option value="pt" ${currentLang === "pt" ? "selected" : ""}>🇵🇹 Portuguese</option>
          <option value="fr" ${currentLang === "fr" ? "selected" : ""}>🇫🇷 French</option>
          <option value="es" ${currentLang === "es" ? "selected" : ""}>🇪🇸 Spanish</option>
        </select>
      </div>

      <!-- 2FA Toggle Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 max-w-lg mx-auto">
        <h2 class="text-xl font-bold text-white mb-4">${t.security.heading}</h2>

        <p class="text-gray-400 mb-6">${t.security.description}</p>

        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" id="toggle2FA" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition-all relative">
            <div class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
          </div>
          <span class="ml-3 text-gray-300">${t.security.toggleLabel}</span>
        </label>
      </div>
    </div>
  `;
}
