<template>
  <header class="header">
    <nav>
      <router-link to="/">Spieler Übersicht</router-link>
      <router-link to="/favorites">Meine Favoriten</router-link>
      <router-link to="/contact">Kontakt</router-link> <!-- Kontakt-Link hinzugefügt -->
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #333333; /* Dark Charcoal Background */
  color: white; /* Light text */
  padding: 15px 0;
  text-align: center;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: #FFFFFF; /* White text for links */
  text-decoration: none;
  font-size: 18px;
}

nav a:hover {
  color: #1E90FF; /* Soft Blue on hover */
  text-decoration: underline;
}
</style>
