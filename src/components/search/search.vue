<template>
    <div class="search">
        <input type="text" v-model="searchValue" @change="search()">
        <svg-icon name="search" @click="search()"></svg-icon>
    </div>
</template>

<script>

    export default {
        name: "search",
        data() {
            return {
                searchValue: ''
            }
        },
    }
</script>
