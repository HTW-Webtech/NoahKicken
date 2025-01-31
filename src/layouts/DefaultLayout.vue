<template>
  <div>
    <HeaderComponent />
    <main>
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped>
main {
  min-height: 80vh; /* Sicherstellen, dass der Content-Bereich genug Platz hat */
  padding: 20px;
}
</style>
