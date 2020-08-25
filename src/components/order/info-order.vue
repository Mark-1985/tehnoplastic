<template>
  <b-col cols="12" md="4">
    <b-alert show class="text-center" variant="primary">
      <span v-pre>Заказа №</span>
      {{order_data.id}}
    </b-alert>
    <b-alert show class="text-center" variant="success">В обработке</b-alert>
    <b-alert show class="text-center" variant="info">{{order_data.date_created | deletesymbol}}</b-alert>
    <b-alert show class="text-center" variant="warning">{{order_data.total}} грн.</b-alert>
  </b-col>
</template>
<script>
export default {
  name: "info-order",
  components: {},
  props: {
    order_data: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  filters: {
    deletesymbol: function(value) {
      if (!value) return "";
      value = value.toString();
      var find = "T";
      var re = new RegExp(find, "g");
      var txt = value.replace(re, " ");
      return txt;
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
</style>