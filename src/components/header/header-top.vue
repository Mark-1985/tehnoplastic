<template>
  <b-navbar toggleable="sm" type="light" variant="white" class="py-0">
    <b-container fluid="lg" class="my-2">
      <b-navbar-brand :href="url" class="d-flex mx-auto mx-sm-0 h1 text-uppercase text-primary mb-0">
        <img :src=" require('../../assets/logo.png') " alt="logo" height="40" />
        <h3 v-if="this.CUSTOMERS !=''" class="px-3">{{this.CUSTOMERS.billing.first_name}}</h3>
      </b-navbar-brand>
      <b-navbar-nav class="flex-row text-center mx-auto mx-sm-0 ml-sm-auto">
        <b-nav-item :href="tophone" class="my-auto ml-3">
          <svg-icon class="mr-2" name="phone" width="1rem" height="1.5rem" />
          <span class="text-muted"></span>
          <span class="d-none d-lg-inline-block">{{phone}}</span>
        </b-nav-item>
        <b-nav-item :href="toemail" class="my-auto ml-3">
          <svg-icon class="mr-2" name="email" width="1rem" height="1.5rem"/>
          <span class="text-muted"></span>
          <span class="d-none d-lg-inline-block">{{email}}</span>
        </b-nav-item>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "header-top",
  components: {
  },
  props: {},
  data() {
    return {
      phone: null,
      email: null,
      toemail: null,
      tophone: null,
      url: null,
      description: null
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(["CUSTOMERS"]),
  },
  methods: {
    ...mapActions([
      "GET_CUSTOMERS_FROM_API",
      "GET_INFO_FROM_API",
    ]),
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
}
</style>