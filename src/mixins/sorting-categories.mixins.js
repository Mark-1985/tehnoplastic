
export default {
  data() {
    return {
      sortingCategories: null,
      optionsCategories: [
        { value: null, text: "Выбрать категорию" },
        { value: 36, text: "Мужские" },
        { value: 33, text: "Женские" },
        { value: 39, text: "Детские" },
        { value: 53, text: "Колготы детские" }
      ],
      sortingSubCategories: null,
      optionsSubCategories: [{ value: null, text: "Сезон" }],

      maleSortingSubCategories: null,
      maleOptionsSubCategories: [
        { value: null, text: "Сезон" },
        { value: 38, text: "Зима" },
        { value: 37, text: "Весна - осень" },
        { value: 73, text: "Лето" }
      ],
      femaleSortingSubCategories: null,
      femaleOptionsSubCategories: [
        { value: null, text: "Сезон" },
        { value: 35, text: "Зима" },
        { value: 34, text: "Весна - осень" },
        { value: 69, text: "Лето" }
      ],
      babySortingSubCategories: null,
      babyOptionsSubCategories: [
        { value: null, text: "Сезон" },
        { value: 41, text: "Зима" },
        { value: 40, text: "Весна - осень" },
        { value: 70, text: "Лето" }
      ]
    }
  },
  async mounted() {
  },
  watch: {
    // отслеживание сортировок по категориям и под категориям
    sortingCategories: function() {
      if (this.sortingCategories != this.CATEGORY_ID) {
        this.GET_ID_CATEGORIES_TO_VUEX(this.sortingCategories);
      }
    },
    maleSortingSubCategories: function() {
      this.GET_ID_CATEGORIES_TO_VUEX(this.maleSortingSubCategories);
      if (this.maleSortingSubCategories === null) {
        this.GET_ID_CATEGORIES_TO_VUEX(this.sortingCategories);
      }
    },
    femaleSortingSubCategories: function() {
      this.GET_ID_CATEGORIES_TO_VUEX(this.femaleSortingSubCategories);
      if (this.femaleSortingSubCategories === null) {
        this.GET_ID_CATEGORIES_TO_VUEX(this.sortingCategories);
      }
    }, 
    babySortingSubCategories: function() {
      this.GET_ID_CATEGORIES_TO_VUEX(this.babySortingSubCategories);
      if (this.babySortingSubCategories === null) {
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

      if (this.CATEGORY_ID === 36) {
        this.sortingCategories = this.CATEGORY_ID;
      }
      if (this.CATEGORY_ID === 33) {
        this.sortingCategories = this.CATEGORY_ID;
      }
      if (this.CATEGORY_ID === 39) {
        this.sortingCategories = this.CATEGORY_ID;
      }
      if (this.CATEGORY_ID === 53) {
        this.sortingCategories = this.CATEGORY_ID;
      }
      if(this.CATEGORY_ID === "") {
        this.sortingCategories = null;
      }
    }
  }
};
