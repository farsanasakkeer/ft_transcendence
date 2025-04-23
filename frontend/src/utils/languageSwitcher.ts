import { getCurrentLanguage, setCurrentLanguage, loadLanguage } from "./i18n";
import { handleRouteChange } from "../route";

export function setupLanguageSwitcher(): void {
  const select = document.getElementById("langSelect") as HTMLSelectElement | null;
  if (!select) return;

  const currentLang = getCurrentLanguage();
  if (select.value !== currentLang) {
    select.value = currentLang;
  }

  select.addEventListener("change", async (e) => {
    const lang = (e.target as HTMLSelectElement).value;
    setCurrentLanguage(lang);
    await handleRouteChange(); // reload current route with new language (SPA style)
  });
}
