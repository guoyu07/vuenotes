<template>
  <card class="card-product-hunter">

    <card-header slot="card-header" :title="'Product hunter'">
      <btn :text="'选择多个商品'" :mood="'emphasis'" @click.native="is_product_multiple_hunter_show = true"></btn>
      <btn :text="'限制城市'"></btn>
      <!--<btn :text="'选择单个商品'"></btn>-->
    </card-header>

    <table-grid-2 :data_source="products">
      <table-grid-row v-for="product in products">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ product.product_id }}</table-grid-col>
        <table-grid-col :col_title="'商品名'">{{ product.name }}</table-grid-col>
        <table-grid-col :col_title="'所属城市'" :span="'80px'">{{ product.city_name }}</table-grid-col>
        <table-grid-col :col_title="'类型'" :span="'100px'">{{ product.product_type_name }}</table-grid-col>
        <table-grid-col :col_title="'价格'" :span="'150px'">&yen;{{ product.price.price }} / &yen;{{
          product.price.orig_price }}
        </table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'80px'" :align="'right'">
          <btn :icon="'i-bin'" :mood="'danger'" @click.native=""></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 商品多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_product_multiple_hunter_show" :size="'large'"
           @close-modal="is_product_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商品'"></card-header>
      <multiple-hunter :type="'product'" :cur_ids="product_ids" :in_cities="in_cities"
                       @cancel-hunt="is_product_multiple_hunter_show = false"
                       @do-hunt="setProducts"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  export default {
    data () {
      return {
        products: [{
          city_name: '首尔',
          name: '【Gift Flight】礼品卡机票类商品',
          price: { orig_price: '9999', price: '9999' },
          product_id: '8788',
          product_type_name: '礼品卡机票'
        }, {
          city_name: '香港',
          name: '香港迪士尼乐园门票+海洋公园门票',
          price: { orig_price: '625', price: '668' },
          product_id: '1059',
          product_type_name: '单票'
        }],
        product_ids: [8788, 1059],
        in_cities: ['HKT'],
        is_product_multiple_hunter_show: false
      };
    },
    methods: {
      setProducts: function (product_ids, products) {
        this.is_product_multiple_hunter_show = false;
        this.products = products;
      }
    }
  };
</script>
