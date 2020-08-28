<template>
  <div class="404-vue container-lg text-center p-4">
      <img class="img-fluid my-4" src="../icons/png/404.png" alt="404">
      <div class="row justify-content-center">
        <div href="/" class="col-8 col-sm-6 col-md-3 my-2">
            <a href="/" class="btn btn-outline-dark w-100">Главная</a>              
        </div>
        <div class="col-8 col-sm-6 col-md-3 my-2">
            <a href="/shop/" class="btn btn-outline-dark w-100">Каталог</a>              
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "404",
   data() {
    return {
      title: "404"
    };
  },
};
</script>

<style lang="scss">
</style>

