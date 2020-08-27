export default {
  SET_MENU_TO_STATE: (state, menu) => {
    menu.map((menu) => {
      if (menu.menu_item_parent == "0") {
        state.menu.push(menu);
      }
    });
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
  SET_SIMILAR_PRODUCTS_TO_STATE: (state, product) => {
    //передаем даные в продукт з мутации
    state.similar_products = product;
  },
};
