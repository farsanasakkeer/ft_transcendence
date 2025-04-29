import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Check Authentication
const token = localStorage.getItem("token");
if (!token) {
    alert("Unauthorized! Please login.");
    // window.location.href = "login.html";
    navigateTo("/login");
}

// Fetch Protected Data
axios.get(`${API_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
})
    .then(response => console.log(response.data))
    .catch(() => {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        // window.location.href = "login.html";
        navigateTo("/login");
    });

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    // window.location.href = "login.html";
    navigateTo("/login");
});
