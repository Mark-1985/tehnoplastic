<template>
  <div class="home-vue">

    <slider></slider>

    <categories></categories>

    <popular-products></popular-products>

    <new-products></new-products>
    
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    Categories: ()=>import ('@/components/home/categories'),
    Slider: ()=>import ('@/components/home/slider'),
    PopularProducts: ()=>import ('@/components/catalog/popular-products'),
    NewProducts: ()=>import ('@/components/catalog/new-products')

  },
   data() {
    return {
      title: "Hello home"
    };
  },
};
</script>

<style lang="scss">
  .home-vue {
    max-width: 1366px;
    margin: 0 auto;
  }
</style>

