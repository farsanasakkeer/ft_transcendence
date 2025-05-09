import axios from "axios";
import { showToast } from "../utils/toast";
import { setCurrentLanguage } from "../utils/i18n";
import { handleRouteChange } from "./route";
import { Tournament } from "../types/tournament";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function setupTournaments() {
  const container = document.getElementById("tournaments-container");
  if (!container) return;

  const token = localStorage.getItem("token");
  if (!token) {
    showToast("Please login to view tournaments", "error");
    window.route("/login");
    return;
  }

  // Create tournament form
  container.innerHTML = `
    <div class="space-y-8">
      <h1 class="text-3xl font-bold mb-8">Tournaments</h1>
      
      <!-- Create Tournament Form -->
      <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 class="text-xl font-semibold mb-4">Create New Tournament</h2>
        <form id="create-tournament-form" class="space-y-4">
          <div>
            <label class="block mb-2">Name:</label>
            <input
              type="text"
              id="tournament-name"
              class="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <div>
            <label class="block mb-2">Start Date:</label>
            <input
              type="datetime-local"
              id="tournament-date"
              class="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              required
            />
          </div>
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Create Tournament
          </button>
        </form>
      </div>

      <!-- Tournaments List -->
      <div id="tournaments-list" class="space-y-4"></div>
    </div>
  `;

  // Add form submit handler
  const form = document.getElementById("create-tournament-form");
  form?.addEventListener("submit", handleCreateTournament);

  // Fetch and display tournaments
  fetchTournaments();

  async function fetchTournaments() {
    try {
      const response = await axios.get(`${API_URL}/tournaments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      displayTournaments(response.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      showToast("Error fetching tournaments", "error");
    }
  }

  async function handleCreateTournament(e: Event) {
    e.preventDefault();
    const nameInput = document.getElementById(
      "tournament-name"
    ) as HTMLInputElement;
    const dateInput = document.getElementById(
      "tournament-date"
    ) as HTMLInputElement;

    try {
      await axios.post(
        `${API_URL}/tournaments`,
        {
          name: nameInput.value,
          startDate: dateInput.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      nameInput.value = "";
      dateInput.value = "";
      showToast("Tournament created successfully", "success");
      fetchTournaments();
    } catch (error) {
      console.error("Error creating tournament:", error);
      showToast("Error creating tournament", "error");
    }
  }

  function displayTournaments(tournaments: Tournament[]) {
    const listContainer = document.getElementById("tournaments-list");
    if (!listContainer) return;

    listContainer.innerHTML = tournaments
      .map(
        (tournament) => `
      <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 class="text-xl font-semibold">${tournament.name}</h2>
        <p class="text-gray-400">Status: ${tournament.status}</p>
        <p class="text-gray-400">Start Date: ${new Date(
          tournament.startDate
        ).toLocaleString()}</p>
        <p class="text-gray-400">Participants: ${
          tournament.participants.length
        }</p>
        
        <!-- Matches -->
        <div class="mt-4">
          <h3 class="font-semibold mb-2">Matches:</h3>
          ${tournament.matches
            .map(
              (match) => `
            <div class="ml-4 mt-2 p-2 bg-gray-700 rounded">
              <p>${match.player1.email} vs ${match.player2.email}</p>
              <p>Score: ${match.player1Score} - ${match.player2Score}</p>
              <p>Status: ${match.status}</p>
            </div>
          `
            )
            .join("")}
        </div>

        <button
          onclick="joinTournament(${tournament.id})"
          class="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Join Tournament
        </button>
      </div>
    `
      )
      .join("");

    // Add join tournament handler
    (window as any).joinTournament = async (tournamentId: number) => {
      try {
        await axios.post(
          `${API_URL}/tournaments/${tournamentId}/join`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        showToast("Joined tournament successfully", "success");
        fetchTournaments();
      } catch (error) {
        console.error("Error joining tournament:", error);
        showToast("Error joining tournament", "error");
      }
    };
  }
}
