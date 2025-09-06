import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Products from "../views/Products.vue";
import Cart from "../views/Cart.vue";
import Orders from "../views/Orders.vue";

const routes = [
  { path: "/login", name:'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: "/products", name:'Products', component: Products },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/orders', name: 'Orders', component: Orders },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
