
<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="px-0 pb-0 pt-0">
    <b-navbar-toggle target="nav-collapse" class="border-0"></b-navbar-toggle>
    <b-container>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="pl-2 pl-lg-0">
          <b-nav-item
            v-for="(menu, index) in MENU"
            :key="index"
            :to="menuURLPath(menu.url)"
            @click="clearing_values()"
            :active="isActive"
            :exact="true"
            exact-active-class="router-link-exact-active"
            class="py-2 pr-2 mr-2"
            link-classes="navbar-link__hover text-uppercase position-relative px-0 font-size-14 text-center text-md-left"
          >{{menu.title}}</b-nav-item>
        </b-navbar-nav>
        <!-- Search -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form v-on:submit.prevent="search(vModelValue)">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              v-model="vModelValue"
              @change="search(vModelValue)"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="search_btn my-2 my-sm-0" @click="search(vModelValue)">
              <svg-icon name="search"></svg-icon>
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "header-menu",
  components: {},
  props: {},
  data() {
    return {
      vModelValue: "",
      menuName: "",
      isActive: false,
      exact: false,
    };
  },
  computed: {
    ...mapGetters(["MENU", "SEARCH_VALUE", "CATEGORY_ID"]),
  },
  methods: {
    ...mapActions([
      "GET_MENU_FROM_API",
      "GET_PRODUCTS_FROM_API",
      "GET_SEARCH_VALUE_TO_VUEX",
      "GET_ID_CATEGORIES_TO_VUEX",
    ]),
    menuURLPath(url) {
      /* eslint-disable */
      var m = url.match(
          /^(([^:\/?#]+:)?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/
        ),
        r = {
          hash: m[10] || "", // #asd
          host: m[3] || "", // localhost:257
          hostname: m[6] || "", // localhost
          href: m[0] || "", // http://username:password@localhost:257/deploy/?asd=asd#asd
          origin: m[1] || "", // http://username:password@localhost:257
          pathname: m[8] || (m[1] ? "/" : ""), // /deploy/
          port: m[7] || "", // 257
          protocol: m[2] || "", // http:
          search: m[9] || "", // ?asd=asd
          username: m[4] || "", // username
          password: m[5] || "", // password
        };
      return r.pathname;
    },
    search(value) {
      this.GET_SEARCH_VALUE_TO_VUEX(value);
      if (this.$route.path != "/shop" || this.$route.path != "/shop/") {
        this.$router.push("/shop");
        this.GET_PRODUCTS_FROM_API();
      } else {
        this.$router.push({ fullPath: "/shop" });
        this.GET_PRODUCTS_FROM_API();
      }
    },
    clearing_values() {
      if (this.$router.path != "/shop" || this.$router.path != "/shop/") {
        //this.GET_ID_CATEGORIES_TO_VUEX("");
        this.vModelValue = "";
        this.GET_SEARCH_VALUE_TO_VUEX("");
        this.GET_PRODUCTS_FROM_API();
      }
    },
  },
  mounted() {
    this.GET_MENU_FROM_API().then((response) => {});
    console.log(this.menuName);
    if (this.$route.path == this.menuName) {
      this.isActive = false;
      this.$nextTick(() => {
        this.isActive = true;
      });
    }
  },
};
</script>

<style lang="scss">
.search_btn {
  :hover {
    svg {
      fill: white;
    }
  }
  svg {
    fill: #7e7f84;
  }
}
header {
  .navbar-toggler {
    &:focus{
      outline: none;
    }
  }
  .navbar-nav {
    .form-inline {
      flex-flow: row;
    }
    .nav-link {
      &__hover {
        color: $white;
        &:hover {
          color: $red;
          &::before {
            content: "";
            border-bottom: 3px solid $red;
            width: 100%;
            position: absolute;
            top: 95%;
          }
        }
      }
    }
    .router-link-exact-active {
      color: #fff;
      font-weight: bold;
      &::before {
        content: "";
        border-bottom: 3px solid $red;
        width: 100%;
        position: absolute;
        top: 95%;
      }
    }
  }
}
@include media-breakpoint-down(md) {
  header {
    .navbar-collapse {
      position: absolute;
      background: $dark;
      top: 100%;
      width: 100%;
      z-index: 900;
      .navbar-nav{
        align-items: center;
      }
    }
    .nav-link{
      display: inline;
    }
  }
}
</style>