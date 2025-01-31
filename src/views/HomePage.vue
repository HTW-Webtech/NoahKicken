<template>
  <div class="home-page">
    <!-- Title Section -->
    <h1 class="page-title">Spieler Übersicht</h1>

    <!-- Search and Category Filters -->
    <div class="filters">
      <input
        v-model="searchQuery"
        placeholder="Spieler suchen..."
        class="search-input"
      />
      <select v-model="selectedCategory" class="category-select">
        <option value="">Alle Kategorien</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Player List -->
    <ul class="player-list">
      <li v-for="player in filteredPlayers" :key="player.id" class="player-item">
        <router-link :to="`/player/${player.id}`" class="player-link">
          <img :src="player.image_path || 'default-image.jpg'" alt="Player Image" class="player-image"/>
          <div class="player-name">
            {{ player.display_name || player.name || "Unbekannt" }}
          </div>
        </router-link>
        <button @click="addToFavorites(player)" class="favorite-button">Zu Favoriten hinzufügen</button>
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
        const { data } = await fetchPlayers(this.selectedCategory);
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

<style scoped>
.home-page {
  font-family: 'Poppins', sans-serif; /* Assuming Poppins font is added globally */
  padding: 2rem;
  background-color: #f4f4f4;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.search-input, .category-select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 48%;
}

.search-input {
  flex-grow: 1;
}

.category-select {
  width: 48%;
}

.player-list {
  list-style: none;
  padding: 0;
}

.player-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.player-link {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.player-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 1rem;
}

.player-name {
  font-size: 1.2rem;
  color: #333;
}

.favorite-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.favorite-button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .search-input, .category-select {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
