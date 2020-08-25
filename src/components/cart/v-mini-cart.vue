<template>
  <div class="v-mini-cart">
    <p v-if="!cart_data.length">Корзина пуста...</p>
    <div v-else class="v-mini-cart__item overflow-auto" style=" max-height: 390px;">
      <v-mini-cart-item 
      v-for="(item, index) in cart_data"
      :key="index"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      ></v-mini-cart-item>
    </div>


    <b-row class="p-1 flex-column justify-content-center">
      <b-col>
        <div class="d-flex justify-content-between align-items-center">
          <div class="w-50">
            <h6 class="m-0 text-muted py-2">Подитог:</h6>
            <span class="font-weight-bold">{{cartTotalCost}} грн.</span>
          </div>

          <router-link
            class="btn btn-outline-info mt-2 font-size-12"
            :to="{path: '/cart/list-cart'}"
          >Просмотреть корзину</router-link>
        </div>
      </b-col>

      <b-col class="pt-5">
          <router-link
            squared
            class="btn btn-success w-100 mt-2"
            :to="{path: '/cart/order'}"
          >Оформить заказ</router-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-mini-cart",
  data() {
    return {
      cart: []
    };
  },
  components: {
    VMiniCartItem: () => import("@/components/cart/v-mini-cart-item")
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters(["CART", "LSTOREG"]),
    cartTotalCost() {
      //подсчет общей стоимости
      let result = [];
      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          result.push(item.price * item.quantity);
        }
        result = result.reduce(function(sum, el) {
          return sum + el;
        });
        return result;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "DELETE_FROM_CART"]),
    //метод для получения даных из локального хранилища
    getToCart() {
      const $itemProduct = localStorage.getItem(this.LSTOREG);
      if ($itemProduct !== null) {
        return JSON.parse($itemProduct);
      }
      return [];
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
      this.cart = this.getToCart();
      this.cart.splice(index, 1);
      let $parse = JSON.stringify(this.cart);
      localStorage.setItem(this.LSTOREG, $parse);
    }
  }
};
</script>

<style lang="scss">
.v-mini-cart {
  width: 325px;
  &__item::-webkit-scrollbar {
    width: 3px;
    background-color: #ececec;
  }
  ::-webkit-scrollbar-thumb {
    width: 3px;
    background-image: -webkit-linear-gradient(#F5F5F5, #8A8A8A);
  }
  @media (max-width: 576px){
     width: 245px;
  }
}

</style>