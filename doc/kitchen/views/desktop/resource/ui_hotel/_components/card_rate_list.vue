<template>
  <card class="card-hotel-groups">

    <card-header slot="card-header" :title="'评分来源列表'">
      <btn :icon="'i-plus'" :text="'添加评分来源'" :mood="'emphasis'"
           @click.native="$router.push({ name: 'resource_hotel_rate_detail', params: { rate_id: 'new', tab: 'base' } })"></btn>
    </card-header>

    <table-grid-2 :data_source="hotel_groups" :page_num="cur_page_num"
                  :transition_key="cur_page_num + cur_filter_city + cur_filter_status">
      <table-grid-row v-for="group in hotel_groups">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ group.id }}</table-grid-col>
        <table-grid-col :col_title="'评价来源名称'" :span="'150px'">{{ group.title }}</table-grid-col>
        <table-grid-col :col_title="'来源网站'" :span="'100px'">{{ group.website }}</table-grid-col>
        <table-grid-col :col_title="'logo url'" :span="'100px'">{{ group.logo }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :align="'right'">
          <btn :icon="'i-pencil'" :text="'详情'" @click.native="goProductGroupDetail(group)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>
    <!--<pagination :page_num="cur_page_num" :total="total_groups_num" @to-page="changePageNum"></pagination>-->

  </card>
</template>

<script>
  /* global axios:true */
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
        axios.get('/chef/api/resource/hotel/RateList', {
          params: {
            page_number: this.cur_page_num
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
      goProductGroupDetail: function (group) {
        this.$router.push({
          name: 'resource_hotel_rate_detail',
          params: { rate_id: group.id }
        });
      }
    }
  };
</script>
