import { showToast } from "./utils/toast";

export function handleGoogleLoginSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    localStorage.setItem("token", token);
    showToast("Logged in via Google!", "success");
    window.route("/dashboard");
  } else {
    showToast("Google login failed", "error");
    window.route("/login");
  }
}
