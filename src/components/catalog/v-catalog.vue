<template>
  <b-container fluid="lg" class="v-catalog">    
    <h1 class="text-center">Каталог товаров и услуг</h1>
    <b-row cols="6" class="justify-content-between px-1 px-md-3 mb-2">

      <select class="col-6 col-sm-4 col-md-4 col-lg-2 custom-select" 
              v-model="sortingCategories"
              style="max-height: 30px; font-size: 0.75rem;">
          <option disabled>Выбрать категорию</option>
          <option :value="null">Все категории</option>
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
      ></v-catalog-item>
    </div>
    <b-pagination-nav
      v-if="this.ROWS > 1"
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
import paginationMixin from "@/mixins/pagination.mixins";
import sortingCategoriesMixin from "@/mixins/sorting-categories.mixins";
export default {
  name: "v-catalog",
  mixins: [paginationMixin, sortingCategoriesMixin],
  components: { 
    VCatalogItem 
  },
  data() {
    return {
      sortingCategories: 'Выбрать категорию',
      lineItems: [],
      currentPage: null,
      show: false
    };
  },
  computed: {
    ...mapGetters([
      "SEARCH_VALUE",
      "PRODUCTS",
      "ROWS",
      "CATEGORY_ID",
      "CATEGORIES",
    ])
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "GET_ID_CATEGORIES_TO_VUEX"
    ]),
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
