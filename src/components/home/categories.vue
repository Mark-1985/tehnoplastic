<template>
  <div class="categories container-lg py-3">
    <h1 class="my-3 text-center">Категории товаров</h1>
    <div class="row">
      <div v-if="show" class="w-100 text-center my-3 text-primary">
        <b-spinner option="primary" label="Text Centered"></b-spinner>
      </div>

      <div
        v-for="category in CATEGORIES"
        :key="category.id"
        class="card-body col-12 col-sm-6 col-md-3 py-1"
        @click="toProducts(category.id)"
      >
        <div class="card border-0">
          <img :src="category.image.src" class="card-img-top img-fluid border-1 p-2" :alt="category.name" />
          <div class="card-body pl-0">
            <div class="h5 card-title text-left text-uppercase">{{category.name}}</div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "categories",
  components: {},
  props: {},
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapGetters(["CATEGORIES"])
  },
  methods: {
    ...mapActions(["GET_CATEGORIES_FROM_API", "GET_ID_CATEGORIES_TO_VUEX", "GET_PRODUCTS_FROM_API"]),

    toProducts(value) {
      this.GET_ID_CATEGORIES_TO_VUEX(value);
      this.GET_PRODUCTS_FROM_API().then(response => {
        if (response.data) {
          this.$router.push('/shop');
        }
      })
    }
  },
  mounted() {
    this.GET_CATEGORIES_FROM_API().then(response => {
      if (response.data) {
        this.show = false;
      }
    });
  }
};
</script>

<style lang="scss">
.categories {
  .card-body {
    
    &:hover {
      cursor: pointer;
      img {
        transition: all 0.1s ease-out;
        transform: scale(1.02);
        //border: red solid 3px;
      }
      
    }

    .card {
      img {
        height: 278px;
        object-fit: cover;
        border: rgb(189, 183, 183) solid 1px;
      }

      .card-title {
        color: #f45a40;
      }
    }
  }
}
</style>