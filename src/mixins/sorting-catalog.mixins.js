
export default {
  data() {
    return {
      sortingCatalog: { orderby: null, order: null },
      sortingOptions: [
        { value: { orderby: null, order: null }, text: "Исходная сортировка" },
        { value: { orderby: "date", order: "desc" }, text: "По популярности" },
        { value: { orderby: "date", order: "asc" }, text: "По более позднему" },
        { value: { orderby: "price", order: "asc" }, text: "Цена по возростанию" },
        { value: { orderby: "price", order: "desc" }, text: "Цена по убыванию" }
      ],

    }
  },
  async mounted() {
    if (this.CATEGORY_ID === 36) {
      this.sortingCategories = this.CATEGORY_ID;
    }
    if (this.CATEGORY_ID === 33) {
      this.sortingCategories = this.CATEGORY_ID;
    }
    if (this.CATEGORY_ID === 39) {
      this.sortingCategories = this.CATEGORY_ID;
    }
  },
  watch: {
    // отслеживание сортировок товаров по дате, популярности и стоимости
    sortingCatalog: function() {
      if( this.$route.path === "/shop" || this.$route.path === "/shop/" ) {
        this.$router.push({path: "/shop"});
      }
      this.show = false;
      this.$route.query.page = 1;
      this.currentPage = 1;
      this.GET_SORTING_OPTIONS_TO_VUEX(this.sortingCatalog);
      this.GET_PRODUCTS_FROM_API(this.$route.query.page).then(response => {
        if (response.data) {
            this.show = true;
        }
      });
    },
  }
};
