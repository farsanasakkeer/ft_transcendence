import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Handle Register
document.getElementById("registerForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
        const response = await axios.post(`${API_URL}/register`, { email, password });
        alert(response.data.message);
        window.location.href = "login.html";
    } catch (error) {
        alert("Error: " + error.response.data.error);
    }
});

// Handle Login
document.getElementById("loginForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        window.location.href = "pages/dashboard.html";
    } catch (error) {
        alert("Error: " + error.response.data.error);
    }
});
