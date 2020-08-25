import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/home";
import Shop from "@/views/shop";
import AboutUs from "@/views/about-us";
import NoPage from "@/views/no-page";
import Cart from "@/views/cart";
import Product from "@/components/product/product";
import PaymentDelivery from "@/views/payment-delivery";
import Order from "@/views/order";
import ListCart from "@/views/list-cart";
import ListOrderProducts from "@/views/list-order-products";

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
    name: 'О фабрике',
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
    path: "/cart/",
    post_name: "cart",    
    name:"Корзина",
    redirect: { path: "/cart/list-cart/" },
    component: Cart,
    children: [
      {
        path: "list-cart/",
        post_name: "list catr",
        name: 'Список товаров',
        component: ListCart,
      },
      {
        path: "order/",
        post_name: "order",
        name: "Оформление заказа",
        component: Order,
      },
      {
        path: "list-order-products/",
        post_name: "list order products",
        name: "Спасибо за покупку",
        component: ListOrderProducts,
      },
    ],
  },
  {
    path: "/product/:product",
    name: "product",
    component: Product,
    props: true,
  },
  {
    path: "/oplata-i-dostavka/",
    post_name: "payment-delivery",
    name: "Оплата и доставка",
    component: PaymentDelivery,
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
