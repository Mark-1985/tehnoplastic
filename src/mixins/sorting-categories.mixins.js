
export default {
  data() {
    return {
      
    }
  },
  async mounted() {
  },
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
      if (this.$route.path === "/shop" || this.$route.path === "/shop/") {
        this.$router.push({ path: "/shop" });
      }
      this.$route.query.page = 1;
      this.currentPage = 1;
      this.GET_PRODUCTS_FROM_API(this.$route.query.page).then(response => {
        if (response.data) {
          this.show = true;
        }
      });

      //this.sortingCategories = this.CATEGORY_ID;
      
      if (this.CATEGORY_ID === "" || this.CATEGORY_ID === null) {
        this.sortingCategories = "Выбрать категорию";
      } else {
        this.sortingCategories = this.CATEGORY_ID;
      }
    }
  }
};
