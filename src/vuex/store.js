import Vue from "vue";
//подключили vuex
import Vuex from "vuex";

import commonActions from "./actions/actions";
import apiRequest from "./actions/api-request";
import mutations from "./mutations/mutations";
import getters from "./getters/getters";

//обединение файлов
const actions = { ...commonActions, ...apiRequest };

//попросили использовать vuex
Vue.use(Vuex);

//перемменая хранилище даных
//в состояние записали масив
//вызываем метод гет и обращемся к api для получения даных
let store = new Vuex.Store({
  state: {
    customers: [],
    productId: null,
    product: [],
    products: [],
    product_id: '',
    phone: null,
    menu: [],
    categories: [],
    categoryId: null,
    rows: null,
    perpage: 10,
    vModelValue: "",
    popProduct: [],
    newProduct: [],
    similar_products: [],
    category: '',
    category_slug: ''
  },
  mutations,
  actions,
  getters,
});

export default store;
