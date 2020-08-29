export default {
    GET_SEARCH_VALUE_TO_VUEX ({commit}, value) {
        commit('SET_SEARCH_VALUE_TO_VUEX', value)
    },
    GET_ID_CATEGORIES_TO_VUEX ({commit}, value) {
        commit('SET_ID_CATEGORIES_TO_VUEX', value)
    },
    GET_PRODUCT_SLUG_TO_VUEX ({commit}, value) {
        commit('SET_PRODUCT_SLUG_TO_VUEX', value)
    },
    GET_CATEGORY_SLUG_TO_VUEX({ commit }, value) {
        commit('SET_CATEGORY_SLUG_TO_VUEX', value)
    },

}
