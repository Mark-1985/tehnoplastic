<template>
  <div class="color mb-3">
    <div class="color__text d-flex align-items-center mb-3">
      <div v-for="(col, index) in optionsColour" :key="index"> 
        <span v-if="col.value === colourModel">Цвет: </span>
        <span v-if="col.value === colourModel" class="ml-1 text-muted"> {{col.text}}</span>
      </div> 
    </div>
    
    <ul class="mb-0 colours-wrapper-product pl-0">
      <li v-for="(item, index) in colour" :key="index" @click="addColour(item)" class="list-inline-item m-0">
        <label  :class="['sock-'+item, {active: item === colourModel}]"  class="btn-colour border-r50 p-2 mr-2">
          <input type="radio" 
                name="colour"  
                v-model="colourModel" 
                :value="item" 
                class="input-invisible">
        </label>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
    name: "colour",
    components: { 
    },
    props: {
      colour: {
        type: Array,
        default() {
          return {};
        }
      }
    },
  data() {
    return {
      colourModel: "",
      optionsColour: [
        { value: 'yellow', text: "Желтый" },
        { value: 'jins', text: "Джинс" },
        { value: 'lilac', text: "Сирень" },
        { value: 'white', text: "Белый" },
        { value: 'black', text: "Черный" },
        { value: 'blue', text: "Голубой" },
        { value: 'red', text: "Красный" },
        { value: 'gray', text: "Серый" },
        { value: 'pink', text: "Розовый" },
        { value: 'salad', text: "Салатовый" },
        { value: 'orange', text: "Оранжевый" },
        { value: 'turquoise', text: "Бирюзовый" },
      ],
    };
  },
  computed: { 
  },
  methods:{
    addColour(value) {
      let $wLoc = window.location.href;
          $wLoc = $wLoc.split('?')[0];
      let $newUrl = $wLoc + '?colour=' + value;
      history.pushState(null, null, $newUrl);
     }
  },
  mounted() {
    let $wLoc = window.location.href;
        $wLoc = $wLoc.split('?colour=')[1];
    if ($wLoc != '') {
      this.colourModel = $wLoc;
    } else {
      this.colourModel = '';
    }
  },
  watch: {
    $route: function() {
      if (this.colour.length) {
        this.colourModel = this.colour[0];
      }

    }
  }
}
</script>

<style lang="scss">
.color {
  &__text {
    .custom-select {
      background-color: white;
      appearance:none; -moz-appearance:none; -webkit-appearance: none;
    }
  }
  .colours-wrapper-product{
    .input-invisible{
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
    }
    input{
      overflow: visible;
      margin: 0;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }
    .btn-colour{
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-bottom: 0;
      border-radius: 50%;
      box-shadow: inset 0 0 0 5px #fff, 0 0 0 1px #ced4da;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      transition: border-color .1s;
      &.active {
        box-shadow: inset 0 0 0 5px #fff, 0 0 0 2px #495057;
      }
      &:hover {
        box-shadow: inset 0 0 0 5px #fff, 0 0 0 2px #495057;
      }
    }
  }

  .sock-black {
    background: #000;
  }
  .sock-jins {
    background: $blue;
  }
  .sock-yellow {
    background: $yellow;
  }
  .sock-lilac {
    background: rgb(101, 33, 128);
  }
  .sock-dark_grey {
    background: rgb(47, 46, 48);
  }
  .sock-white {
    background: $secondary;
  }
  .sock-blue {
    background: $blue;
  }
  .sock-red {
    background: $red;
  }
  .sock-gray {
    background: $gray-600;
  }
  .sock-pink {
    background: pink;
  }
  .sock-salad {
    background: lightgreen;
  }
  .sock-orange {
    background: $orang;
  }
  .sock-turquoise {
    background: rgb(4, 78, 112);
  }
  .sock-green {
    background: $green;
  }
}
</style>