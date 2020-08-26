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
<!--           <h4 class="card-text font-weight-bold">{{product_data.price}} грн.</h4>
 -->        
        </div>
<!--         <b-button
          class="btn_buy"
          block
          variant="primary bd-highlight"
          @click="addToCart"
          
        >
          Купить
           <svg-icon name="shopping-cart" style="width: 1.4em; height: 1.4em"></svg-icon>
        </b-button>
 -->
        <b-button
          class="btn_look"
          block
          variant="primary bd-highlight"
          @click="toProduct(product_data)"
        >
          Подробнее
          <!-- <svg-icon name="redo"></svg-icon> -->
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
  computed: {},
  methods: {
    ...mapActions(["GET_PRODUCT_SLUG_TO_VUEX", "GET_PRODUCT_FROM_API"]),
    makeToast(variant = null, toaster, append = false) {
      let $price = this.product_data.price;
      this.$bvToast.toast(this.product_data.name, {
        title: `Товар добавлен, по цене ${$price} грн`,
        variant: variant,
        toaster: toaster,
        solid: true,
        appendToast: append,
        autoHideDelay: 500
      });
    },
    addToCart() {
      this.$emit("addToCart", this.product_data);
      this.makeToast("info", "b-toaster-bottom-left", true);
    },
    toProduct() {
      this.GET_PRODUCT_SLUG_TO_VUEX(this.product_data.slug);
      this.GET_PRODUCT_FROM_API().then(response => {
        if (response.data) {
          const slug = this.product_data.slug;
          if (
            this.product_data.attributes.length &&
            this.product_data.attributes[0].name === "цвет"
          ) {
            const colour = this.product_data.attributes[0].options[0];
            this.$router.push({
              name: "product",
              params: { product: slug },
              query: { colour: colour }
            });
          } else if (
            !this.product_data.attributes.length ||
            this.product_data.attributes[0].name != "цвет"
          ) {
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
    .card-body {
      .btn_buy {
        svg {
          fill: url(#svgicon_shopping-cart_a);
        }
      }
      .btn_look {
        svg {
          fill: rgb(255, 231, 13);
        }
      }
    }
  }
}
</style>