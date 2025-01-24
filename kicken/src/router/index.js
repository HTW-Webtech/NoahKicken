import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PlayerDetail from "../views/PlayerDetail.vue";
import FavoritePlayers from "../views/FavoritePlayers.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/player/:id", component: PlayerDetail },
  { path: "/favorites", component: FavoritePlayers },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
