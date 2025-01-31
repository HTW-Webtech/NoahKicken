<template>
  <div class="favorites-page">
    <!-- Title Section -->
    <h1 class="page-title">Meine Favoriten</h1>

    <!-- Favorite Players List -->
    <ul v-if="favorites.length > 0" class="favorites-list">
      <li v-for="favorite in favorites" :key="favorite.id" class="favorite-item">
        <!-- Player Name as a Link to Profile Page -->
        <router-link :to="{ name: 'PlayerDetail', params: { id: favorite.player_id } }" class="player-link">
          <div class="player-info">
            <img v-if="favorite.player_image" :src="favorite.player_image" alt="Player Image" class="player-image" />
            <span class="player-name">{{ favorite.player_name }}</span> - <span class="player-position">{{ favorite.position }}</span>
          </div>
        </router-link>

        <!-- Delete Button -->
        <button @click="deleteFavorite(favorite.id)" class="delete-button">Löschen</button>
      </li>
    </ul>

    <!-- No Favorites Message -->
    <p v-else class="no-favorites-message">Noch keine Favoriten hinzugefügt.</p>
  </div>
</template>

<script>
import { getFavorites, deleteFavorite } from "../services/api"; // Import the API functions

export default {
  data() {
    return {
      favorites: [], // Array to hold the favorites
    };
  },
  async created() {
    try {
      this.favorites = await getFavorites(); // Fetch the favorites when the page loads
    } catch (error) {
      console.error("Fehler beim Abrufen der Favoriten:", error);
    }
  },
  methods: {
    async deleteFavorite(id) {
      try {
        await deleteFavorite(id); // Delete the favorite player
        // Remove the favorite from the list after deletion
        this.favorites = this.favorites.filter(favorite => favorite.id !== id);
      } catch (error) {
        console.error("Fehler beim Löschen des Favoriten:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Overall page styling */
.favorites-page {
  font-family: 'Poppins', sans-serif;
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

.favorites-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.favorite-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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

.player-info {
  display: flex;
  align-items: center;
}

.player-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.player-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.player-position {
  font-size: 1rem;
  color: #777;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c0392b;
}

.no-favorites-message {
  text-align: center;
  font-size: 1.2rem;
  color: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .favorite-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .player-link {
    margin-bottom: 1rem;
  }

  .delete-button {
    margin-top: 1rem;
  }
}
</style>
