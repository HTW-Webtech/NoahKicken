// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL; // Basis-URL aus der `.env`

// Spieler-Details abrufen (GET)
export const fetchPlayerDetails = async (playerId) => {
  return axios.get(`${API_URL}/api/player/${playerId}`);
};

// Spieler von der SportMonks-API abrufen (GET)
export const fetchPlayers = async () => {
  return axios.get(`${API_URL}/api/players`, {
    params: {
      include: "teams", // Gültige Include-Option
    },
  });
};

// Spieler zu Favoriten hinzufügen (POST)
export const addFavorite = (player) => {
  return axios.post(`${API_URL}/api/favorites`, player);
};

// Favoriten abrufen (GET)
export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/favorites`);
    return response.data; // Returning data only (could be an empty array)
  } catch (error) {
    console.error("Fehler beim Abrufen der Favoriten:", error);
    return { data: [] }; // Returning an empty array if the request fails
  }
};
