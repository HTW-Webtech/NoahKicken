<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <div class="app-container">
    <HeaderComponent />
    <main>
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the full height is used */
}

main {
  flex-grow: 1;
  padding: 20px;
  margin-top: 70px; /* Adjust to match header height */
  margin-bottom: 60px; /* Adjust to match footer height */
}
</style>
