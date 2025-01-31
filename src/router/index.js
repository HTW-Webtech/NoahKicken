import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PlayerDetail from "../views/PlayerDetail.vue";
import FavoritePlayers from "../views/FavoritePlayers.vue";
import ImpressumPage from "../views/Impressum.vue";
import ContactForm from "../views/ContactForm.vue"; // Importiere die Kontaktformular-Seite

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/player/:id",
    name: "PlayerDetail",
    component: PlayerDetail,
    props: true,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritePlayers,
  },
  {
    path: "/impressum",
    name: "Impressum",
    component: ImpressumPage,
  },
  {
    path: "/contact", // Füge eine Route für das Kontaktformular hinzu
    name: "Contact",
    component: ContactForm, // Komponente für das Kontaktformular
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
