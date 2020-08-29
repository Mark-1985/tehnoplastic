
export default {
  watch: {
    // отслеживание сортировок по категориям
    sortingCategories: function() {
      if (this.sortingCategories != this.CATEGORY_ID) {
        this.GET_ID_CATEGORIES_TO_VUEX(this.sortingCategories);
      }
    },
    // отслеживание изменения id категории
    CATEGORY_ID: function () {
      this.show = false;
      this.$route.query.page = 1;
      this.currentPage = 1;
      this.GET_PRODUCTS_FROM_API(this.$route.query.page).then(response => {
        if (response.data) {
          this.show = true;
          if (this.CATEGORY_ID != null) {
            this.GET_CATEGORY_SLUG_TO_VUEX(this.PRODUCTS[0].categories[0].slug);
            this.$router.push({
              name: "Каталог",
             params: { shop: this.PRODUCTS[0].categories[0].slug }
            });
          } else {
            this.$router.push({
              name: "Каталог",
              params: { shop: 'all-categories' }
            });
          }
        }
      });
      
      this.sortingCategories = this.CATEGORY_ID;
    }
  }
};
