<template>
  <div class="container-lg">
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      controls
      indicators
      :interval="3000"
    >
      <b-carousel-slide
        img-src="@/assets/images/slider/461362-PFLYDY-276.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="@/assets/images/slider/214838543-family-socks-02.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="@/assets/images/slider/1435143843_228e5e.jpg"
      ></b-carousel-slide>
    </b-carousel>


  </div>
</template>

<script>
export default {
    name: "slider",
    components: {},
    props: {},
  data() {
    return {};
  },
  computed: { },
  methods:{},
  mounted() { }
}
</script>

<style lang="scss">
.carousel{
  .carousel-inner {
    img {
      min-height: 245px;
      max-height: 480px;

    }
  }
}
</style>