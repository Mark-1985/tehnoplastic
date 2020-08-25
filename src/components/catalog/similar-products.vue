<template>
  <div class="similar-products container-lg py-4">
      <h1 class="mt-4">Похожие товары</h1>
        
        <div v-if="show" class="w-100 text-center my-3 text-primary"> 
          <b-spinner  option="primary" label="Text Centered"> </b-spinner> 
        </div>
        <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 pt-4">
          <v-catalog-item v-for="product in SIMILAR_PRODUCTS" :key="product.id" :product_data="product"></v-catalog-item>
        </div>
  </div>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import { mapActions, mapGetters } from "vuex"

export default {
    name: "similar-products",
    components: { 
      VCatalogItem: ()=>import ('@/components/catalog/v-catalog-item'),
      BSpinner 
    },
    props: {
      category_id: {
        type: Number,
        default() {
          return {};
        }
      }
    },
  data() {
    return {
      show: true
    };
  },
  computed: { 
    ...mapGetters(["CART", "SIMILAR_PRODUCTS"]),
  },
  methods:{
    ...mapActions(["GET_SIMILAR_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    }

  },
  mounted() {
    this.GET_SIMILAR_PRODUCTS_FROM_API(this.category_id).then(response => {
      if (response.data) {
        this.show = false;
      }
    });
  },
  watch: {
    category_id: function(){
      this.GET_SIMILAR_PRODUCTS_FROM_API(this.category_id);
     }
  }
}
</script>

<style lang="scss">

</style>