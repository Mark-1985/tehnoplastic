import Vue from "vue";
import SvgIcon from "vue-svgicon";

import { loadProgressBar } from "axios-progress-bar";
import "@babel/polyfill";
import "mutationobserver-shim";
import "@/plugins/bootstrap.js";

import "axios-progress-bar/dist/nprogress.css";
import "./assets/styles/styles.module.scss";

import App from "@/App.vue";
import store from "@/vuex/store";
import router from "@/router/router";
import LightGallery from "vue-light-gallery";

import "@/icons/components";

loadProgressBar();

Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em",
});
Vue.use(LightGallery);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
