<!-- src/views/HomePage.vue -->
<template>
  <div>
    <h1>Spieler Übersicht</h1>
    <input v-model="searchQuery" placeholder="Spieler suchen..." />
    <select v-model="selectedCategory">
      <option value="">Alle Kategorien</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <ul>
      <li v-for="player in filteredPlayers" :key="player.id">
        <router-link :to="`/player/${player.id}`">
          <img :src="player.image_path || 'default-image.jpg'" alt="Player Image" />
          {{ player.display_name || player.name || "Unbekannt" }}
        </router-link>
        <button @click="addToFavorites(player)">Zu Favoriten hinzufügen</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchPlayers, addFavorite } from "../services/api";

export default {
  data() {
    return {
      players: [],
      searchQuery: "",
      selectedCategory: "",
      categories: ["Stürmer", "Verteidiger", "Mittelfeld", "Torwart"],
    };
  },
  computed: {
    filteredPlayers() {
      if (!this.players) return [];
      return this.players.filter((player) => {
        const playerName = player.display_name || player.name || "Unbekannt";
        return playerName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    async fetchAllPlayers() {
      try {
        const { data } = await fetchPlayers(); // Fetch players data
        console.log("Spielerdaten:", data);
        this.players = data.data || [];
      } catch (error) {
        console.error("Fehler beim Abrufen der Spieler:", error);
        alert("Fehler beim Abrufen der Spielerdaten. Bitte versuche es später erneut.");
      }
    },
    async addToFavorites(player) {
      try {
        await addFavorite({
          player_id: player.id,
          player_name: player.display_name || player.name,
          position: player.position_id || "Unbekannt",
        });
        alert(`${player.display_name || player.name} wurde zu den Favoriten hinzugefügt!`);
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Spielers zu den Favoriten:", error);
        alert("Spieler konnte nicht zu den Favoriten hinzugefügt werden.");
      }
    },
  },
  created() {
    this.fetchAllPlayers();  // Fetch all players when component is created
  },
};
</script>

<style>
/* Styling remains unchanged from your original code */
</style>
