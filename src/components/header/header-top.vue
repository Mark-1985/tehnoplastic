
<template>
  <b-navbar toggleable="sm" type="light" variant="white" class="py-0">
    <b-container fluid="lg" class="my-2">
      <b-navbar-brand :href="url" class="mx-auto mx-sm-0 h1 text-uppercase mb-0">
        <img :src=" require('../../assets/logo.png') " alt="logo" height="50" />
      </b-navbar-brand>
      <b-navbar-nav class="flex-row text-center mx-auto mx-sm-0 ml-sm-auto">
        <b-nav-item :href="tophone" class="my-auto ml-3">
          <svg-icon class="mr-2" name="phone" width="1rem" height="1.5rem" />
          <span class="text-muted"></span>
          <span class="d-none d-lg-inline-block">{{phone}}</span>
        </b-nav-item>
        <b-nav-item :href="toemail" class="my-auto ml-3">
          <svg-icon class="mr-2" name="email" width="1rem" height="1.5rem" />
          <span class="text-muted"></span>
          <span class="d-none d-lg-inline-block">{{email}}</span>
        </b-nav-item>
      </b-navbar-nav>
      <div class="navbar-cart mx-auto mx-sm-0" @mousemove="openMinCart" @mouseleave="closeMinCart">
        <b-dropdown id="dropdown-right" right no-caret variant="outline-danger">
          <template v-slot:button-content>
            <svg-icon class="svg-fill_red mr-2" name="cart" width="1.5rem" height="1.5rem" />
            <span v-if="cartQuantity" class="mr-2">{{cartTotalCost}} грн.</span>
            <span class="text-uppercase" v-pre>Корзина</span>
          </template>
          <b-dropdown-text :class="'test'">
            <v-mini-cart :cart_data="CART"></v-mini-cart>
          </b-dropdown-text>
        </b-dropdown>
      </div>
    </b-container>
  </b-navbar>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "header-top",
  components: {
    VMiniCart: () => import("@/components/cart/v-mini-cart"),
  },
  props: {},
  data() {
    return {
      cart: [],
      phone: null,
      email: null,
      toemail: null,
      tophone: null,
      url: null,
      description: null,
      show_minCart: false,
    };
  },
  created() {
    this.cart = this.getToCart();
    this.cart.map((el) => {
      this.GET_CART_FROM_API(el.product_id);
    });
  },
  computed: {
    ...mapGetters(["CART", "LSTOREG", "CUSTOMERS"]),
    //подсчет общей стоимости
    cartTotalCost() {
      var result = [];
      if (this.CART.length) {
        this.CART.map((elem) => {
          result.push(elem.price * elem.quantity);
        });
        var $summ = result.reduce(function (sum, el) {
          return sum + el;
        });
        return $summ;
      }
      return 0;
    },
    cartQuantity() {
      var quantity = [];
      if (this.CART.length) {
        for (let item of this.CART) {
          quantity.push(item.quantity);
        }
        quantity = quantity.reduce(function (sum, el) {
          return sum + el;
        });
        return quantity;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions([
      "GET_CUSTOMERS_FROM_API",
      "GET_INFO_FROM_API",
      "GET_CART_FROM_API",
    ]),

    //метод для получения даных из локального хранилища
    getToCart() {
      const $itemProduct = localStorage.getItem(this.LSTOREG);
      if ($itemProduct !== null) {
        return JSON.parse($itemProduct);
      }
      return [];
    },
    openMinCart() {
      let el_1 = document.querySelector(".dropdown-menu");
      el_1.classList.add("show");
      el_1.classList.add("mt-0");
      let el_2 = document.querySelector(".dropdown-toggle");
      el_2.style.backgroundColor = "#f45a40";
      el_2.style.color = "#fff";
      let el_3 = document.querySelector("button > .svg-fill_red > path");
      el_3.style.fill = "#fff";
    },
    closeMinCart() {
      let el_1 = document.querySelector(".dropdown-menu");
      el_1.classList.remove("show");
      el_1.classList.remove("mt-0");
      let el_2 = document.querySelector(".dropdown-toggle");
      el_2.style.backgroundColor = "#fff";
      el_2.style.color = "#f45a40";
      let el_3 = document.querySelector("button > .svg-fill_red > path");
      el_3.style.fill = "#f45a40";
    },
  },
  async mounted() {
    this.GET_CUSTOMERS_FROM_API().then((response) => {
      if (response.data) {
        //console.log(response.data);
        this.phone = response.data.billing.phone;
        this.email = response.data.email;
        this.toemail = "mailto:" + response.data.email;
        this.tophone = "tel:" + response.data.billing.phone;
      }
    });
    this.GET_INFO_FROM_API().then((response) => {
      if (response.data) {
        this.url = response.data.url;
        this.description = response.data.description;
      }
    });
  },
  watch: {},
};
</script>

<style lang="scss">
.navbar {
  .navbar-brand {
    color: $blue;
    &:hover {
      color: $orang;
    }
  }
  .navbar-cart {
    .dropdown {
      width: 100%;
      .svg-fill {
        path {
          fill: $gray-600;
        }
        &_red {
          path {
            fill: $red;
          }
        }
      }
    }
  }
}
@media (max-width: 414px) {
  .navbar {
    .navbar-cart {
      width: 100%;
    }
  }
}
</style>