import SETTINGS from "@/settings";
import axios from "axios";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export default {
  async GET_PRODUCTS_FROM_API({ commit, state }, rows) {
    try {
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_3, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await WooCommerce.get("products", await {
        category: state.categoryId,
        search: state.vModelValue,
        per_page: state.perpage,
        page: rows,
      })
        .then((response) => {
          //вызываем мутацию для передачи даных
          commit("SET_PRODUCTS_TO_STATE", response.data);
          state.rows = response.headers["x-wp-totalpages"];
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency PRODUCTS`);
    }
  },
  async GET_MENU_FROM_API({ commit }) {
    try {
      return await axios(SETTINGS.URL + "wp-json/wp/v2/menu", {
        method: "GET",
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
      })
        .then((menu) => {
          commit("SET_MENU_TO_STATE", menu.data);
          return menu;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency MENU`);
    }
  },
  async GET_CUSTOMERS_FROM_API({ commit }) {
    try {
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_2, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await WooCommerce.get("customers/1")
        .then((customers) => {
          commit("SET_CUSTOMERS_TO_STATE", customers.data);
          return customers;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency INFO`);
    }
  },
  async GET_POP_PRODUCTS_FROM_API({ commit }) {
    try {
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_3, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await WooCommerce.get("products", await {
        featured: true
      })
        .then((response) => {
          //вызываем мутацию для передачи даных
          commit("SET_POP_PRODUCTS_TO_STATE", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency POP_PRODUCTS`);
    }
  },
  async GET_NEW_PRODUCTS_FROM_API({ commit }) {
    try {
      var $date = new Date();
      $date.setMonth(1);
      var $date_back = $date.toISOString();
      $date_back = $date_back.slice(0, -5);
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_3, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await WooCommerce.get("products", await {
        after: $date_back,
        per_page: 5,
        page: 1,
      })
        .then((response) => {
          //вызываем мутацию для передачи даных
          commit("SET_NEW_PRODUCTS_TO_STATE", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency POP_PRODUCTS`);
    }
  },
  async GET_CATEGORIES_FROM_API({ commit }) {
    try {
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_3, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await WooCommerce.get("products/categories?exclude=15") // ?include=33,36,39
        .then((categories) => {
          //вызываем мутацию для передачи даных
          commit("SET_CATEGORIES_TO_STATE", categories.data);
          return categories;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency CATEGORIES`);
    }
  },
  async GET_PRODUCT_FROM_API({ commit, state }) {
    try {
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_3, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await WooCommerce.get(
        "products",
        await {
          slug: state.product_slug
        }
      )
        .then((response) => {
          //вызываем мутацию для передачи даных
          commit("SET_PRODUCT_FROM_API", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency PRODUCT`);
    }
  },
  async GET_CATEGORY_FROM_API({ commit, state }) {
    try {
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_3, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await WooCommerce.get(
        "products/categories",
        await {
          slug: state.category_slug
        }
      )
        .then((response) => {
          //вызываем мутацию для передачи даных
          commit("SET_CATEGORY_FROM_API", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency PRODUCT`);
    }
  },
  async GET_SIMILAR_PRODUCTS_FROM_API({ commit }, category) {
    try {
      const WooCommerce = new WooCommerceRestApi({
        url: SETTINGS.URL, // Your store URL
        consumerKey: SETTINGS.KEY, // Your consumer key
        consumerSecret: SETTINGS.SECRET, // Your consumer secret
        version: SETTINGS.VERSION_3, // WooCommerce WP REST API version
        axiosConfig: SETTINGS.AXIOS_JSON,
      });
      return await  WooCommerce.get(
        "products",
        await {
          category: category,
          per_page: 5,
          page: 1,
        }
      )
        .then((response) => {
          //вызываем мутацию для передачи даных
          commit("SET_SIMILAR_PRODUCTS_TO_STATE", response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    } catch (error) {
      throw new Error(`Unable to get currency SIMILAR`);
    }
  },
};
