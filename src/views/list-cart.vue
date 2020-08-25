<template>    
      <v-cart v-if="CART.length" :cart_data="CART"></v-cart>  
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "list-cart",
  components: {
    VCart: () => import("@/components/cart/v-cart")
  },
  props: {},
  data() {
    return {
      title: "Корзина товаров"
    };
  },
  computed: {
     ...mapGetters([
                'CART'
            ])
  },
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
.v-shop {
  max-width: 900px;
  margin: 0 auto;
}
</style>

