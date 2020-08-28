<template>
  <div class="product-vue container-lg  mt-3">
    <b-card
      v-if="PRODUCT != '' "
      no-body
      class="overflow-hidden border-0 p-2"
    >
    <div class="text-center text-sm-left px-3">
      <h2 class="mb-4 font-weight-bold">{{PRODUCT[0].name}}</h2>
    </div>
    <!-- left gallery--> 
      <b-row class="justify-content-around">
        <b-col sm="2" class="left_slide overflow-auto d-none d-lg-block p-2" style="max-height: 502px; max-width: 115px">
          <div v-for="(img, index) in PRODUCT[0].images" :key="index" class="left_slide__item ">
            <img @click="clickImg(index)"
                :src="img.src"
                :alt="PRODUCT[0].name"
                :class="{ active: index === isActive }"
                class="d-block mx-auto img-fluid p-2"
            />
          </div>
        </b-col>
        <!-- big gallery-->        
        <b-col class="col-12 p-0" sm="4">
          <div
            id="carouselExampleIndicators"
            class="carousel slide px-sm-0"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <LightGallery
                :images="images"
                :index="indexGallery"
                :disable-scroll="true"
                @close="indexGallery = null"
              />

              <div
                v-for="(img, thumbIndex) in PRODUCT[0].images"
                :key="thumbIndex"
                :class="{ active: thumbIndex === isActive }"
                @click="indexGallery = thumbIndex"
                class="carousel-item"
              >
                <img :src="img.src" :alt="PRODUCT[0].name" class="d-block w-100" style="height: 300px" />
              </div>
            </div>
            <a @click="prevImg" class="carousel-control-prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a @click="nextImg" class="carousel-control-next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <!-- bottom gallery-->
          <div class="bottom_slide d-flex justify-content-center overflow-auto d-lg-none p-2 mt-1" style="height: 135px; ">
            <div v-for="(img, index) in PRODUCT[0].images" :key="index" class="bottom_slide__item" style="min-width: 90px;">
              <img @click="clickImg(index)"
                  :src="img.src"
                  :alt="PRODUCT[0].name"
                  :class="{ active: index === isActive }"
                  class="d-block mx-auto img-fluid p-2"
              />
            </div>
          </div>
        </b-col>
        <!-- content--> 
        <b-col sm="8" md="6">
          <b-card-body class="pt-0">
            <div class="border-bottom mt-4 mt-sm-0 mb-2 text-center text-sm-left" v-html="PRODUCT[0].short_description"></div>
            <div class="d-flex flex-column flex-sm-row justify-content-sm-between text-center">
              <p class="d-none d-sm-block text-muted mb-1">Цена:</p>
              <p class="in_stock text-success px-1 mb-1">
                <svg-icon name="correct" style="width: 1.3em; height: 1.3em;"></svg-icon>
                Под заказ
              </p>
            </div>
            <!-- Price -->
            <div class="text-center text-sm-left mb-4 pl-0 text-danger">
              <h2 v-if="PRODUCT[0].price" class="font-weight-bold" v-html="'от '+ PRODUCT[0].price_html"></h2>
            </div>
            <!-- Description -->
            <p class="text-muted">Описание:</p>
            <div class="product_description" v-html="PRODUCT[0].description"></div>
            <hr>

            <div class="col-12 align-items-center px-0 py-5 mx-auto">
              <h2 class="w-100 text-center">Все детали по телефону:</h2>

              <a
                v-if="this.CUSTOMERS != ''"
                :href="'tel:' + this.CUSTOMERS.billing.phone"
                class="d-block h2 text-decoration-none text-muted text-center my-3"
              >
                <b-icon-telephone class="mr-2"></b-icon-telephone>
                <span class>{{this.CUSTOMERS.billing.phone}}</span>
              </a>

            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <similar-products v-if="PRODUCT !=''" :category_id="PRODUCT[0].categories[0].id"></similar-products>
  </div>
</template>

<script>
import {BIconTelephone,} from "bootstrap-vue";
import { mapGetters, mapActions } from "vuex";
import { LightGallery } from "vue-light-gallery";

export default {
  name: "product",
  components: {
    BIconTelephone,
    LightGallery,
    SimilarProducts: () => import("@/components/catalog/similar-products"),
  },
  props: {},
  data() {
    return {
      title: "product",
      isActive: "",
      images: [],
      indexGallery: null,
      hover_cart: false,
      hover_buy: false,
    };
  },
  computed: {
    ...mapGetters(["PRODUCT", "PRODUCT_SLUG", "CUSTOMERS"])
  },
  methods: {
    ...mapActions([
      "GET_PRODUCT_SLUG_TO_VUEX",
      "GET_PRODUCT_FROM_API"
    ]),
    nextImg() {
      if (this.isActive < this.PRODUCT[0].images.length) {
        this.isActive++;
      }
      if (this.isActive === this.PRODUCT[0].images.length) {
        this.isActive = 0;
      }
    },
    prevImg() {
      if (this.isActive != -1) {
        this.isActive--;
      }
      if (this.isActive === -1) {
        this.isActive = this.PRODUCT[0].images.length - 1;
      }
    },
    clickImg(value) {
      this.isActive = value;
    },
  },
  async mounted() {
    this.isActive = 0;
    let $wLoc = window.location.href;
    let  $slug = $wLoc.split('?')[0].split('/product/')[1]
      if ($slug) {
        this.GET_PRODUCT_SLUG_TO_VUEX($slug);
      } else {
        this.$router.push({ path: "/shop/" });
      }
    this.GET_PRODUCT_FROM_API().then(response => {
      if (response.data) {
        let vm = this;
        this.PRODUCT[0].images.map(function(img) {
          vm.images.push(img.src);
        });
      } else {
        this.$router.push({ path: "/shop/" });
      }
    });
  },
  watch: {
    $route: function() {
      this.isActive = 0;
    },
    PRODUCT: function() {
      let vm = this;
      this.images.splice(0);
      this.PRODUCT[0].images.map(function(img) {
          vm.images.push(img.src);
        });
    }
  }
};
</script>

<style lang="scss">
.product-vue {
  .left_slide::-webkit-scrollbar {
    width: 3px;
    background-color: #ececec;
  }
  .bottom_slide::-webkit-scrollbar {
    height: 3px;
    background-color: #ececec;
  }
  ::-webkit-scrollbar-thumb {
    width: 3px;
    background-image: -webkit-linear-gradient(#F5F5F5, #8A8A8A);
  }
  .left_slide {
    &__item{
      .active {
        border: black solid 1px;
        padding: 2px !important;
      }
      img {
        height: rem-calc(120px);
        cursor: pointer;
      }
    }
  }
  .bottom_slide {
    &__item{
      .active {
        border: black solid 1px;
        padding: 2px !important;
      }
      img {
        height: rem-calc(120px);
        cursor: pointer;
      }
    }
  }
  #carouselExampleIndicators {
    .carousel-inner {
      .carousel-item {
        img {
          cursor: pointer;
        }
      }
    }
  }
  .card-body {
    .product_description {
      ul {
        margin-left: 0;
        padding-left: 0;
        li {
          padding-left: 1.3rem;
          list-style: none;
          font-size: rem-calc(14px);
          position: relative; 
          &::before {
            content: ' ';
            background: url(../../assets/images/tick.svg);
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            position: absolute;
            left: 0;
            top: 5%;
            width: 15px;
            height: 15px;
          }
        }
      }
      p {
        display: none;
      }
    }
    .b-form-spinbutton {
      width: 115px;
    }
    .in_stock {
      svg {
        fill: $green;
      }
    }
  }
}
</style>

