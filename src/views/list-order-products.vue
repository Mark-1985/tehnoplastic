<template>
  <b-row>
    <info-order v-if="ORDER.id" :order_data="ORDER"></info-order>
    <list-info-order v-if="ORDER.id" :order_data="ORDER"></list-info-order>
    <address-info-order v-if="ORDER.id" :order_data="ORDER"></address-info-order>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "list-order-products",
  components: {
    InfoOrder: ()=>import('@/components/order/info-order'),
    ListInfoOrder: ()=>import('@/components/order/list-info-order'),
    AddressInfoOrder: ()=>import('@/components/order/address-info-order'),
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["ORDER"])
  },
  mounted() {
  },
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
</style>

