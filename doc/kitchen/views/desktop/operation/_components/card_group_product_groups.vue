<template>
  <card class="card-group-product-groups">

    <card-header slot="card-header" :title="'分组的分组列表'">
      <btn :icon="'i-plus'" :text="'新增分组的分组'" :mood="'emphasis'"
           @click.native="$router.push({ name: 'operation_group_product_group_detail', params: { group_id: 'new'} })"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ online: '已上线', editing: '编辑中', all: '全部' }"
           :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
      <city-selector @switch-select="switchFilterCity"></city-selector>
      <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="searchProductGroups"></text-input>
    </card-neck>

    <table-grid-2 :data_source="group_product_groups" :page_num="cur_page_num"
                  :transition_key="cur_page_num + cur_filter_city + cur_filter_status">
      <table-grid-row v-for="group in group_product_groups">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ group.group_id }}</table-grid-col>
        <table-grid-col :col_title="'分组名'">{{ group.title }}</table-grid-col>
        <table-grid-col :col_title="'运营城市'" :span="'150px'"><span v-for="city in group.location_labels">{{ city.city_name }}、</span>
        </table-grid-col>
        <table-grid-col :col_title="'开始时间'" :span="'70px'">{{ group.start_date.slice(2) }}</table-grid-col>
        <table-grid-col :col_title="'结束时间'" :span="'70px'">{{ group.end_date.slice(2) }}</table-grid-col>
        <table-grid-col :col_title="'含分组数'" :span="'50px'">{{ group.sub_group_num }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'170px'" :align="'right'">
          <btn :icon="'i-cog'"
               :text="group.status != 1 ? '编辑中' : group.container.length > 0 ? group.container.length + '处使用' : '未挂接'"
               @click.native="showGroupScenesManager(group)"></btn>
          <btn :icon="'i-pencil'" :text="'详情'" @click.native="goProductGroupDetail(group)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>
    <pagination :page_num="cur_page_num" :total="total_groups_num" @to-page="changePageNum"></pagination>

    <!-- 分组挂接管理 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <cheat-sheet v-if="$store.state.is_cheat_sheet_show"
                 @close-modal="$store.dispatch('SET_CHEAT_SHEET_SHOW', false)">
      <card-header slot="sheet-header" :title="cur_group.group_id + '. ' + cur_group.title"></card-header>
      <card>
        <card-header slot="card-header" :title="'上线状态'"></card-header>
        <selector :options="{ '1': '已上线', '0': '编辑中' }" :cur_id="cur_group.status"
                  @switch-option="switchGroupStatus"></selector>
      </card>
      <card-group-product-group-containers v-if="cur_group.status == 1"
                                     :group="cur_group"
                                     @container-removed="onContainerRemoved"></card-group-product-group-containers>
    </cheat-sheet>

  </card>
</template>

<script>
  /* global axios:true */
  const STATUS = {
    'online': 1,
    'editing': 0,
    'all': null
  };
  export default {
    data () {
      return {
        group_product_groups: [],
        total_groups_num: 0,
        cur_filter_city: '',
        cur_filter_status: 'online',
        cur_search_word: '',
        cur_page_num: 1,
        cur_group: {}
      };
    },
    computed: {
      cur_page_num: function () {
        return parseInt(this.$route.query.page) || 1;
      }
    },
    mounted () {
      this.queryProductGroups();
    },
    components: {
      'card-group-product-group-containers': require('./product_group/card_product_group_containers')
    },
    methods: {
      queryProductGroups: function () {
        axios.get('/chef/api/operation/productGroup/groupSubList', {
          params: {
            page_number: this.cur_page_num,
            filters: {
              city_code: this.cur_filter_city,
              status: STATUS[this.cur_filter_status]
            },
            search_word: this.cur_search_word
          }
        }).then(res => {
          this.group_product_groups = res.data.data.groups;
          this.total_groups_num = parseInt(res.data.data.total);
        });
      },
      searchProductGroups: function () {
        // 路有变化要重置paper
        this.$router.push({ query: { page: 1 } });
        this.$root.$emit('replace-paper');
        this.queryProductGroups();
      },
      switchFilterStatus: function (status) {
        this.cur_filter_status = status;
        // 路有变化要重置paper
        this.$router.push({ query: { page: 1 } });
        this.$root.$emit('replace-paper');
        this.queryProductGroups();
      },
      switchFilterCity: function (city_code) {
        this.cur_filter_city = city_code;
        // 路有变化要重置paper
        this.$router.push({ query: { page: 1 } });
        this.$root.$emit('replace-paper');
        this.queryProductGroups();
      },
      changePageNum: function (page_num) {
        this.cur_page_num = page_num;
        // 路有变化要重置paper
        this.$router.push({ query: { page: page_num } });
        this.$root.$emit('replace-paper');
        this.queryProductGroups();
      },
      switchGroupStatus: function (status) {
        axios.put('/chef/api/operation/productGroup/Group', {
          group_id: this.cur_group.group_id,
          status: status
        }).then(res => {
          this.cur_group.status = status;
        });
      },
      showGroupScenesManager: function (group) {
        this.cur_group = group;
        this.$store.dispatch('SET_CHEAT_SHEET_SHOW', true);
      },
      onContainerRemoved: function (index) {
        this.cur_group.container.splice(index, 1);
      },
      goProductGroupDetail: function (group) {
        this.$router.push({
          name: 'operation_group_product_group_detail',
          params: { group_id: group.group_id }
        });
      }
    }
  };
</script>
