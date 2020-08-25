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
        @addToCart="addToCart"
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
  props: {},
  data() {
    return {
      lineItems: [],
      show: true
    };
  },
  computed: {
    ...mapGetters(["NEW_PRODUCTS", "CART", "LSTOREG"])
  },
  methods: {
    ...mapActions(["GET_NEW_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    //метод для получения даных из локального хранилища
    getToCart() {
      const $itemProduct = localStorage.getItem(this.LSTOREG);
      if ($itemProduct !== null) {
        return JSON.parse($itemProduct);
      }
      return [];
    },    
    //метод обновления корзины
    updateTocart(data) {
      this.lineItems = this.getToCart();
      //существует продукт или нет в хранилище
      const $index = this.lineItems.find(item =>
        item.product_id == data.id ? true : false
      );
      //действие если существует в хранилище
      if (!$index) {
        var $orders = {
          product_id: data.id,
          quantity: 1
        };
        this.lineItems.push($orders);
        let $parse = JSON.stringify(this.lineItems);
        return localStorage.setItem(this.LSTOREG, $parse);
      }
      if ($index) {
        //действие если не существует в хранилище
        this.lineItems.find(item =>
          item.product_id == data.id ? ++item.quantity : ""
        );
        let $parse = JSON.stringify(this.lineItems);
        return localStorage.setItem(this.LSTOREG, $parse);
      }
    },
    //метод добавления в хранилище
    addToCart(data) {
      this.updateTocart(data);
      this.ADD_TO_CART(data);
    }
  },
  mounted() {
    this.GET_NEW_PRODUCTS_FROM_API().then(response => {
      if (response.data) {
        this.show = false;
        /*               let vm = this;
              this.PRODUCTS.map(function (item) {
                if (item.type === 'variable' && vm.popProducts.length <= 3) {
                  vm.popProducts.push(item);
                }
              })
 */
      }
    });
  }
};
</script>

<style lang="scss">
</style>