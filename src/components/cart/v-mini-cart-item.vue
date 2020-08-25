<template>
  <b-row no-gutters class="p-1" @mousemove="hover_item = true" 
  @mouseleave="hover_item = false">
    <b-col align-self="center" class="d-none col-1" :class="{'d-block': hover_item === true}">
      <b-btn-close @click="deleteFromCart" class="p-2" />
    </b-col>
    <b-col md="3" class="col-2" align-self="center">
      <b-card-img :src="cart_item_data.images[0].src" alt="Image" class="img-fluid d-block mx-auto w-75"></b-card-img>
    </b-col>

    <b-col align-self="center" class="col-8 p-2">
      <p class="font-size-14 text-wrap mb-0">{{cart_item_data.name}}</p>
      <h6 class="mb-0 font-weight-bold py-2">
        <span class="count">{{cart_item_data.quantity}}</span>
        x {{cart_item_data.price}} грн.
      </h6>
    </b-col>
    <hr class="col-12 my-1">
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "v-mini-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      $elem: [],
      hover_item: false
    };
  },
  computed: {
    ...mapGetters(["LSTOREG"])
  },
  //c помощью ключа добавляем параметр quantity c количеством 1
  created() {
    this.$elem = this.getToCart();
    this.$elem.map(element => {
      if (element.product_id == this.cart_item_data.id) {
        this.$set(this.cart_item_data, "quantity", element.quantity);
      }
    });
  },
  methods: {
    deleteFromCart() {
      this.$emit("deleteFromCart");
    }, //метод для получения даных из локального хранилища
    getToCart() {
      const $itemProduct = localStorage.getItem(this.LSTOREG);
      if ($itemProduct !== null) {
        return JSON.parse($itemProduct);
      }
      return [];
    }
  }
};
</script>

<style lang="scss">
.v-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding * 2;
  margin-bottom: $margin * 2;

  &__image {
    max-width: 58px;
  }
  .quantity__btn {
    cursor: pointer;
    padding: $padding;
    box-shadow: 0 0 8px 0 #e0e0e0;
  }
}
</style>