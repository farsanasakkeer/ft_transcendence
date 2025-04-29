import { renderPage } from "./router";

window.addEventListener("popstate", renderPage);

document.addEventListener("DOMContentLoaded", () => {
    renderPage();
});