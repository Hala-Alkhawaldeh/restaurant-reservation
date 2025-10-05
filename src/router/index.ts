import { createRouter, createWebHistory } from "vue-router"
import ReservationPage from "../views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/reservations",
    },
    {
      path: "/reservations",
      name: "Reservations",
      component: ReservationPage,
    },
  ],
  // const router = createRouter({
  //   history: createWebHistory(),
  //   routes,
  // })
})


export default router
