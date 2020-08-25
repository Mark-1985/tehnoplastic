<template>
  <footer class="footer bg-dark">
    <div class="container-lg py-10">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <h5>Наш товар:</h5>
          <hr class="mt-1 bg-white" />
          <div v-if="data" class="font-size-14 text-muted" v-html="data.excerpt.rendered"></div>
        </div>

        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
          <h5>Категории товаров:</h5>
          <hr class="mt-1 bg-white" />
          <a
            v-for="category in CATEGORIES"
            :key="category.id"
            @click="toProducts(category.id)"
            href="#"
            class="d-block font-size-14 text-decoration-none text-muted my-2"
          >
            <b-icon-folder class="mr-1"></b-icon-folder>
            {{category.name}}
          </a>
        </div>

        <div class=" col-md-4 col-lg-3 mb-3">
          <h5>Контакты:</h5>
          <hr class="mt-1 bg-white" />
          <a
            v-if="this.adress != ''"
            href="#"
            class="d-block font-size-14 text-decoration-none text-muted my-2"
          >
            <b-icon-house-door class="mr-2"></b-icon-house-door>
            <span class>{{this.adress.title.rendered}}</span>
          </a>
          <a
            v-if="this.CUSTOMERS != ''"
            :href="'tel:' + this.CUSTOMERS.billing.phone"
            class="d-block font-size-14 text-decoration-none text-muted my-2"
          >
            <b-icon-telephone class="mr-2"></b-icon-telephone>
            <span class>{{this.CUSTOMERS.billing.phone}}</span>
          </a>
          <a
            v-if="this.CUSTOMERS != ''"
            :href="'mailto:' + this.CUSTOMERS.billing.email"
            class="d-block font-size-14 text-decoration-none text-muted my-2"
          >
            <b-icon-envelope class="mr-2"></b-icon-envelope>
            <span class>{{this.CUSTOMERS.billing.email}}</span>
          </a>
        </div>

        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <h5>Найди свои носоки:</h5>
          <hr class="mt-1 bg-white" />
          <div class="social-network d-flex align-items-start flex-column">
            <b-navbar-nav>
              <b-nav-form v-on:submit.prevent="search(vModelValue)">
                <b-input-group class="mt-3">
                  <b-form-input
                    size="sm"
                    class="mr-sm-2"
                    v-model="vModelValue"
                    @change="search(vModelValue)"
                    placeholder="Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      size="sm"
                      class="btn-search"
                      @click="search(vModelValue)"
                      variant="info"
                    >
                      <svg-icon name="search"></svg-icon>
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-nav-form>
            </b-navbar-nav>

            <h6 class="text-center text-sm-left mt-5">Мы в социальных сетях:</h6>
            <div class="d-flex justify-content-center justify-content-sm-start  w-100 mb-10">
              <a href="#" class="mr-3 d-none">
                <img src="@/assets/images/footer/twitter.png" alt="twitter" width="30" />
              </a>
              <a href="#" class="mr-3">
                <img src="@/assets/images/footer/facebook.png" alt="facebook" width="30" />
              </a>
              <a href="#" class="mr-3">
                <img src="@/assets/images/footer/instagram.png" alt="instagram" width="30" />
              </a>
              <a href="#" class="mr-3 d-none">
                <img src="@/assets/images/footer/youtube.png" alt="youtube" width="30" />
              </a>
            </div>
            <iframe class="d-block img-fluid mx-auto" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.717012116844!2d34.5448150157003!3d49.58422677936526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d82f5bf7eaa52f%3A0xd1ab8aa1c6a12242!2z0YPQuy4g0KjQtdCy0YfQtdC90LrQviwgNDgsINCf0L7Qu9GC0LDQstCwLCDQn9C-0LvRgtCw0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgMzYwMDA!5e0!3m2!1sru!2sua!4v1596277487479!5m2!1sru!2sua"  frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid text-center py-5 bg-danger">
      <p class="text-white my-auto">© "Полтава" 2020</p>
    </div>
  </footer>
</template>

<script>
import {
  BIconFolder,
  BIconEnvelope,
  BIconHouseDoor,
  BIconTelephone,
} from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "footer-bottom",
  components: { BIconFolder, BIconEnvelope, BIconTelephone, BIconHouseDoor },
  props: {},
  data() {
    return {
      vModelValue: "",
      data: "",
      adress: "",
    };
  },
  computed: {
    ...mapGetters(["CATEGORIES", "CUSTOMERS"]),
  },
  methods: {
    ...mapActions([
      "GET_CATEGORIES_FROM_API",
      "GET_ID_CATEGORIES_TO_VUEX",
      "GET_PRODUCTS_FROM_API",
      "GET_SEARCH_VALUE_TO_VUEX",
    ]),

    toProducts(value) {
      this.GET_ID_CATEGORIES_TO_VUEX(value);
      this.GET_PRODUCTS_FROM_API().then((response) => {
        if (response.data) {
          this.$router.push("/shop");
        }
      });
    },
    search(value) {
      this.GET_SEARCH_VALUE_TO_VUEX(value);
      if (
        !this.$route.query.page &&
        this.$route.path != "/shop" &&
        this.$route.path != "/shop/"
      ) {
        this.$router.push("/shop");
        this.GET_PRODUCTS_FROM_API().then((response) => {
          if (response.data) {
            this.vModelValue = "";
          }
        });
      } else {
        this.$router.push({ fullPath: "/shop" });
        this.GET_PRODUCTS_FROM_API().then((response) => {
          if (response.data) {
            this.vModelValue = "";
          }
        });
      }
    },
  },
  async mounted() {
    axios
      .get("https://rubizhnesocks.pl.ua/wp-json/wp/v2/pages/124")
      .then((response) => (this.data = response.data))
      .catch((error) => console.log(error));

    axios
      .get("https://rubizhnesocks.pl.ua/wp-json/wp/v2/posts/1")
      .then((response) => (this.adress = response.data))
      .catch((error) => console.log(error));

    if (this.$route.path != "/") {
      this.GET_CATEGORIES_FROM_API();
    }
  },
};
</script>

<style lang="scss">
.footer {
  background: $gray-600;
  color: white;
  .navbar-nav {
    .form-inline {
      flex-flow: row;
    }
    .btn-search{
      svg{
        fill: white;
      }
    }
  }
}
</style>