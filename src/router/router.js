import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    post_name: "home",
    name: "Главная страница",
    component: ()=>import("@/views/home"),
  },
  {
    path: "/shop/",
    post_name: "shop",
    name: "Каталог",
    component: ()=>import("@/views/shop"),
  },
  {
    path: "/blog/",
    post_name: "about-us",
    name: 'О нас',
    component: ()=>import("@/views/about-us"),
  },
  {
    path: "/404/",
    post_name: "404",
    name:'404',
    component: ()=>import("@/views/no-page"),
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/product/:product",
    name: "product",
    component: ()=>import("@/components/product/product"),
    props: true,
  },
  {
    path: "/contact/",
    post_name: "contacts",
    name: 'Контакты',
    component: ()=>import("@/views/contacts"),
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
