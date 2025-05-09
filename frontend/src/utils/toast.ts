export function showToast(message: string, type: "success" | "error" = "success", duration = 3000) {
    const container = document.getElementById("toast-container");
    if (!container) return;
  
    const toast = document.createElement("div");
  
    const baseStyles = "px-4 py-3 rounded shadow-lg text-sm animate-fade-in transition-opacity duration-300";
    const typeStyles = type === "success"
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white";
  
    toast.className = `${baseStyles} ${typeStyles}`;
    toast.innerText = message;
  
    container.appendChild(toast);
  
    // Auto-remove after duration
    setTimeout(() => {
      toast.classList.add("opacity-0");
      setTimeout(() => toast.remove(), 300); // Let fade out animation play
    }, duration);
  }
  