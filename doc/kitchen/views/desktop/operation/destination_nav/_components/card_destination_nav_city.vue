<template>
  <card class="card-navigation-city">
    <card-header slot="card-header" :title="this.$route.params.country_code=='default'?'目的地':'城市'">
      <btn :icon="'i-plus'" :text="this.$route.params.country_code=='default'?'目的地':'城市'" :mood="'emphasis'"
           @click.native="is_city_multiple_hunter_show = true"></btn>
    </card-header>

    <card-neck v-if="cities.length > 0" slot="card-neck">
      <tab :tabs="{ online: '已上线'}"
           :cur_id="'online'"></tab>
    </card-neck>


    <table-grid-2 v-if="cities.length > 0" :data_source="cities" :use_sort="true" @do-sort="sortCity">
      <table-grid-row class="table-row" v-for="(city, index) in cities">
        <table-grid-col class="table-td" :col_title="'名称(local数量,机酒数量)'">{{ city.show_title }}
        </table-grid-col>
        <table-grid-col class="table-td" :col_title="'操作'" :span="'90px'" :align="'right'">
          <btn :icon="city.recommend=='0'?'i-star-empty':'i-star-full'" @click.native="isHotCity(city)"></btn>
          <btn :mood="'normal'" :text="'下线'" @click.native="turnOffCity(city)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 城市多选弹窗 含初始值 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_city_multiple_hunter_show"
           @close-modal="is_city_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="this.$route.params.country_code=='default'?'选择目的地':'选择城市'"></card-header>
      <multiple-hunter :type="this.$route.params.country_code=='default'?'destination':'city'"
                       :cur_ids="city_codes"
                       :in_countries="country_codes"
                       @cancel-hunt="is_city_multiple_hunter_show = false"
                       @do-hunt="setCitiesForMultipleHunter"></multiple-hunter>
    </modal>
  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        cities: [],
        is_city_multiple_hunter_show: false,
        city_codes: []
      };
    },
    computed: {
      continent_id: function () {
        return this.$route.params.continent_id;
      },
      country_id: function () {
        return this.$route.params.country_id;
      },
      country_codes: function () {
        if (this.$route.params.country_code === 'default') {
          return [];
        } else {
          return [this.$route.params.country_code];
        }
      }
    },
    watch: {
      country_id: function () {
        this.queryCities();
      }
    },
    mounted () {
      this.queryCities();
    },
    methods: {
      queryCities: function () {
        axios.get('/chef/api/operation/navigate/navigate', {
          params: {
            id: this.country_id,
            status: 1
          }
        }).then(res => {
          this.formatName(res.data.data);
          this.$root.$emit('city-num-changed', res.data.data.length);
          this.city_codes = [];
          for (var i = 0; i < res.data.data.length; i++) {
            this.city_codes.push(res.data.data[i].code);
          }
          this.cities = res.data.data;
        });
      },
      formatName: function (data) {
        for (var item in data) {
          data[item].show_title = data[item].title + ' (' + data[item].local_product_num + ',' + data[item].flight_product_num + ')';
          data[item].cn_name = data[item].title;
          data[item].city_code = data[item].code;
        }
      },
      selectCity: function (city) {
        this.$router.push({
          name: 'operation_destination_nav',
          params: { continent_id: this.$route.params.continent_id, city_id: city.id }
        });
      },
      turnOffCity: function (city) {
        city.status = '0';
        axios.put('/chef/api/operation/navigate/navigate', city).then(res => {
          this.queryCities();
        });
      },
      isHotCity: function (city) {
        if (city.recommend === '0') {
          city.recommend = '1';
        } else {
          city.recommend = '0';
        }
        axios.put('/chef/api/operation/navigate/navigate', city).then(res => {
          this.queryCities();
        });
      },
      sortCity: function (city, new_index) {
        axios.put('/chef/api/operation/navigate/navigates', {
          pid: this.country_id,
          id: city.id,
          new_index: new_index
        }).then(res => {
          this.queryCities();
        });
      },
      setCitiesForMultipleHunter: function (city_codes, cities) {
        this.is_city_multiple_hunter_show = false;
        cities.map(city => {
          this.$route.params.country_code === 'default' ? city.code = city.destination_code : city.code = city.city_code;
          this.$route.params.country_code === 'default' ? city.type = city.type : city.type = '4';
          city.title = '';
        });
        axios.patch('/chef/api/operation/navigate/navigate', {
          pid: this.$route.params.country_id,
          children: cities
        }).then(res => {
          this.queryCities();
        });
      }
    }
  };
</script>
