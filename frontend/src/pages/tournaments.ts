import { getCurrentLanguage } from "../utils/i18n";

export function setupTournamentsPage(translations: any): string {
  const t = translations.landing;
  const currentLang = getCurrentLanguage();

  return `
      <div class="min-h-screen bg-gray-900 text-white p-4">
        <div class="max-w-4xl mx-auto">
          <div id="tournaments-container"></div>
        </div>
      </div>
    `;
}
