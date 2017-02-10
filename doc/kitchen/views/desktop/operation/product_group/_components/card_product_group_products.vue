<template>
  <card class="card-product-group-products">

    <card-header slot="card-header" :title="'包含商品列表'">
      <btn :text="'挂接商品'" :mood="'emphasis'" @click.native="is_product_hunter_show = true"></btn>
    </card-header>

    <table-grid

    <table-grid-2 :data_source="products"
                  :use_sort="true"
                  @do-sort="sortProducts">
      <table-grid-row v-for="product in products">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ product.product_id }}</table-grid-col>
        <table-grid-col :col_title="'商品名'">{{ product.name }}</table-grid-col>
        <table-grid-col :col_title="'所属城市'" :span="'90px'">{{ product.city_name }}</table-grid-col>
        <table-grid-col :col_title="'类型'" :span="'90px'">{{ product.product_type_name }}</table-grid-col>
        <table-grid-col :col_title="'价格'" :span="'90px'">
          {{ !!product.price.price ? '&yen;' + product.price.price : '-' }}
        </table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'130px'" :align="'right'">
          <btn :text="'详情'" @click.native="goProductGroupDetail(group)"></btn>
          <btn :icon="'i-bin'" :text="'解挂'" :mood="'danger'" @click.native="deleteProduct(product)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 商品多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_product_hunter_show" :size="'large'" @close-modal="is_product_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商品'"></card-header>
      <multiple-hunter :type="'product'" :cur_ids="product_ids"
                       :in_cities="$store.state.paper_stack[$store.state.paper_stack.length - 1].data.city_codes"
                       @cancel-hunt="is_product_hunter_show = false"
                       @do-hunt="saveProductsRef"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        products: [],
        product_ids: [],
        is_product_hunter_show: false
      };
    },
    beforeMount () {
      this.queryProducts();
    },
    methods: {
      queryProducts: function () {
        axios.get('/chef/api/operation/productGroup/groupProduct', {
          params: {
            group_id: this.$route.params.group_id
          }
        }).then(res => {
          this.product_ids = this.setProductIds(res.data.data);
          this.products = res.data.data;
        });
      },
      saveProductsRef: function (product_ids, products) {
        axios.patch('/chef/api/operation/productGroup/groupProduct', {
          group_id: this.$route.params.group_id,
          product_ids: product_ids
        }).then(res => {
          this.products = products;
          this.product_ids = product_ids;
          this.is_product_hunter_show = false;
        });
      },
      deleteProduct: function (product) {
        axios.delete('/chef/api/operation/productGroup/groupProduct', {
          params: {
            group_id: this.$route.params.group_id,
            product_id: product.product_id
          }
        }).then(res => {
          this.queryProducts();
        });
      },
      sortProducts: function (product, new_index) {
        axios.put('/chef/api/operation/productGroup/groupProduct', {
          group_id: this.$route.params.group_id,
          product_id: product.product_id,
          new_index: new_index
        });
      },
      setProductIds: function (products) {
        var product_ids = [];
        products.map(product => {
          product_ids.push(product.product_id);
        });
        return product_ids;
      }
    }
  };
</script>
