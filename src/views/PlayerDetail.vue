<template>
  <div v-if="player" class="player-detail-page">
    <!-- Title Section -->
    <h1 class="player-name">{{ player.display_name || "Unbekannter Spieler" }}</h1>

    <!-- Player Image -->
    <div class="player-image-container">
      <img :src="player.image_path || 'default-image.jpg'" alt="Spielerbild" class="player-image" />
    </div>

    <!-- Player Info Section -->
    <div class="player-info">
      <p><strong>Position:</strong> {{ player.position || 'Unbekannt' }}</p>
      <p><strong>Geburtsdatum:</strong> {{ player.date_of_birth || 'Unbekannt' }}</p>
      <p><strong>Größe:</strong> {{ player.height || 'Unbekannt' }} cm</p>
      <p><strong>Gewicht:</strong> {{ player.weight || 'Unbekannt' }} kg</p>
      <p><strong>Land:</strong> {{ player.country_name || 'Unbekannt' }}</p>
    </div>
  </div>

  <div v-else>
    <p class="error-message">Spieler nicht gefunden.</p>
  </div>
</template>

<script>
// src/views/PlayerDetail.vue
import { fetchPlayerDetails } from "../services/api"; // Function to fetch player details

export default {
  data() {
    return {
      player: null, // Player object
    };
  },
  async created() {
    const playerId = this.$route.params.id; // Get the ID from the URL
    console.log("Spieler-ID:", playerId); // For debugging purposes
    try {
      const playerData = await fetchPlayerDetails(playerId, 'teams'); // Fetch player details with 'teams'
      console.log('Antwort vom Backend für Spieler:', playerData); // For debugging purposes

      if (playerData.error) {
        console.error("Fehler in den API-Daten:", playerData.error);
        this.player = null;
        return;
      }

      this.player = playerData; // Set player data
    } catch (error) {
      console.error("Fehler beim Abrufen der Spieler-Details:", error);
      this.player = null;
    }
  },
};
</script>

<style scoped>
/* Styling for Player Details Page */
.player-detail-page {
  font-family: 'Poppins', sans-serif;
  background-color: #f9f9f9;
  padding: 2rem;
  text-align: center;
}

.player-name {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.player-image-container {
  margin-bottom: 1.5rem;
}

.player-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.player-info {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
}

.player-info p {
  margin: 10px 0;
}

.player-info strong {
  color: #333;
}

.error-message {
  font-size: 1.5rem;
  color: red;
  text-align: center;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .player-name {
    font-size: 2rem;
  }

  .player-image {
    width: 200px;
    height: 200px;
  }

  .player-info {
    font-size: 1rem;
  }
}
</style>
