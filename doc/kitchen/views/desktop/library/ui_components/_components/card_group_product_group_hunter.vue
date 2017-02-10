<template>
  <card class="card-group-product-group-hunter">

    <card-header slot="card-header" :title="'Group product group hunter'">
      <btn :text="'多个分组的分组'" @click.native="is_group_group_multiple_hunter_show = true"></btn>
      <!--<btn :text="'单个'"></btn>-->
    </card-header>

    <table-grid-2 :data_source="group_product_groups">
      <table-grid-row v-for="group in group_product_groups">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ group.group_id }}</table-grid-col>
        <table-grid-col :col_title="'分组名'">{{ group.title }}</table-grid-col>
        <table-grid-col :col_title="'含分组数'" :span="'80px'">{{ group.sub_group_count }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'50px'" :align="'right'">
          <btn :icon="'i-bin'" :mood="'danger'" @click.native=""></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 商品分组组 多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_group_group_multiple_hunter_show" @close-modal="is_group_group_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商品分组的分组'"></card-header>
      <multiple-hunter :type="'group_product_group'" :cur_ids="group_product_group_ids"
                       @cancel-hunt="is_group_group_multiple_hunter_show = false"
                       @do-hunt="setGropuGroupsForMultipleHunter"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  export default {
    data () {
      return {
        group_product_groups: [{
          group_id: 10,
          title: '周末去哪儿',
          sub_group_count: 4
        }],
        group_product_group_ids: [10],
        is_group_group_multiple_hunter_show: false
      };
    },
    methods: {
      setGropuGroupsForMultipleHunter: function (group_ids, groups) {
        this.is_group_group_multiple_hunter_show = false;
        this.group_product_groups = groups;
      }
    }
  };
</script>
