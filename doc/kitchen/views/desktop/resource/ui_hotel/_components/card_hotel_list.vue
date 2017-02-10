<template>
  <card class="card-hotel-groups">

    <card-header slot="card-header" :title="'分组列表'">
      <btn :icon="'i-plus'" :text="'添加酒店'" :mood="'emphasis'"
           @click.native="$router.push({ name: 'resource_hotel_detail', params: { group_id: 'new', tab: 'base' } })"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <city-selector @switch-select="switchFilterCity"></city-selector>
      <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="queryProductGroups"></text-input>
    </card-neck>

    <table-grid-2 :data_source="hotel_groups" :page_num="cur_page_num"
                  :transition_key="cur_page_num + cur_filter_city + cur_filter_status">
      <table-grid-row v-for="group in hotel_groups">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ group.id }}</table-grid-col>
        <table-grid-col :col_title="'中文名'" :span="'150px'">{{ group.hotel_name_cn }}</table-grid-col>
        <table-grid-col :col_title="'英文名'">{{ group.hotel_name_en }}</table-grid-col>
        <table-grid-col :col_title="'城市'" :span="'60px'">{{ group.city_title }}</table-grid-col>
        <table-grid-col :col_title="'中文地址'" :span="'100px'">{{ group.address_zh }}</table-grid-col>
        <table-grid-col :col_title="'英文地址'" :span="'100px'">{{ group.address_en }}</table-grid-col>
        <table-grid-col :col_title="'星级'">{{ group.star_level }}</table-grid-col>
        <table-grid-col :col_title="'评分'">{{ group.rate }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'170px'" :align="'right'">
          <btn :icon="'i-pencil'" :text="'详情'" @click.native="goProductGroupDetail(group)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>
    <pagination :page_num="cur_page_num" :total="total_groups_num" @to-page="changePageNum"></pagination>

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
        hotel_groups: [],
        total_groups_num: 0,
        cur_filter_city: '',
        cur_search_word: '',
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
    methods: {
      queryProductGroups: function () {
        axios.get('/chef/api/resource/hotel/HotelList', {
          params: {
            page_number: this.cur_page_num,
            filters: {
              city_code: this.cur_filter_city,
              status: STATUS[this.cur_filter_status]
            },
            search_word: this.cur_search_word
          }
        }).then(res => {
          this.hotel_groups = res.data.data.list;
          this.total_groups_num = parseInt(res.data.data.total);
          this.$root.$emit('init-paper', '分组列表');
        });
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
      searchProductGroups: function () {
        // 路有变化要重置paper
        this.$router.push({ query: { page: 1 } });
        this.$root.$emit('replace-paper');
        this.queryProductGroups();
      },
      goProductGroupDetail: function (hotel) {
        this.$router.push({
          name: 'resource_hotel_detail',
          params: { hotel_id: hotel.id, tab: 'base' }
        });
      },
      changePageNum: function (page_num) {
        this.cur_page_num = page_num;
        // 路有变化要重置paper
        this.$router.push({ query: { page: page_num } });
        this.$root.$emit('replace-paper');
        this.queryProductGroups();
      }
    }
  };
</script>
