<template>
  <b-row class="order pt-5">
    <b-col sm="12" lg="8">
      <b-form v-if="show" @submit="onSubmit" @reset="onReset" class="my-5">
        <div class="form-row">
          <b-form-group class="col d-none" id="input-group-notext" label-for="input-notext">
            <b-form-input
              id="input-notext"
              v-notext
              v-model="notext"
              type="text"
              name="username"
              required
              placeholder
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="col"
            id="input-group-first_name"
            label="Имя:"
            label-for="input-first_name"
          >
            <b-form-input id="input-first_name" v-model="billing.first_name" required placeholder></b-form-input>
            <b-form-invalid-feedback :state="validationTextFirst">Ведите имя</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationTextFirst">Поле заполнено</b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            class="col"
            id="input-group-last_name"
            label="Фамилия:"
            label-for="input-last_name"
          >
            <b-form-input id="input-last_name" v-model="billing.last_name" required placeholder></b-form-input>
            <b-form-invalid-feedback :state="validationTextLast">Ведите фамилия</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationTextLast">Поле заполнено</b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            class="col-12"
            id="input-group-address_1"
            label="Адрес (склад):"
            label-for="input-address_1"
          >
            <b-form-input
              id="input-address_1"
              v-model="billing.address_1"
              placeholder="Номер дома (склада) и название улицы"
            ></b-form-input>
            <b-form-invalid-feedback>Ведите номер дома (склада) и название улицы</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            class="col-12"
            id="input-group-city"
            label="Область/регион:"
            label-for="input-city"
          >
            <b-form-input id="input-city" v-model="billing.city" required placeholder></b-form-input>
            <b-form-invalid-feedback :state="validationTextCity">Ведите область/регион</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationTextCity">Поле заполнено</b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            class="col-12"
            id="input-group-state"
            label="Город/населенный пункт:"
            label-for="input-state"
          >
            <b-form-input id="input-state" v-model="billing.state" required placeholder></b-form-input>
            <b-form-invalid-feedback :state="validationTextState">Ведите город/населенный пункт</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationTextState">Поле заполнено</b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            class="col-12"
            id="input-group-postcode"
            label="Почтовый индекс:"
            label-for="input-postcode"
          >
            <b-form-input id="input-postcode" v-model="billing.postcode" required placeholder></b-form-input>
            <b-form-invalid-feedback :state="validationPostcode">Ведите почтовый индекс</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationPostcode">Поле заполнено</b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-email"
            class="col-12"
            label="Email адрес:"
            label-for="input-email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-email"
              v-model="billing.email"
              type="email"
              required
              placeholder="email адрес електронной пошты"
            ></b-form-input>
            <b-form-invalid-feedback :state="validationEmail">Ведите адрес електронной пошты email</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationEmail">Поле заполнено</b-form-valid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-phone"
            class="col-12"
            label="Телефон:"
            label-for="input-phone"
          >
            <b-form-input
              id="input-phone"
              v-model="billing.phone"
              required
              placeholder="+380000000000"
              name="phone"
              type="tel"
              autocomplete="tel"
              v-phone
              pattern="[+][0-9]{2} [(][0-9]{3}[)] [0-9]{3}-[0-9]{2}-[0-9]{2}"
            ></b-form-input>
            <b-form-invalid-feedback :state="validationPhone">Ведите номер теефона</b-form-invalid-feedback>
            <b-form-valid-feedback :state="validationPhone">Поле заполнено</b-form-valid-feedback>
          </b-form-group>
        </div>
        <b-form-group label="Метод оплаты">
          <b-form-radio-group
            id="payment_method"
            v-model="payment_method"
            :options="options"
            class="mb-3"
            value-field="item"
            text-field="name"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group v-if="ZONES" label="Способ доставки">
          <b-form-radio-group
            id="selected_zones"
            v-model="selected_zones"
            :options="zones"
            class="mb-3"
          ></b-form-radio-group>
        </b-form-group>

        <b-button type="submit" variant="primary" class="mr-1">Заказать</b-button>
        <b-button type="reset" variant="danger" class="mr-1">Очистить форму</b-button>
      </b-form>
    </b-col>
    <v-cart-info :cart_item_data="cart_data"></v-cart-info>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-form-orders",
  components: {
    VCartInfo: () => import("@/components/cart/v-cart-info")
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      data: [],
      show: false,
      notext: "",
      options: [
        { item: "bacs", name: "Прямой банковский перевод" },
        { item: "cod", name: "Оплата при доставке" }
      ],
      zones: [],
      billing: {
        first_name: "",
        last_name: "",
        address_1: "",
        city: "",
        state: "",
        postcode: "",
        email: "",
        phone: ""
      },
      payment_method: "cod",
      payment_method_title: "Оплата при доставке",
      selected_zones: "7",
      shipping_lines: [],
      status: "processing",
      line_items: [],
      cart_hash:'',
      toString() {
        return {
          status: "processing",
          payment_method: this.payment_method,
          payment_method_title: this.payment_method_title,
          set_paid: true,
          billing: this.billing,
          shipping: this.billing,
          line_items: this.line_items,
          shipping_lines: this.shipping_lines,
          cart_hash: this.cart_hash
        };
      }
    };
  },
  created() {},
  async mounted() {
    const $itemProduct = JSON.parse(localStorage.getItem(this.LSTOREG));
    if ($itemProduct) {
      this.line_items = $itemProduct;
    }
    const $cartHash = JSON.parse(localStorage.getItem("cart_hash"));
    if ($cartHash) {
      this.cart_hash = $cartHash;
    }
    this.GET_ZONES_FROM_API().then(() => {
      if (this.ZONES) {
        this.ZONES.map(elem => {
          if (elem.enabled) {
            this.zones.push({
              text: elem.title,
              value: elem.id
            });
          }
          this.$nextTick(() => {
            this.show = true;
          });
        });
      }
    });
  },
  computed: {
    ...mapGetters(["LSTOREG", "ZONES", "ORDER"]),
    validationNoText() {
      var re = /^\d{1}$/;
      return re.test(this.notext);
    },
    validationTextFirst() {
      var re = /^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)?$/;
      return re.test(this.billing.first_name);
    },
    validationTextLast() {
      var re = /^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)?$/;
      return re.test(this.billing.last_name);
    },
    validationTextCity() {
      var re = /^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)?$/;
      return re.test(this.billing.city);
    },
    validationTextState() {
      var re = /^[А-ЯЁ][а-яё]*(\s[А-ЯЁ][а-яё]*)?$/;
      return re.test(this.billing.state);
    },
    validationPostcode() {
      var re = /^\d{5}$/;
      return re.test(this.billing.postcode);
    },
    validationEmail() {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.billing.email);
    },
    validationPhone() {
      var paternPhone = /^\+\d{2} \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
      return paternPhone.test(this.billing.phone);
    }
  },
  methods: {
    ...mapActions(["GET_ORDERS_FROM_API", "GET_ZONES_FROM_API"]),

    onSubmit(evt) {
      evt.preventDefault();

      this.ZONES.map(elem => {
        if (elem.id == this.selected_zones) {
          this.shipping_lines = [];
          this.shipping_lines.push({
            method_id: elem.method_id,
            method_title: elem.title
          });
        }
      });

      this.options.map(elem => {
        if (elem.item == this.payment_method) {
          this.payment_method_title = elem.name;
        }
      });

      const $data = this.toString();
      this.GET_ORDERS_FROM_API($data);
      localStorage.removeItem(this.LSTOREG);
      //обект для перехота по окончании покупок
      this.$router.push({ path: "/cart/list-order-products" });
    },
    onClick() {
      this.ZONES.map(elem => {
        if (elem.id == this.selected_zones) {
          this.shipping_lines.push({
            id: elem.id,
            method_id: elem.method_id,
            method_title: elem.method_title
          });
        }
      });
      localStorage.setItem("string", JSON.stringify(this.toString()));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.billing.first_name = "";
      this.billing.last_name = "";
      this.billing.address_1 = "";
      this.billing.city = "";
      this.billing.state = "";
      this.billing.postcode = "";
      this.billing.email = "";
      this.billing.phone = "";
      this.payment_method_title = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  },
  directives: {    
    phone: {
      bind(el) {
        el.oninput = function(e) {
          if (!e.isTrusted) {
            return;
          }

          let x = this.value
            .replace(/\D/g, "")
            .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
          this.value = !x[2]
            ? x[1]
            : "+" +
              (x[1] !== "38" ? "38" : x[1]) +
              " (" +
              x[2] +
              ") " +
              x[3] +
              "-" +
              x[4] +
              (x[5] ? "-" + x[5] : "");
          el.dispatchEvent(new Event("input"));
        };
      }
    },
    notext: {
      bind(el) {
        el.value = "1";
      }
    }
  },
  watch: {}
};
</script>

<style lang="scss">
</style>