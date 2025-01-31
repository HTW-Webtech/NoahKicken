// src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_BACKEND_URL; // Basis-URL aus der `.env`
console.log("🔗 API URL:", API_URL); // Debugging: URL ausgeben

const positionMapping = {
  24: "Torwart",
  25: "Verteidiger",
  26: "Mittelfeld",
  27: "Stürmer",
};

// Spieler-Details abrufen (GET)
export const fetchPlayerDetails = async (playerId, include = "teams,country") => {
  try {
    const response = await axios.get(`${API_URL}/api/player/${playerId}`, {
      params: {
        api_token: import.meta.env.VITE_SPORTMONKS_API_KEY,
        include, // Standardmäßig 'teams,country', falls kein Wert angegeben wird
      },
    });

    console.log("📢 API RESPONSE:", response.data); // 👀 Debugging

    const player = response.data;

    // Position & Land aus den Daten extrahieren
    const playerPosition = positionMapping[player.position_id] || "Unbekannt";
    const playerCountry = player.country?.name || "Unbekannt";

    return {
      ...player,
      position: playerPosition,
      country_name: playerCountry,
    };
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Spieler-Details:", error);
    throw error;
  }
};

// Spieler von der SportMonks-API abrufen (GET)
export const fetchPlayers = async (positionFilter = "") => {
  const params = {};

  if (positionFilter) {
    const positionId = Object.keys(positionMapping).find(
      (key) => positionMapping[key] === positionFilter
    );

    if (positionId) {
      params.position = positionId;
    }
  }

  return axios.get(`${API_URL}/api/players`, { params });
};

// Spieler zu Favoriten hinzufügen (POST)
export const addFavorite = (player) => {
  return axios.post(`${API_URL}/api/favorites`, player);
};

// Spieler aus Favoriten löschen (DELETE)
export const deleteFavorite = (favoriteId) => {
  return axios.delete(`${API_URL}/api/favorites/${favoriteId}`);
};

// Favoriten abrufen (GET)
export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/favorites`);
    console.log("🌟 Gefundene Favoriten:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Favoriten:", error);
    return [];
  }
};
