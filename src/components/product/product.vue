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
                <img :src="img.src" :alt="PRODUCT[0].name" class="d-block w-100" />
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
              <p class="text-muted">Артикул: {{PRODUCT[0].sku}}</p>
              <p class="in_stock text-success px-1">
                <svg-icon name="correct" style="width: 1.3em; height: 1.3em;"></svg-icon>
                Под заказ
              </p>
            </div>
            <!-- Price -->
            <div class="text-center text-sm-left mb-4 pl-0">
              <h2 v-if="PRODUCT[0].price" class="h2 text-danger font-weight-bold">от {{PRODUCT[0].price}} грн.</h2>
            </div>
            <!-- Description -->
            <div class="product_description" v-html="PRODUCT[0].description"></div>
            <hr>
            <div class="row">
              <div class="col-12 d-flex flex-column mb-4 mx-auto">
                <!-- Count -->
<!--                 <div class="col-12 col-sm-6 col-md-5 px-0 text-center text-sm-left">
                  <b-input-group size="md">
                    <b-input-group-prepend>
                      <b-btn variant="info" @click="decrement">-</b-btn>
                    </b-input-group-prepend>
                    <b-form-input class="text-center" type="number" min="0" v-model="countProduct" :value="countProduct"></b-form-input>
                    <b-input-group-append>
                      <b-btn variant="info" @click="increment">+</b-btn>
                    </b-input-group-append>
                  </b-input-group>
                </div>
 -->              
              </div>
            </div>

            <div class="col-12 col-sm-12 d-flex d-flex flex-column flex-sm-row justify-content-between align-items-center px-0 py-5 mx-auto">
              <b-button @click="addToCart(PRODUCT[0])"
                        @mouseenter="hover_cart = true"
                        @mouseleave="hover_cart  = false" 
                        variant="outline-info btn_to_cart mr-0 mr-sm-4 mb-2 mb-sm-0 w-100">В корзину
                <svg-icon name="shopping-cart"
                          :class="{ hover_svg: hover_cart === true }" 
                          style="width: 1.4em; height: 1.4em"></svg-icon>
              </b-button>
              <b-button @mouseenter="hover_buy = true"
                        @mouseleave="hover_buy = false" 
                        variant="outline-info btn_one_click w-100" class="d-none">Купить в один клик
                <svg-icon name="click" 
                          style="width: 1.4em; height: 1.4em"
                          :class="{ hover_svg: hover_buy === true }"></svg-icon>
              </b-button>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

    <similar-products v-if="PRODUCT !=''" :category_id="PRODUCT[0].categories[0].id"></similar-products>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { LightGallery } from "vue-light-gallery";

export default {
  name: "product",
  components: {
    LightGallery,
    SimilarProducts: () => import("@/components/catalog/similar-products"),
  },
  props: {},
  data() {
    return {
      title: "product",
      countProduct: 1,
      isActive: "",
      size: null,
      images: [],
      indexGallery: null,
      hover_cart: false,
      hover_buy: false,
      sizeProduct: 'Размер'
    };
  },
  computed: {
    ...mapGetters(["PRODUCT", "PRODUCT_SLUG", "CART", "LSTOREG"])
  },
  methods: {
    ...mapActions([
      "GET_PRODUCT_SLUG_TO_VUEX",
      "GET_PRODUCT_FROM_API",
      "ADD_TO_CART",
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
    makeToast(variant = null, toaster, append = false) {
      let $price = this.PRODUCT[0].price;
      this.$bvToast.toast(this.PRODUCT[0].name, {
        title: `Товар добавлен, по цене ${$price} грн`,
        variant: variant,
        toaster: toaster,
        solid: true,
        appendToast: append,
        autoHideDelay: 500
      });
    },
    //метод для получения даных из локального хранилища
    getToCart() {
      const $itemProduct = localStorage.getItem(this.LSTOREG);
      if ($itemProduct !== null) {
        return JSON.parse($itemProduct);
      }
      return [];
    },
    //метод обновления корзины
    updateTocart(data){
      this.lineItems = this.getToCart();  
      //существует продукт или нет в хранилище
      const $index = this.lineItems.find(item =>
        item.product_id == data.id ? true : false
      );
      //действие если не существует в хранилище
      if (!$index) {
        var $orders = {
          product_id: data.id,
          quantity: this.countProduct,
        };
        this.lineItems.push($orders);
        let $parse = JSON.stringify(this.lineItems);
        return localStorage.setItem(this.LSTOREG, $parse);
      } 
      if($index) {
        //действие если существует в хранилище
        this.lineItems.find(item =>
          item.product_id == data.id
            ? (item.quantity = item.quantity + this.countProduct)
            : ""
        );
        let $parse = JSON.stringify(this.lineItems);
        return localStorage.setItem(this.LSTOREG, $parse);
      }
    },
    //метод добавления в хранилище
    addToCart(data) { 
      this.makeToast("info", "b-toaster-bottom-left", true);
      this.updateTocart(data);       
      this.ADD_TO_CART(data);      
    },
    increment() {
      this.countProduct++;
    },
    decrement() {
      if (this.countProduct > 1) {
        this.countProduct--;
      }
    },
  },
  mounted() {
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
        //this.$route.name = this.PRODUCT[0].name;
        //this.$router.query.push(this.PRODUCT[0].name);
        document.querySelector('.breadcrumb-item > span').textContent = this.PRODUCT[0].name;
        //console.log(elements);
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
    .btn_to_cart,
    .btn_one_click {
      min-width: 200px;
      .hover_svg {
          fill: #fff;
      }
      svg {
        fill: url(#svgicon_shopping-cart_a);
      }
    }
  }
}
</style>

