<template>
  <b-col cols="12" md="8" class="list-info">
    <b-card header-tag="header" class="list-info__card border-0">
      <template v-slot:header>
        <b-row>
          <b-col cols="6">Название</b-col>
          <b-col cols="2">Цена</b-col>
          <b-col cols="2">Количество</b-col>
          <b-col cols="2">Cумма</b-col>
        </b-row>
      </template>
      <div v-for="(item, index) in order_data.line_items" :key="index" class="cart-item">
        <div class="row align-items-center text-center">
          <div class="col-6">{{item.name}}</div>
          <div class="col-2">{{item.price}} {{order_data.currency_symbol}}</div>
          <div class="col-2">{{item.quantity}}</div>
          <div class="col-2 text-center">{{item.price * item.quantity}} {{order_data.currency_symbol}}</div>
        </div>
        <hr />
      </div>
    </b-card>
  </b-col>
</template>
<script>
export default {
  name: "list-info-order",
  components: {},
  props: {
    order_data: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  async mounted() {},
  computed: {},
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
@include media-breakpoint-down(xs) {
  .list-info {
    overflow: scroll;
    &__card {
      min-width: rem-calc(500px);
    }
  }
}
</style>