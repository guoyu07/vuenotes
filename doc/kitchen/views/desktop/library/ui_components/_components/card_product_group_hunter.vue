<template>
  <card class="card-product-group-hunter">

    <card-header slot="card-header" :title="'Product group hunter'">
      <btn :text="'选择多个商品分组'" :mood="'emphasis'" @click.native="is_product_group_multiple_hunter_show = true"></btn>
      <btn :text="'限制城市'" @click.native="is_product_group_multiple_hunter_use_in_city_show = true"></btn>
      <!--<btn :text="'单个'"></btn>-->
    </card-header>

    <table-grid-2 :data_source="product_groups">
      <table-grid-row v-for="group in product_groups">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ group.group_id }}</table-grid-col>
        <table-grid-col :col_title="'分组名'">{{ group.title }}</table-grid-col>
        <table-grid-col :col_title="'含商品数'" :span="'80px'">{{ group.product_count }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'50px'" :align="'right'">
          <btn :icon="'i-bin'" :mood="'danger'" @click.native=""></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 商品分组多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_product_group_multiple_hunter_show" @close-modal="is_product_group_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商品分组'"></card-header>
      <multiple-hunter :type="'product_group'" :cur_ids="product_group_ids"
                       @cancel-hunt="is_product_group_multiple_hunter_show = false"
                       @do-hunt="setProductGroupsForMultipleHunter"></multiple-hunter>
    </modal>

    <!-- 商品分组多选弹窗 含城市限制 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_product_group_multiple_hunter_use_in_city_show"
           @close-modal="is_product_group_multiple_hunter_use_in_city_show = false">
      <card-header slot="modal-header" :title="'选择多个商品分组'"></card-header>
      <multiple-hunter :type="'product_group'" :cur_ids="product_group_ids" :in_cities="in_cities"
                       @cancel-hunt="is_product_group_multiple_hunter_use_in_city_show = false"
                       @do-hunt="setProductGroupsForMultipleHunter"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  export default {
    data () {
      return {
        product_groups: [{
          group_id: 9,
          title: '泰国！落地签说走就走',
          product_count: 2
        }],
        product_group_ids: [9],
        is_product_group_multiple_hunter_show: false,
        in_cities: ['HKT', 'TYO'],
        is_product_group_multiple_hunter_use_in_city_show: false
      };
    },
    methods: {
      setProductGroupsForMultipleHunter: function (group_ids, groups) {
        this.is_product_group_multiple_hunter_show = false;
        this.product_groups = groups;
      }
    }
  };
</script>
