export default {
  SEARCH_VALUE(state) {
    return state.vModelValue;
  },
  PRODUCTS(state) {
    return state.products;
  },
  PRODUCT(state) {
    return state.product;
  },
  PRODUCT_SLUG(state) {
    return state.product_slug
  },
  PRODUCT_ID(state) {
    return state.product_id;
  },
  POP_PRODUCTS(state) {
    return state.popProduct;
  },
  NEW_PRODUCTS(state) {
    return state.newProduct;
  },
  CATEGORIES(state) {
    return state.categories;
  },
  CATEGORY_ID(state) {
    return state.categoryId;
  },
  MENU(state) {
    return state.menu;
  },
  CUSTOMERS(state) {
    return state.customers;
  },
  ROWS(state) {
    return state.rows;
  },
  SIMILAR_PRODUCTS(state) {
    return state.similar_products;
  },
};
