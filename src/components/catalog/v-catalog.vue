<template>
  <b-container fluid="lg" class="v-catalog">    
    <h1 class="text-center">Каталог</h1>
    <b-row cols="6" class="justify-content-between px-1 px-md-3 mb-2">

      <b-form-select v-model="sortingCatalog" 
                    :options="sortingOptions" 
                    size="sm" 
                    class="col-6 col-sm-4 col-md-3 col-lg-2">
      </b-form-select>
      
      <div class="col-6 col-md-5 col-lg-4 d-flex flex-column flex-sm-row pr-0">
        <b-form-select
          v-model="sortingCategories"
          :options="optionsCategories"
          class="mr-2"
          size="sm"
        ></b-form-select>
        <b-form-select class="mt-2 mt-sm-0"
          v-if="sortingCategories === null"
          v-model="sortingSubCategories"
          :options="optionsSubCategories"
          size="sm"
        ></b-form-select>

        <b-form-select class="mt-2 mt-sm-0"
          v-if="sortingCategories === 36"
          v-model="maleSortingSubCategories"
          :options="maleOptionsSubCategories"
          size="sm"
        ></b-form-select>
        <b-form-select class="mt-2 mt-sm-0"
          v-if="sortingCategories === 33"
          v-model="femaleSortingSubCategories"
          :options="femaleOptionsSubCategories"
          size="sm"
        ></b-form-select>
        <b-form-select class="mt-2 mt-sm-0"
          v-if="sortingCategories === 39"
          v-model="babySortingSubCategories"
          :options="babyOptionsSubCategories"
          size="sm"
        ></b-form-select>
      </div>
    </b-row>

    <div v-if="show === false" class="w-100 text-center my-3 text-primary">
      <b-spinner option="primary" label="Text Centered"></b-spinner>
    </div>

    <div v-if="this.show === true" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 pt-4">
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