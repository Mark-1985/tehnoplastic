import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/home";
import Shop from "@/views/shop";
import AboutUs from "@/views/about-us";
import NoPage from "@/views/no-page";
import Product from "@/components/product/product";
import Сontacts from "@/views/contacts";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    post_name: "home",
    name: "Главная страница",
    component: Home,
  },
  {
    path: "/shop/",
    post_name: "shop",
    name: "Каталог",
    component: Shop,
  },
  {
    path: "/blog/",
    post_name: "about-us",
    name: 'О нас',
    component: AboutUs,
  },
  {
    path: "/404/",
    post_name: "404",
    name:'404',
    component: NoPage,
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/product/:product",
    name: "product",
    component: Product,
    props: true,
  },
  {
    path: "/contact/",
    post_name: "contacts",
    name: 'Контакты',
    component: Сontacts,
  },


];

const router = new VueRouter({
  mode: "history",
  base: __dirname /* process.env.BASE_URL, */,
  routes,
  scrollBehavior(to, from, savedPosition) {
    to, from, savedPosition;
    return { x: 0, y: 0 }
  }
});

export default router;
