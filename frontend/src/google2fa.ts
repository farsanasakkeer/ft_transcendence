import axios from "axios";
import { showToast } from "./utils/toast";

export function handleGoogle2FAChallenge() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  const button = document.getElementById("verifyGoogle2FA");
  button?.addEventListener("click", async () => {
    const code = (document.getElementById("google2FAToken") as HTMLInputElement).value;

    try {
      const response = await axios.post("http://localhost:3000/2fa/login", {
        email,
        token: code,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      showToast("2FA login successful!", "success");
      window.route("/dashboard");
    } catch (err: any) {
      showToast(err.response?.data?.error || "Invalid token", "error");
    }
  });
}
