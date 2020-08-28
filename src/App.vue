<template>
  <div id="app">
    <header>
      <header-top></header-top>
      <navbar-menu></navbar-menu>
    </header>
    <div class="about-us container-lg">
      <b-breadcrumb v-if="this.$route.path !== '/'" :name_breadcrumb="this.$route.name"></b-breadcrumb>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    headerTop: () => import("@/components/header/header-top"),
    navbarMenu: () => import("@/components/navbar/navbar-menu"),
    footerBottom: () => import("@/components/footer/footer"),
    bBreadcrumb: () => import("@/components/breadcrumb/breadcrumb"),
  },
};
</script>

<style lang="scss">
//заголовки
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: $font-family-sans;
}
</style>
