<template>
  <paper class="destination-list" :title="'城市列表'">

    <paper-header slot="paper-header"></paper-header>

    <card class="card-destination-list">

      <card-header slot="card-header" :title="'城市列表'">
      </card-header>

      <card-neck slot="card-neck">
        <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="searchDestinations"></text-input>
      </card-neck>

      <table-grid-2 :data_source="destinations">
        <table-grid-row v-for="destination in destinations">
          <table-grid-col :col_title="'城市名'">{{ destination.cn_name }}</table-grid-col>
          <table-grid-col :col_title="'分组数量'">{{ destination.group_num }}</table-grid-col>
          <table-grid-col :col_title="'商户数量'">{{ destination.merchant_num }}</table-grid-col>
          <table-grid-col :col_title="'Local数量'">{{ destination.local_product_num }}</table-grid-col>
          <table-grid-col :col_title="'机酒数量'">{{ destination.flight_product_num }}</table-grid-col>
          <table-grid-col :col_title="'操作'" :span="'100px'" :align="'right'">
            <btn :icon="'i-pencil'" :text="'详情'" @click.native="goDestinationDetail(destination)"></btn>
          </table-grid-col>
        </table-grid-row>
      </table-grid-2>
    </card>
  </paper>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        destinations: [],
        cur_search_word: ''
      };
    },
    mounted () {
      this.queryDestinations();
      this.$root.$emit('init-paper', '城市列表');
    },
    methods: {
      queryDestinations: function () {
        axios.get('/chef/api/operation/markWeApp/cities', {
          params: {
            search_word: this.cur_search_word
          }
        }).then(res => {
          this.destinations = res.data.data;
        });
      },
      searchDestinations: function () {
        this.cur_page_num = 1;
        this.queryDestinations();
      },
      goDestinationDetail: function (destination) {
        this.$router.push({
          name: 'operation_wxapp_bolo_city_detail',
          params: {
            city_code: destination.city_code,
            cn_name: destination.cn_name,
            tab: 'tag_merchant_groups'
          }
        });
      }
    }
  };
</script>
