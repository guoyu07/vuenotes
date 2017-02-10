<template>
  <card class="card-product-groups">

    <card-header slot="card-header" :title="'分组列表'">
      <btn :icon="'i-plus'" :text="'选择分组'" :mood="'emphasis'"
           @click.native="is_product_group_multiple_hunter_use_in_city_show = true"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ online: '已上线', editing: '编辑中'}"
           :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
    </card-neck>

    <table-grid-2 v-if="product_groups.length > 0" :data_source="product_groups" :use_sort="true" @do-sort="sortGroup">
      <table-grid-row v-for="group in product_groups">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ group.group_id }}</table-grid-col>
        <table-grid-col :col_title="'分组名'">{{ group.title }}</table-grid-col>
        <table-grid-col :col_title="'运营城市'" :span="'160px'"><span v-for="city in group.location_labels">{{ city.city_name }}、</span></table-grid-col>
        <table-grid-col :col_title="'含商品数'" :span="'60px'">{{ group.product_num }}</table-grid-col>
        <table-grid-col :col_title="'开始时间'" :span="'90px'">{{ group.start_date }}</table-grid-col>
        <table-grid-col :col_title="'结束时间'" :span="'90px'">{{ group.end_date }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'130px'" :align="'right'">
          <btn v-if="parent != 'web_home_group_product_detail'" :icon="'i-pencil'" :text="'详情'"
               @click.native="goProductGroupDetail(group)"></btn>
          <btn :icon="'i-bin'" :text="'解挂'" :mood="'danger'" @click.native="deleteProductGroup(group)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <modal v-if="is_product_group_multiple_hunter_use_in_city_show"
           @close-modal="is_product_group_multiple_hunter_use_in_city_show = false">
      <card-header slot="modal-header" :title="'选择多个商品分组'"></card-header>
      <multiple-hunter :type="'product_group'" :cur_ids="product_group_ids"
                       :in_cities="$store.state.paper_stack[$store.state.paper_stack.length - 1].data.city_codes"
                       @cancel-hunt="is_product_group_multiple_hunter_use_in_city_show = false"
                       @do-hunt="setProductGroupsForMultipleHunter"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  /* global axios:true */
  const STATUS = {
    'online': 1,
    'editing': 0
  };
  export default {
    props: {
      parent: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        group_id: '',
        product_groups: [],
        total_groups_num: 0,
        cur_filter_status: 'online',
        product_group_ids: [],
        is_product_group_multiple_hunter_use_in_city_show: false
      };
    },
    mounted () {
      this.group_id = this.$route.params.group_id;
      this.queryProductGroups();
    },
    methods: {
      queryProductGroups: function () {
        axios.get('/chef/api/operation/productGroup/GroupSub', {
          params: {
            group_id: this.group_id,
            filters: {
              status: STATUS[this.cur_filter_status]
            }
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.product_group_ids = [];
            this.product_groups = res.data.data;
            for (var i = 0; i < this.product_groups.length; i++) {
              this.product_group_ids.push(this.product_groups[i].group_id);
            }
          }
        });
      },
      switchFilterStatus: function (status) {
        this.cur_filter_status = status;
        this.queryProductGroups();
      },
      goProductGroupDetail: function (group) {
        this.$router.push({
          name: 'operation_product_group_detail_in_group',
          params: {
            group_id: group.group_id,
            tab: 'base'
          }
        });
      },
      setProductGroupsForMultipleHunter: function (group_ids, groups) {
        this.is_product_group_multiple_hunter_use_in_city_show = false;
        this.product_groups = groups;
        axios.patch('/chef/api/operation/productGroup/GroupSub', {
          group_id: this.group_id,
          sub_group_ids: group_ids
        }).then(res => {
          if (res.data.code !== 200
          ) {
            this.queryProductGroups();
          }
        })
        ;
      },
      deleteProductGroup: function (group) {
        axios.delete('/chef/api/operation/productGroup/GroupSub', {
          params: {
            parent_group_id: this.group_id,
            sub_group_id: group.group_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.queryProductGroups();
          }
        });
      },
      sortGroup: function (group, new_index) {
        axios.put('/chef/api/operation/productGroup/GroupSub', {
          parent_group_id: this.group_id,
          sub_group_id: group.group_id,
          new_index: new_index
        }).then(res => {
          if (res.data.code !== 200) {
            this.queryProductGroups();
          }
        });
      }
    }
  };
</script>
