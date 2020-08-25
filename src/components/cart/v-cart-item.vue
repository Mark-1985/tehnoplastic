<template>
  <b-card class="flex-sm-row mb-3 py-2" no-body border-variant="info">
    <b-col cols="5" sm="2" class="my-auto mx-auto mx-sm-0">
      <img class="list-cart__image w-100" :src="cart_item_data.images[0].src" alt width="50" />
    </b-col>
    <b-col cols="12" sm="5" md="7" class="text-center text-sm-left p-3 p-sm-0">
      <b-card-text class="font-size-14 font-weight-bold">{{cart_item_data.name}}</b-card-text>
      <b-card-title class="font-size-12 text-muted m-0">
        <span v-pre>Артикул:</span>
        {{cart_item_data.sku}}
      </b-card-title>
      <hr class="my-2" />
      <b-card-title class="font-weight-bold text-danger">{{cart_item_data.price}} грн.</b-card-title>
    </b-col>
    <b-col cols="12" sm="5" md="3" class="text-center text-sm-left">
      <p class="mb-1 font-size-12 text-muted mb-2">Количество:</p>
      <b-input-group size="sm" class="mb-2 px-8 px-sm-0">
        <b-input-group-prepend>
          <b-btn variant="dark" @click="decrementItem">-</b-btn>
        </b-input-group-prepend>
        <b-form-input
          class="text-center"
          type="number"
          min="0"
          @change="$emit('change', cart_item_data.quantity)"
          v-model="cart_item_data.quantity"
          :value="cart_item_data.quantity"
        ></b-form-input>
        <b-input-group-append>
          <b-btn variant="dark" @click="incrementItem">+</b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-button size="sm" block @click="deleteFromCart" variant="outline-danger">Удалить</b-button>
    </b-col>
  </b-card>
</template>

<script>
export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    decrementItem() {
      this.$emit("decrement");
    },

    incrementItem() {
      this.$emit("increment");
    },

    deleteFromCart() {
      this.$emit("deleteFromCart");
    },
    inputQuantity() {
      let $quantity = this.cart_item_data.quantity;
      this.$emit("inputQuantity", $quantity);
    },
  },
  //c помощью ключа добавляем параметр quantity c количеством 1
  mounted() {
    this.$set(this.cart_item_data, "quantity", 1);
  },
};
</script>

<style lang="scss">
.list-cart {
  &__image {
    object-fit: cover;
  }
}
</style>