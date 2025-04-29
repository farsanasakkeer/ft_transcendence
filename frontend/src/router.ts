import { loginPage, registerPage, dashboardPage, pongPage } from "./pages";
import { handleLogin, handleRegister } from "./auth";
import { initGame } from "./pong";

type Route = {
    path: string;
    view: () => string;
};

const routes: Route[] = [
    { path: "/", view: loginPage },
    { path: "/register", view: registerPage },
    { path: "/dashboard", view: dashboardPage },
    { path: "/pong", view: pongPage }
];

export function navigateTo(url: string) {
    history.pushState(null, "", url);
    renderPage();
}

export function renderPage() {
    const app = document.getElementById("app");
    if (!app) return;

    const route = routes.find(r => r.path === window.location.pathname);

    if (route) {
        app.innerHTML = route.view();
        attachEventListeners();
    } else {
        app.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
}

function attachEventListeners() {
    // Link clicks
    document.querySelectorAll("a[href]").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
            if (href) navigateTo(href);
        });
    });

    // Login form submit
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    // Register form submit
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    // Dashboard button click
   // "Play Pong" button in dashboard
    document.getElementById("playPongBtn")?.addEventListener("click", () => {
    navigateTo("/pong");    
    });
    const gameCanvas = document.getElementById("gameCanvas");
    if (gameCanvas) {
        initGame();
    }
      // Logout button
      document.getElementById("logoutBtn")?.addEventListener("click", () => {
        localStorage.removeItem("token");
        navigateTo("/");
    });

}
