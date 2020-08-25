<template>
  <b-col sm="12" lg="4" class="px-3">
    <b-card
      bg-variant="dark"
      header="Информация по заказу"
      text-variant="white"
      class="text-center"
    >
      <b-card-text>Сумма:</b-card-text>
      <b-card-text>{{cartTotalCost}} грн.</b-card-text>
      <b-card-text>Количество товаров:</b-card-text>
      <b-card-text>{{cartQuantity}}</b-card-text>
    </b-card>
    <b-button
      v-if="listCart"
      to="/cart/order"
      size="lg"
      class="mt-4"
      block
      variant="warning"
    >Оформить заказ</b-button>
    <b-button
      v-if="order"
      to="/cart/list-cart"
      size="lg"
      class="mt-4"
      block
      variant="warning"
    >Вернутся к списку поккупок</b-button>
    <b-button to="/" size="lg" class="mt-4" block variant="primary">На главную</b-button>
  </b-col>
</template>

<script>
export default {
  name: "v-cart-info",
  components: {},
  data() {
    return {
      listCart: false,
      order: false
    };
  },
  props: {
    cart_item_data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    if (this.$route.path == "/cart/list-cart") {
      this.$nextTick(() => {
        this.listCart = true;
      });
    }
    if (this.$route.path == "/cart/order") {
      this.$nextTick(() => {
        this.order = true;
      });
    }
  },
  computed: {
    /*   ...mapGetters(["CART", "LSTOREG"]), */
    cartTotalCost() {
      //подсчет общей стоимости
      let result = [];
      if (this.cart_item_data.length) {
        for (let item of this.cart_item_data) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce(function(sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    },
    cartQuantity() {
      let quantity = [];
      if (this.cart_item_data.length) {
        for (let item of this.cart_item_data) {
          quantity.push(+item.quantity);
        }
        quantity = quantity.reduce(function(sum, el) {
          return sum + el;
        });
        return quantity;
      } else {
        return 0;
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.v-cart {
  &__total {
    background: #2a5446;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>