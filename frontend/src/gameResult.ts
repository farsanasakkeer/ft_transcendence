// src/gameResult.ts
import axios from "axios";

export async function submitMatch(playerScore: number, guestScore: number, game: string = "pong") {
  const token = localStorage.getItem("token");
  try {
    await axios.post("http://localhost:3000/matches", {
      playerScore,
      guestScore,
      game, // ✅ include the game type
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error("Failed to save match:", err);
  }
}
