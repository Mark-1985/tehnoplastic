<template>
  <b-container fluid="lg" class="v-catalog">    
    <h1 class="text-center">Каталог товаров и услуг</h1>
    <b-row cols="6" class="justify-content-between px-1 px-md-3 mb-2">

      <select class="col-6 col-sm-4 col-md-4 col-lg-2 custom-select" 
              v-model="sortingCategories"
              style="max-height: 30px; font-size: 0.75rem;">
          <option value="null">Выбрать категорию</option>
          <option v-for="(row, index) in CATEGORIES" :key="index" :value="row.id">{{row.name}}</option>
      </select>

    </b-row>

    <div v-if="show === false" class="w-100 text-center my-3 text-primary">
      <b-spinner option="primary" label="Text Centered"></b-spinner>
    </div>

    <div v-if="this.show === true" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 pt-4 px-md-2">
      <!--Передали даные с дочернему елементу с помощю v-bind -->
      <v-catalog-item
        v-for="product in PRODUCTS"
        :key="product.id"
        :product_data="product"
        @addToCart="addToCart"
      ></v-catalog-item>
    </div>
    <b-pagination-nav
      @change="nextPage"
      :link-gen="linkGen"
      :number-of-pages="ROWS"
      use-router
      first-number
      last-number
      align="center"
    ></b-pagination-nav>
  </b-container>
</template>

<script>
import VCatalogItem from "./v-catalog-item";
import { mapActions, mapGetters } from "vuex";
import md5 from "md5";
import paginationMixin from "@/mixins/pagination.mixins";
import sortingCatalogMixin from "@/mixins/sorting-catalog.mixins";
import sortingCategoriesMixin from "@/mixins/sorting-categories.mixins";

export default {
  name: "v-catalog",
  mixins: [paginationMixin, sortingCatalogMixin, sortingCategoriesMixin],
  components: { 
    VCatalogItem 
  },
  props: {},
  data() {
    return {
      lineItems: [],
      currentPage: null,
      show: false
    };
  },
  created() {},
  computed: {
    ...mapGetters([
      "SEARCH_VALUE",
      "PRODUCTS",
      "CART",
      "ROWS",
      "CATEGORY_ID",
      "CATEGORIES",
      "ORDERS",
      "LSTOREG"
    ])
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "GET_ID_CATEGORIES_TO_VUEX",
      "GET_SORTING_OPTIONS_TO_VUEX",
      "ADD_TO_CART",
      "GET_CART_FROM_API"
    ]),
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
      //действие если не существует в хранилище
      if (!$index) {
        var $orders = {
          product_id: data.id,
          quantity: 1
        };
        this.lineItems.push($orders);
        let $parse = JSON.stringify(this.lineItems);
        this.cart_hash = JSON.stringify(md5($parse));
        localStorage.setItem('cart_hash', this.cart_hash);
        return localStorage.setItem(this.LSTOREG, $parse);
      }
      if ($index) {
        //действие если существует в хранилище
        this.lineItems.find(item =>
          item.product_id == data.id ? ++item.quantity : ""
        );
        let $parse = JSON.stringify(this.lineItems);
        this.cart_hash = JSON.stringify(md5($parse));
        localStorage.setItem('cart_hash', this.cart_hash)  
        return localStorage.setItem(this.LSTOREG, $parse);
      }
    },
    //метод добавления в хранилище
    addToCart(data) {
      this.updateTocart(data);
      this.ADD_TO_CART(data);
    },
    nextPage() {
      this.show = false;
      this.GET_PRODUCTS_FROM_API(this.$route.query.page).then(response => {
        if (response.data) {
          if (this.$route.query.page) {
            this.currentPage = this.$route.query.page;
            this.show = true;
          } else {
            this.currentPage = 1;
          }
        }
      });
    }
  },
  async mounted() {
    if (this.$route.fullPath === "/shop" || this.$route.fullPath === "/shop/") {
      this.$set(this.$route.query, "page", 1);
    }
    this.GET_PRODUCTS_FROM_API(this.$route.query.page).then(response => {
      if (response.data) {
        if (this.$route.query.page) {
          this.currentPage = this.$route.query.page;
          this.show = true;
        } else {
          this.currentPage = 1;
        }
      }
    });
  },
  watch: {
    // отслеживание изменения route
    $route: function() {
      //добавить страницу оплата и доставка
      if (this.$route.path === "/" || this.$route.path === "/blog/") {
        this.sortingCatalog = { orderby: null, order: null };
        this.sortingCategories = null;
      }
      if (
        this.$route.fullPath === "/shop" ||
        this.$route.fullPath === "/shop/"
      ) {
        this.$set(this.$route.query, "page", 1);
      }
    }
  }
};
</script>

<style lang="scss">
.v-catalog {
  .breadcrumb {
    background-color: #fff;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  &__link_to_cart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: $padding * 2;
    border: solid 1px #aeaeae;
  }
}
</style>