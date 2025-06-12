import { getCurrentLanguage } from "../utils/i18n";

export function notFoundPage(translations: any): string {
  const t = translations.notFound;
  const currentLang = getCurrentLanguage();

  return `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col justify-center items-center p-6">
      <h1 class="text-6xl font-extrabold text-red-500 mb-4 animate-pulse">404</h1>
      <h2 class="text-2xl font-bold text-blue-400 mb-2">🕹️ ${t.title}</h2>
      <p class="text-gray-400 max-w-md text-center mb-6">${t.description}</p>
      <a href="/">
        <button id="goBackBtn" class="px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 font-bold transition">
          🔙 ${t.goBack}
        </button>
      </a>
      <div class="mt-8 text-sm text-gray-500 text-center">
        <p>${t.hint}</p>
        <p class="mt-1 italic">"${t.quote}"</p>
      </div>
    </div>
  `;
}
