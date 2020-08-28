<template>
  <div class="about-us container-lg" v-if="data.title">
    <h1 class="my-3">{{data.title.rendered}}</h1>
    <div v-if="CUSTOMERS != ''" class="row">
      <div v-html="data.content.rendered" class="col-12 align-items-center justify-content-center mx-auto mx-sm-0 mb-3">
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "about-us",
  data() {
    return {
      data: "",
    };
  },
  computed: {
    ...mapGetters(["CUSTOMERS"]),
  },
  async mounted() {
    axios
      .get("https://www.tehnoplastic.com.ua/wp-json/wp/v2/pages/26")
      .then((response) => (this.data = response.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style lang="scss">
.about-us {
  .alignwide {
    max-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    img {
      display: block;
      max-width: 200px;
      margin: auto;
      object-fit: scale-down;
    }
}
@media  (max-width: 576px){
	.about-us {
    img {
      max-width: 150px;
    }
	}
}
</style>

