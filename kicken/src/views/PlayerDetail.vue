<!-- src/views/PlayerDetail.vue -->
<template>
  <div>
    <h1>Spieler Details</h1>
    <div v-if="player">
      <img :src="player.image_path || 'default-image.jpg'" alt="Player Image" />
      <h2>{{ player.display_name || player.name || 'Unbekannt' }}</h2>
      <p><strong>Position:</strong> {{ player.position_id || 'Unbekannt' }}</p>
      <p><strong>Team:</strong> {{ player.team || 'Unbekannt' }}</p>
      <p><strong>Land:</strong> {{ player.country_name || 'Unbekannt' }}</p>
      <p><strong>Geburtsdatum:</strong> {{ player.date_of_birth || 'Unbekannt' }}</p>
      <p><strong>Größe:</strong> {{ player.height ? player.height + ' cm' : 'Unbekannt' }}</p>
      <p><strong>Gewicht:</strong> {{ player.weight ? player.weight + ' kg' : 'Unbekannt' }}</p>
    </div>
    <div v-else>
      <p>Spieler-Daten werden geladen...</p>
    </div>
  </div>
</template>

<script>
import { fetchPlayerDetails } from "../services/api";

export default {
  data() {
    return {
      player: null, // Player data
    };
  },
  methods: {
    async fetchPlayerDetails() {
      try {
        const { data } = await fetchPlayerDetails(this.$route.params.id);
        console.log("Spieler-Details:", data);
        this.player = data;
      } catch (error) {
        console.error("Fehler beim Abrufen der Spieler-Details:", error);
        alert("Fehler beim Laden der Spieler-Details. Bitte versuche es später erneut.");
      }
    },
  },
  created() {
    this.fetchPlayerDetails(); // Load player details when component is created
  },
};
</script>

<style>
/* Styling remains unchanged from your original code */
</style>
