import { loginPage } from "./pages/login";
import { registerPage } from "./pages/register";
import { dashboardPage } from "./pages/dashboard";
import { landingPage } from "./pages/landing";
import { isAuthenticated } from "./utils/auth";
import { showToast } from "./utils/toast";
import { loadLanguage, getCurrentLanguage } from "./utils/i18n";
import { setupLanguageSwitcher } from "./utils/languageSwitcher";
import { profilePage } from "./pages/profile";
import { notFoundPage } from "./pages/notFound";
import { handleGoogleLoginSuccess } from "./googleSuccess";
import { handleGoogle2FAChallenge } from "./google2fa";

type RouteEntry = {
  template: (translations: any) => string;
  scripts?: () => void | Promise<void>;
  requiresAuth?: boolean;
};  

const routes: Record<string, RouteEntry> = {
  "/": {
  template: landingPage,
},
  "/login": { template: loginPage, scripts: async () => (await import("./auth")).handleLogin() },
  "/register": { template: registerPage, scripts: async () => (await import("./auth")).handleRegister() },
  "/dashboard": {
    template: dashboardPage,
    scripts: async () => (await import("./dashboard")).setupDashboard(),
    requiresAuth: true,
  },
  "/profile": {
    template: profilePage,
    scripts: async () => (await import("./profile")).setupProfile(),
    requiresAuth: true,
  },
  "/auth/google/success": {
    template: () => "<div class='text-white p-4'>Authenticating with Google...</div>",
    scripts: async () => {
      handleGoogleLoginSuccess();
    },
  },
  "/auth/google/2fa": {
    template: () => `
      <div class="flex justify-center items-center min-h-screen text-white">
        <div class="bg-gray-900 p-6 rounded-lg shadow max-w-md w-full border border-gray-700 text-center">
          <h2 class="text-xl font-bold mb-4">🔐 Enter 2FA Code</h2>
          <input type="text" id="google2FAToken" placeholder="6-digit code"
            class="w-full p-2 bg-gray-800 border border-gray-600 rounded mb-4 text-center text-white" />
          <button id="verifyGoogle2FA" class="bg-green-600 px-4 py-2 rounded hover:bg-green-700 w-full">Verify</button>
        </div>
      </div>
    `,
    scripts: async () => {
      handleGoogle2FAChallenge();
    },
  },
  "/pong": {
    template: () => `
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
        <div class="w-full max-w-5xl aspect-video bg-[#0f172a] rounded-xl border-4 border-blue-700 shadow-2xl relative overflow-hidden">
          <div class="absolute top-4 left-4 text-lg font-bold text-blue-300">👤 Player</div>
          <div class="absolute top-4 right-4 text-lg font-bold text-red-400">🧑 Guest</div>
          <div class="absolute top-4 left-1/2 transform -translate-x-1/2 text-xl font-extrabold text-white tracking-wider" id="scoreBoard">
            <span id="scorePlayer">0</span> : <span id="scoreGuest">0</span>
          </div>
          <canvas id="pongCanvas" class="absolute inset-0 w-full h-full"></canvas>
          <div id="gameOverlay" class="absolute inset-0 hidden flex flex-col items-center justify-center bg-black/70 text-white text-center z-50">
            <h1 id="gameOverMessage" class="text-4xl font-extrabold text-yellow-400 mb-4 animate-pulse"></h1>
            <div class="space-x-4">
              <button id="replayBtn" class="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition font-semibold">Play Again</button>
              <button id="dashboardBtn" class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition font-semibold">Go to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    `,
    scripts: () => import("./pong/pongGame").then((m) => m.startPongGame()),
  },
  "/404": { template: notFoundPage },
};

export async function handleRouteChange(path?: string, replace = false) {
  if (path) {
    replace
      ? history.replaceState({}, "", path)
      : history.pushState({}, "", path);
  }

  const currentPath = window.location.pathname;
  const route = routes[currentPath] || { template: notFoundPage };

  if (route.requiresAuth && !isAuthenticated()) {
    return window.route("/login");
  } else if ((currentPath === "/login" || currentPath === "/register") && isAuthenticated()) {
    return window.route("/dashboard");
  }
  

  const lang = getCurrentLanguage();
  const translations = await loadLanguage(lang);

  document.title = "GameZone";
  document.getElementById("content")!.innerHTML = route.template(translations);
  await route.scripts?.();
  setupLanguageSwitcher(); // make sure the dropdown works after page render
}

  

export function setupSPA() {
  window.route = (path: string) => handleRouteChange(path);
  window.onpopstate = () => handleRouteChange();
  console.log("SPA setup complete");
}
