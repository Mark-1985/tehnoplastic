<template>
  <div class="container-lg">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      controls
      indicators
      :interval="3000"
    >
      <b-carousel-slide v-for="(product, index) in POP_PRODUCTS" v-bind:key="index"
        :img-src="product.images[0].src"
      ></b-carousel-slide>
    </b-carousel>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "slider",
    components: {},
    props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["POP_PRODUCTS"])
  },
  methods:{},
  mounted() { }
}
</script>

<style lang="scss">
.carousel{
  .carousel-inner {
    img {
      min-height: 245px;
      max-height: 550px;

    }
  }
}
</style>