<template>
  <b-col cols="12" md="4">
    <b-card
      bg-variant="dark"
      footer-bg-variant="info"
      class="border-0"
      text-variant="white"
      title="Доставка:"
    >
    <hr class="bg-secondary">
      <p v-if="order_data.billing.last_name">
        <b>Кому:</b>
        {{order_data.billing.last_name}} {{order_data.billing.first_name}}
      </p>
      <p v-if="order_data.shipping_lines[0].method_title">
        <b>Метод доставки:</b>
        {{order_data.shipping_lines[0].method_title}}
      </p>
      <p v-if="order_data.billing.address_1">
        <b>Адрес (склад):</b>
        {{order_data.billing.address_1}}
      </p>
      <p v-if="order_data.billing.city">
        <b>Область/регион:</b>
        {{order_data.billing.city}}
      </p>
      <p v-if="order_data.billing.state">
        <b>Город/населенный пункт:</b>
        {{order_data.billing.state}}
      </p>
      <p v-if="order_data.billing.postcode">
        <b>Почтовый индекс:</b>
        {{order_data.billing.postcode}}
      </p>
      <template v-slot:footer>
        <h5>Контакты:</h5>
        <hr class="bg-secondary">
        <p v-if="order_data.billing.phone">
          <b>Телефон:</b>
          {{order_data.billing.phone}}
        </p>
        <p v-if="order_data.billing.email">
          <b>Email адрес:</b>
          {{order_data.billing.email}}
        </p>
      </template>
    </b-card>
  </b-col>
</template>
<script>
export default {
  name: "address-info-order",
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
  async mounted() {
  },
  computed: {
   
  },
  methods: {},
  watch: {}
};
</script>

<style lang="scss">
</style>