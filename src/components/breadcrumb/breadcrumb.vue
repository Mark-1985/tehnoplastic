<template>
    <b-breadcrumb class="pl-0 bg-white">
      <b-breadcrumb-item to="/">Главная</b-breadcrumb-item>
      <b-breadcrumb-item v-if="this.$route.name === 'product' && PRODUCT != ''" active>{{PRODUCT[0].name}}</b-breadcrumb-item>
      <b-breadcrumb-item v-else active>{{name_breadcrumb}}</b-breadcrumb-item>
    </b-breadcrumb>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "breadcrumb",
  components: { 
  },
  props: {
      name_breadcrumb: {
          type: String,
          default() {
          return {};
          }
      }

  },
  computed: {
    ...mapGetters(["PRODUCT"])
  },

}
</script>