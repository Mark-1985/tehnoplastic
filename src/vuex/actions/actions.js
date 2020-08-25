export default {
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product)
    },
    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)

    },
    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART', index)
    },
    GET_SEARCH_VALUE_TO_VUEX ({commit}, value) {
        commit('SET_SEARCH_VALUE_TO_VUEX', value)
    },
    GET_ID_CATEGORIES_TO_VUEX ({commit}, value) {
        commit('SET_ID_CATEGORIES_TO_VUEX', value)
    },
    GET_SORTING_OPTIONS_TO_VUEX ({commit}, value) {
        commit('SET_SORTING_OPTIONS_TO_VUEX', value)
    },
    GET_PRODUCT_SLUG_TO_VUEX ({commit}, value) {
        commit('SET_PRODUCT_SLUG_TO_VUEX', value)
    },



}
