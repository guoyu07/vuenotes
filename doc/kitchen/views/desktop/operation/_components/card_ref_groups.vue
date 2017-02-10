<template>
  <card class="card-area-groups">

    <card-header slot="card-header" :title="group_tab=='2'&&type=='1'?'分组列表  (注意: 该列表修改将适用到所有片区)':'分组列表'">
      <btn :icon="'i-plus'" :text="'分组'" :mood="'emphasis'"
           @click.native="is_group_multiple_hunter_show = true"></btn>
    </card-header>

    <table-grid-2 v-if="product_groups.length > 0" :data_source="product_groups" :use_sort="true" @do-sort="sortGroup">
      <table-grid-row v-for="group in product_groups">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ group.group_id }}</table-grid-col>
        <table-grid-col :col_title="'分组名'">{{ group.title }}</table-grid-col>
        <table-grid-col :col_title="'运营城市'" :span="'160px'"><span v-for="city in group.location_labels">{{ city.city_name }}、</span></table-grid-col>
        <table-grid-col :col_title="'类型'" :span="'80px'">{{ group.type=='1'?'分组':'分组的分组' }}</table-grid-col>
        <table-grid-col :col_title="'开始时间'" :span="'90px'">{{ group.start_date }}</table-grid-col>
        <table-grid-col :col_title="'结束时间'" :span="'90px'">{{ group.end_date }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'130px'" :align="'right'">
          <btn :icon="'i-pencil'" :text="'详情'" @click.native="goGroupDetail(group)"></btn>
          <btn :icon="'i-bin'" :text="'解挂'" :mood="'danger'" @click.native="deleteGroup(group)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 分组多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_group_multiple_hunter_show" @close-modal="is_group_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商品分组'"></card-header>
      <multiple-hunter :type="'group'" :cur_ids="product_group_ids" :in_countries="in_countries" :in_cities="in_cities"
                       @cancel-hunt="is_group_multiple_hunter_show = false"
                       @do-hunt="setProductGroupsForMultipleHunter"></multiple-hunter>
    </modal>
  </card>
</template>

<script>
  /* global axios:true */
  export default {
    props: ['pid', 'type', 'group_tab'],
    data () {
      return {
        product_groups: [],
        is_group_multiple_hunter_show: false,
        product_group_ids: []
      };
    },
    computed: {
      in_countries: function () {
        if (this.type === '2') {
          return [this.pid];
        } else {
          return [];
        }
      },
      in_cities: function () {
        if (this.type === '3') {
          return [this.pid];
        } else {
          return [];
        }
      }
    },
    mounted () {
      this.queryProductGroups();
      this.$root.$on('switch-home-area', () => {
        this.queryProductGroups();
      });
    },
    methods: {
      queryProductGroups: function () {
        axios.get('/chef/api/operation/operation/OperationGroups', {
          params: {
            type: this.type,
            tab: this.group_tab,
            code: this.pid
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.product_groups = res.data.data;
            this.product_group_ids = [];
            this.product_groups.map(group => {
              this.product_group_ids.push(group.group_id);
            });
          }
        });
      },
      goGroupDetail: function (group) {
        if (group.type === '1') {
          this.$router.push({
            name: 'operation_web_home_product_group_detail',
            params: { group_id: group.group_id, tab: 'base' }
          });
        } else {
          this.$router.push({
            name: 'operation_web_home_group_product_group_detail',
            params: { group_id: group.group_id }
          });
        }
      },
      deleteGroup: function (group) {
        axios.delete('/chef/api/operation/operation/operationGroup', {
          params: {
            id: group.id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.queryProductGroups();
          }
        });
      },
      setProductGroupsForMultipleHunter: function (group_ids, groups) {
        this.is_group_multiple_hunter_show = false;
        this.product_groups = groups;
        axios.patch('/chef/api/operation/operation/OperationGroups', {
          type: this.type,
          code: this.pid,
          tab: this.group_tab,
          group_ids: group_ids
        }).then(res => {
          this.queryProductGroups();
        });
      },
      sortGroup: function (group, new_index) {
        axios.put('/chef/api/operation/operation/OperationGroup', {
          id: group.id,
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
