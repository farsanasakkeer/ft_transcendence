type LangCode = "en" | "pt" | "fr" | "es";
let currentLang: LangCode = "en";

export async function loadLanguage(lang: LangCode): Promise<any> {
  currentLang = lang;
  const data = await import(`../locales/${lang}.json`);
  return data.default;
}

export function getCurrentLanguage(): LangCode {
  return localStorage.getItem("language") as LangCode || "en";
}

export function setCurrentLanguage(lang: LangCode) {
  localStorage.setItem("language", lang);
}
