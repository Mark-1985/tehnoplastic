export default {
  SET_MENU_TO_STATE: (state, menu) => {
    menu.map((menu) => {
      if (menu.menu_item_parent == "0") {
        state.menu.push(menu);
      }
    });
  },
  SET_ORDERS_TO_STATE: (state, orders) => {
    state.orders = orders;
  },
  SET_ORDER_TO_STATE: (state, payload) => {
    state.order = payload.data;
  },
  SET_INFO_TO_STATE: (state, info) => {
    state.info = info;
  },
  SET_CUSTOMERS_TO_STATE: (state, customers) => {
    state.customers = customers;
  },
  SET_SEARCH_VALUE_TO_VUEX: (state, value) => {
    state.vModelValue = value;
  },
  SET_ID_CATEGORIES_TO_VUEX: (state, value) => {
    state.categoryId = value;
  },
  SET_PRODUCT_SLUG_TO_VUEX: (state, value) => {
    state.product_slug = value;
  },
  SET_SORTING_OPTIONS_TO_VUEX: (state, value) => {
    state.sortingCatalog = value;
  },
  SET_PRODUCTS_TO_STATE: (state, product) => {
    //передаем даные в продукт з мутации
    state.products = product;
  },
  SET_PRODUCT_FROM_API: (state, product) => {
    //передаем даные в продукт з мутации
    state.product = product;
  },
  SET_POP_PRODUCTS_TO_STATE: (state, product) => {
    //передаем даные в продукт з мутации
    state.popProduct = product;
  },
  SET_NEW_PRODUCTS_TO_STATE: (state, product) => {
    //передаем даные в продукт з мутации
    state.newProduct = product;
  },
  SET_CATEGORIES_TO_STATE: (state, categories) => {
    state.categories = categories;
  },
  SET_ZONES_TO_STATE: (state, zones) => {
    state.zones = zones;
  },
  SET_CART: (state, product) => {
    if (state.cart.length) {
      let isProductExists = false;
      let $itemLocal = JSON.parse(localStorage.getItem(state.lstoreg));
      state.cart.map(function(item) {
        if (item.id === product.id) {
          isProductExists = true;
          let $local = $itemLocal.find((elem) => {
            if (elem.product_id == product.id) {
              return elem;
            }
            return "";
          });
          item.quantity = $local.quantity;
        }
      });
      if (!isProductExists) {
        state.cart.push(product);
      }
    } else {
      state.cart.push(product);
    }
  },
  REMOVE_FROM_CART: (state, index) => {
    state.cart.splice(index, 1);
  },
  INCREMENT: (state, index) => {
    state.cart[index].quantity++;
  },
  DECREMENT: (state, index) => {
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--;
    } else {
      state.cart.slice(index, 1);
    }
  },
  SET_SIMILAR_PRODUCTS_TO_STATE: (state, product) => {
    //передаем даные в продукт з мутации
    state.similar_products = product;
  },
};
