import axios from "axios";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; 

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("clickMe");
    if (button) {
        button.addEventListener("click", () => {
            alert("Button Clicked!");
        });
    }
});

const register = async () => {
    const response = await axios.post(`${API_URL}/register`, {
        email: "test@example.com",
        password: "password123",
    });
    console.log(response.data);
};

const login = async () => {
    const response = await axios.post(`${API_URL}/login`, {
        email: "test@example.com",
        password: "password123",
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    console.log("Logged in, token:", token);
};

const getProtectedData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found, please log in.");
        return;
    }

    const response = await axios.get(`${API_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
};

// Attach to buttons
document.getElementById("registerBtn")?.addEventListener("click", register);
document.getElementById("loginBtn")?.addEventListener("click", login);
document.getElementById("protectedBtn")?.addEventListener("click", getProtectedData);
