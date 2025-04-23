import axios from "axios";

export async function submitMatch(playerScore: number, guestScore: number) {
  const token = localStorage.getItem("token");
  try {
    await axios.post("http://localhost:3000/matches", {
      playerScore,
      guestScore,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("Failed to save match:", err);
  }
}
