import axios from "axios";
import { navigateTo } from "./router";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Handle Register
export async function handleRegister(event: Event) {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
        const response = await axios.post(`${API_URL}/register`, { email, password });
        alert(response.data.message);
        navigateTo("/"); // go back to login page after successful register
    } catch (error) {
        alert("Error: " + (error as any).response.data.error);
    }
}

// Handle Login
export async function handleLogin(event: Event) {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigateTo("/dashboard");
    } catch (error) {
        alert("Error: " + (error as any).response.data.error);
    }
}
