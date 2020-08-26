<template>
    <b-breadcrumb class="pl-0">
      <b-breadcrumb-item to="/">Главная</b-breadcrumb-item>
      <b-breadcrumb-item v-if="this.$route.name === 'product'" active></b-breadcrumb-item>
      <b-breadcrumb-item v-else active>{{name_breadcrumb}}</b-breadcrumb-item>
    </b-breadcrumb>
</template>

<script>
export default {
    name: "breadcrumb",
    components: { 
    },
    props: {
        name_breadcrumb: {
            type: String,
            default() {
            return {};
            }
        }

    },
}
</script>>

<style lang="scss">
  .breadcrumb {
    background-color: #fff;
  }
</style>