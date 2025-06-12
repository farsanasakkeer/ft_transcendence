import { getCurrentLanguage } from "../utils/i18n";

export function profilePage(translations: any): string {
  const t = translations.profile;
  const currentLang = getCurrentLanguage();

  return `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 flex flex-col items-center">

      <!-- Header Section -->
      <div class="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 class="text-4xl font-extrabold text-blue-400">👤 ${t.title}</h1>

        <!-- Language Switcher -->
        <select id="langSelect" class="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md shadow">
          <option value="en" ${currentLang === "en" ? "selected" : ""}>🇺🇸 English</option>
          <option value="pt" ${currentLang === "pt" ? "selected" : ""}>🇵🇹 Portuguese</option>
          <option value="fr" ${currentLang === "fr" ? "selected" : ""}>🇫🇷 French</option>
          <option value="es" ${currentLang === "es" ? "selected" : ""}>🇪🇸 Spanish</option>
        </select>
      </div>

      <!-- Profile Card -->
      <div class="bg-gray-800 border border-blue-500 rounded-xl shadow-lg p-6 w-full max-w-2xl space-y-6">
        <h2 class="text-2xl font-bold text-white mb-2">${t.security.heading}</h2>
        <p class="text-gray-400">${t.security.description}</p>

        <!-- 2FA Toggle -->
        <div class="flex items-center">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" id="toggle2FA" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-500 transition-all relative">
              <div class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
            </div>
            <span class="ml-4 text-gray-300 font-medium">${t.security.toggleLabel}</span>
          </label>
        </div>
      </div>

      <!-- Back Button -->
      <button onclick="window.route('/dashboard')" class="mt-10 text-sm text-gray-300 hover:text-white underline">
        ← Back to Dashboard
      </button>

    </div>
  `;
}
