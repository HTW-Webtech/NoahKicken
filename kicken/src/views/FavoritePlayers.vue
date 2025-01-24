<!-- src/views/FavoritePlayers.vue -->
<template>
  <div>
    <h1>Meine Lieblingsspieler</h1>
    <div v-if="!favorites.length">
      <p>Noch keine Favoriten hinzugefügt.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="player in favorites" :key="player.id">
          {{ player.player_name }} - {{ player.position }}
        </li>
      </ul>
    </div>
    <router-link to="/">Zurück zur Übersicht</router-link>
  </div>
</template>

<script>
import { getFavorites } from "../services/api.js";

export default {
  data() {
    return {
      favorites: [], // to hold fetched favorites
    };
  },
  methods: {
    async fetchFavorites() {
      try {
        const response = await getFavorites();  // Fetch the favorites from the API
        console.log("Fetched favorites:", response.data); // Debugging step
        this.favorites = response.data || [];   // Ensure favorites are set
      } catch (error) {
        console.error("Fehler beim Abrufen der Favoriten:", error);
        alert("Fehler beim Abrufen der Favoriten. Bitte versuche es später erneut.");
      }
    },
  },
  created() {
    this.fetchFavorites(); // Fetch the favorites when component is created
  },
};
</script>

<style scoped>
/* Existing Styles */
</style>
