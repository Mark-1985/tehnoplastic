<template>
  <v-form-orders v-if="CART.length" :cart_data="CART"></v-form-orders>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "order",
  components: {
    VFormOrders: () => import("@/components/orders/v-form-orders")
  },
  data() {
    return {
      title: "Оформление заказа"
    };
  },
  computed: {
    ...mapGetters(["CART"])
  },
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
</style>

