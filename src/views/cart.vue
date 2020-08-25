<template>
  <b-container fluid="lg" class="cart py-5">
    <h1 class="font-weight-bold text-center mb-md-10">{{title}}</h1>
    <p v-if="!CART.length">Корзина пуста...</p> 
    <b-nav v-if="CART.length" class="cart__nav mb-6" tabs align="center">
      <b-nav-item
        v-for="(link, index) in links"
        :key="index"
        :to="link.to"
        exact
        link-classes="h5 font-weight-bolder py-4"
        class="cart__link text-center position-relative w-50"
      >{{index + 1}}. {{link.name}}</b-nav-item>
    </b-nav>
    <keep-alive>
      <router-view />
    </keep-alive>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {},
  props: {},
  data() {
    return {
      title: "Корзина товаров",
      show: true,
      links: [
        { name: "Список покупок", to: "/cart/list-cart" },
        { name: "Оформить заказ", to: "/cart/order" }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.show = true;
      this.title = "Корзина товаров";
    });
    if (this.$route.name == "list-order-products") {
      this.$nextTick(() => {
        this.show = false;
        this.title = "Спасибо за заказ";
      });
    }
  },
  computed: {
    ...mapGetters(["ORDER", "CART"])
  },
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
.cart {
  &__link {
    color: $gray-600;
    &:hover {
      &::before {
        content: "";
        border-bottom: 1px solid $red;
        width: 100%;
        position: absolute;
        top: 98%;
        left: 0;
      }
    }
    .nav-link {
      border: 0;
      &:hover {
        color: $red;
      }
    }
  }
  .router-link-exact-active {
    color: $red;
    &::before {
      content: "";
      border-bottom: 1px solid $red;
      width: 100%;
      position: absolute;
      top: 98%;
      left: 0;
    }
  }
}
</style>

