<template>
  <div class="v-catalog-item col mb-4 px-1">
    <div
      class="card h-100"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      :class="{ shadow: hover === true }"
    >
      <img
        @click="toProduct(product_data)"
        :src="product_data.images[0].src"
        class="mx-auto d-block w-100 p-2"
        :alt="product_data.name"
        :style="{ 'object-fit': 'cover', height:'220px'}"
      />
      <div class="card-body d-flex align-items-start flex-column bd-highlight">
        <h6 class="text-center mb-auto text-muted bd-highlight w-100">{{product_data.name}}</h6>
        <div class="mx-auto my-4">
          <!-- Price -->
          <div v-if="product_data.price_html != ''" class="text-center text-sm-left mb-4 pl-0">
            <h4 class="font-weight-bold" v-html="'от '+ product_data.price_html"></h4>
          </div>
        </div>
        <b-button
          block
          variant="primary bd-highlight"
          @click="toProduct(product_data)"
        >
          Подробнее
        </b-button>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      hover: false
    };
  },
  methods: {
    ...mapActions(["GET_PRODUCT_SLUG_TO_VUEX", "GET_PRODUCT_FROM_API"]),
    toProduct() {
      this.GET_PRODUCT_SLUG_TO_VUEX(this.product_data.slug);
      this.GET_PRODUCT_FROM_API().then(response => {
        if (response.data) {
          const slug = this.product_data.slug;
          if ( this.product_data.attributes.length ) {
            this.$router.push({
              name: "product",
              params: { product: slug }
            });
          } else if ( !this.product_data.attributes.length ) {
            this.$router.push({ name: "product", params: { product: slug } });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.v-catalog-item {
  .card {
    transition: all 0.1s ease-out;
    &:hover {
      cursor: pointer;
      transform: scale(1.02);
    }
  }
}
</style>