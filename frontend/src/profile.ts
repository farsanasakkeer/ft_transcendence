import axios from "axios";
import { setupLanguageSwitcher } from "./utils/languageSwitcher";
import { showToast } from "./utils/toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function setupProfile() {
  setupLanguageSwitcher();

  const toggle = document.getElementById("toggle2FA") as HTMLInputElement;
  if (!toggle) return;

  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const twoFAEnabled = res.data.user.twoFA;
    toggle.checked = twoFAEnabled; // ← sets the toggle on load
  } catch (err) {
    showToast("Failed to load 2FA status", "error");
  }

  // Handle toggle behavior
  toggle.addEventListener("change", async () => {
    if (toggle.checked) {
      try {
        const response = await axios.get(`${API_URL}/2fa/setup`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const qrCodeDataURL = response.data.qrCodeDataURL;
        show2FAModal(qrCodeDataURL);
      } catch (error) {
        showToast("Failed to setup 2FA", "error");
        toggle.checked = false;
      }
    } else {
      await axios.post(`${API_URL}/2fa/disable`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("2FA disabled", "success");
    }
  });
}

// Same show2FAModal function as before


function show2FAModal(qrCodeDataURL: string) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
      <h2 class="text-xl font-bold mb-4">🔐 Scan this QR Code</h2>
      <img src="${qrCodeDataURL}" alt="QR Code" class="mx-auto mb-4 border border-gray-600 rounded"/>
      <p class="text-sm text-gray-400 mb-2">Use Google Authenticator or Authy to scan the code.</p>
      <input type="text" id="tokenInput" placeholder="Enter the 6-digit code" class="w-full p-2 bg-gray-800 border border-gray-600 rounded mb-4" />
      <div class="flex justify-between">
        <button id="verify2FA" class="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Verify</button>
        <button id="cancel2FA" class="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("cancel2FA")?.addEventListener("click", () => modal.remove());

  document.getElementById("verify2FA")?.addEventListener("click", async () => {
    const tokenValue = (document.getElementById("tokenInput") as HTMLInputElement).value;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${API_URL}/2fa/verify`, { token: tokenValue }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      showToast("2FA enabled successfully!", "success");
      modal.remove();
    } catch (err) {
      showToast("Invalid token. Try again.", "error");
    }
  });
}
