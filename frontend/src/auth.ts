import axios from "axios";
import { showToast } from "./utils/toast";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function handleLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      if (res.data.twoFARequired) {
        show2FALoginModal(email); // ask for token
        return;
      }

      localStorage.setItem("token", res.data.token);
      showToast("Login successful!", "success");
      window.route("/dashboard");
    } catch (err: any) {
      showToast(err.response?.data?.error || "Login failed", "error");
    }
  });
}

function show2FALoginModal(email: string) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
      <h2 class="text-xl font-bold mb-4">🔐 Enter 2FA Code</h2>
      <input type="text" id="login2FAToken" placeholder="6-digit token"
        class="w-full p-2 bg-gray-800 border border-gray-600 rounded mb-4" />
      <div class="flex justify-end">
        <button id="submit2FALogin" class="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Verify</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("submit2FALogin")?.addEventListener("click", async () => {
    const tokenValue = (document.getElementById("login2FAToken") as HTMLInputElement).value;

    try {
      const response = await axios.post(`${API_URL}/2fa/login`, { email, token: tokenValue });
      localStorage.setItem("token", response.data.token);
      showToast("2FA login successful!", "success");
      modal.remove();
      window.route("/dashboard");
    } catch (err: any) {
      showToast(err.response?.data?.error || "Invalid 2FA code", "error");
    }
  });
}


export function handleRegister() {
  const form = document.getElementById("registerForm");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;
    const errorMessage = document.getElementById("error-message");

    if (password !== confirmPassword) {
      errorMessage?.classList.remove("hidden");
      return;
    } else {
      errorMessage?.classList.add("hidden");
    }

    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });
      showToast(response.data.message, "success");
      window.route("/login");
    } catch (error) {
      const mssg = "Error: " + (error as any)?.response?.data?.error || "Registration failed";
      showToast(mssg, "error");
    }
  });
}
