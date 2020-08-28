<template>
  <div class="new-products container py-3">
    <h1 class="text-center" v-pre>Новые товары</h1>
    <div class="row">
        <div v-if="show" class="w-100 d-block text-center my-3 text-primary">
          <b-spinner option="primary" label="Text Centered"></b-spinner>
        </div>
    </div>
    <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
      <v-catalog-item
        v-for="product in NEW_PRODUCTS"
        :key="product.id"
        v-bind:product_data="product"
      ></v-catalog-item>
    </div>
  </div>
</template>

<script>
import { BSpinner } from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "new-products",
  components: {
    VCatalogItem: () => import("@/components/catalog/v-catalog-item"),
    BSpinner
  },
  data() {
    return {
      lineItems: [],
      show: true
    };
  },
  computed: {
    ...mapGetters(["NEW_PRODUCTS"])
  },
  methods: {
    ...mapActions(["GET_NEW_PRODUCTS_FROM_API"]),
  },
  async mounted() {
    this.GET_NEW_PRODUCTS_FROM_API().then(response => {
      if (response.data) {
        this.show = false;
      }
    });
  }
};
</script>