<template>
  <paper class="destination-list" :title="'目的地列表'">

    <paper-header slot="paper-header"></paper-header>

    <card class="card-destination-list">

      <card-header slot="card-header" :title="'目的地列表'">
      </card-header>

      <card-neck slot="card-neck">
        <tab :tabs="{ city: '城市', country: '国家'}"
             :cur_id="cur_filter"
             @switch-tab="switchFilter"></tab>
        <text-input v-model="cur_search_word" :icon="'i-search'" @keyup-enter="searchDestinations"></text-input>
      </card-neck>

      <table-grid-2 :data_source="destinations">
        <table-grid-row v-for="destination in destinations">
          <table-grid-col :col_title="'城市名'">{{ destination.cn_name }}</table-grid-col>
          <table-grid-col :col_title="'Banner数量'">{{ destination.banner_num }}</table-grid-col>
          <table-grid-col :col_title="'分组数量'">{{ destination.group_num }}</table-grid-col>
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

  const STATUS = {
    'city': '3',
    'country': '2'
  };
  export default {
    data () {
      return {
        destinations: [],
        cur_filter: 'city',
        cur_search_word: ''
      };
    },
    mounted () {
      this.queryDestinations();
      this.$root.$emit('init-paper', '目的地列表');
    },
    methods: {
      queryDestinations: function () {
        switch (this.cur_filter) {
          case 'city':
            axios.get('/chef/api/operation/operation/OperationCities', {
              params: {
                search_word: this.cur_search_word
              }
            }).then(res => {
              this.destinations = res.data.data;
            });
            break;
          case 'country':
            axios.get('/chef/api/operation/operation/OperationCountries', {
              params: {
                search_word: this.cur_search_word
              }
            }).then(res => {
              this.destinations = res.data.data;
            });
        }
      },
      searchDestinations: function () {
        this.cur_page_num = 1;
        this.queryDestinations();
      },
      switchFilter: function (type) {
        this.cur_filter = type;
        this.queryDestinations();
      },
      goDestinationDetail: function (destination) {
        switch (this.cur_filter) {
          case 'city':
            this.$router.push({
              name: 'operation_web_dest_detail',
              params: {
                dest_id: destination.city_code,
                dest_title: destination.cn_name,
                dest_type: STATUS[this.cur_filter],
                tab: 'flight_and_hotel',
                country_code: destination.country_code
              }
            });
            break;
          case 'country':
            this.$router.push({
              name: 'operation_web_dest_detail',
              params: {
                dest_id: destination.country_code,
                dest_title: destination.cn_name,
                dest_type: STATUS[this.cur_filter],
                tab: 'flight_and_hotel',
                country_code: destination.country_code
              }
            });
        }
      }
    }
  };
</script>
