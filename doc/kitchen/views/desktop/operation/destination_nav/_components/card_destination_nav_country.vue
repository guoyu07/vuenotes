<template>
  <card class="card-navigation-country">

    <card-header slot="card-header" :title="'国家&自定义组'">
      <btn v-if="cur_filter_status==='online'" :icon="'i-plus'" :text="'国家'" :mood="'emphasis'"
           @click.native="is_country_multiple_hunter_show = true"></btn>
      <btn :icon="'i-plus'" :text="'自定义'" :mood="'emphasis'"
           @click.native="addCustomArea()"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ online: '已上线', editing: '编辑中的自定义区域'}"
           :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
    </card-neck>

    <table-grid-2 v-if="countries.length > 0" :data_source="countries" :use_sort="true" @do-sort="sortCountry">
      <table-grid-row class="table-row" v-for="(country, index) in countries"
                      :is_highlight="country.id == country_id" :use_click="true"
                      @click.native="selectCountry(country)">
        <table-grid-col class="table-td" :col_title="'名称(城市数量)'">{{ country.show_title }}
        </table-grid-col>
        <table-grid-col class="table-td" :col_title="'操作'" :span="'120px'" :align="'right'">
          <btn v-if="country.type == '1'" :icon="'i-pencil'"
               @click.native.stop="renameCustomArea(country)"></btn>
          <!--<btn :icon="country.recommend=='0'?'i-star-empty':'i-star-full'" @click.native.stop="isHotCountry(country)"></btn>-->
          <btn v-if="cur_filter_status == 'online'" :mood="'normal'" :text="'下线'"
               @click.native.stop="turnOnOrOffCountry(country, 0)"></btn>
          <btn v-if="cur_filter_status == 'editing'" :mood="'success'" :text="'上线'"
               @click.native.stop="turnOnOrOffCountry(country, 1)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 国家多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_country_multiple_hunter_show"
           @close-modal="is_country_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择国家'"></card-header>
      <multiple-hunter :type="'country'" :cur_ids="country_codes" :in_continents="continent_codes"
                       @cancel-hunt="is_country_multiple_hunter_show = false"
                       @do-hunt="setCountriesForMultipleHunter"></multiple-hunter>
    </modal>

    <!--新增自定义, 重命名弹窗-->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_name_modal_show" :size="'small'" @close-modal="is_name_modal_show = false">
      <card-custom-nav-info :custom_area="update_custom_area"
                            :pid="continent_id"
                            :have_hot_destinations="false"
                            @cancel-rename="is_name_modal_show = false"
                            @rename-or-added="renameOrAddedCustomArea"></card-custom-nav-info>
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
    data () {
      return {
        countries: [],
        custom_areas: [],
        country_codes: [],
        cur_filter_status: 'online',
        is_name_modal_show: false,
        update_custom_area: {},
        is_country_multiple_hunter_show: false
      };
    },
    components: {
      'card-custom-nav-info': require('./card_custom_nav_info.vue')
    },
    computed: {
      continent_id: function () {
        return this.$route.params.continent_id;
      },
      continent_codes: function () {
        if (this.$route.params.continent_code === 'default') {
          return [];
        } else {
          return [this.$route.params.continent_code];
        }
      },
      country_id: function () {
        return this.$route.params.country_id;
      }
    },
    watch: {
      continent_id: function () {
        this.cur_filter_status = 'online';
        this.queryCountries();
      }
    },
    mounted () {
      this.queryCountries();
      this.$root.$on('city-num-changed', num => {
        this.setCityNum(num);
      });
    },
    methods: {
      queryCountries: function () {
        axios.get('/chef/api/operation/navigate/navigate', {
          params: {
            id: this.continent_id,
            status: STATUS[this.cur_filter_status]
          }
        }).then(res => {
          this.formatName(res.data.data);
          if (this.cur_filter_status === 'online') {
            this.$root.$emit('country-num-changed', res.data.data.length);
          }
          this.country_codes = [];
          this.custom_areas = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].type === '3') {
              this.country_codes.push(res.data.data[i].code);
            } else {
              this.custom_areas.push(res.data.data[i]);
            }
          }
          this.countries = res.data.data;
        });
      },
      formatName: function (data) {
        for (var item in data) {
          data[item].show_title = data[item].title + ' (' + data[item].child_navigate_count + ')';
          data[item].cn_name = data[item].title;
          data[item].country_code = data[item].code;
        }
      },
      switchFilterStatus: function (status) {
        if (this.cur_filter_status === status) {
          return;
        }
        this.$router.push({
          name: 'operation_destination_nav',
          params: {
            continent_id: this.continent_id,
            continent_code: this.$route.params.continent_code
          }
        });
        this.countries = [];
        this.cur_filter_status = status;
        this.queryCountries();
      },
      selectCountry: function (country) {
        if (country.id === this.country_id) return;
        if (country.type === '3') {
          this.$router.push({
            name: 'operation_destination_nav',
            params: {
              continent_id: this.$route.params.continent_id,
              continent_code: this.$route.params.continent_code,
              country_id: country.id,
              country_code: country.code
            }
          });
        } else {
          this.$router.push({
            name: 'operation_destination_nav',
            params: {
              continent_id: this.$route.params.continent_id,
              continent_code: this.$route.params.continent_code,
              country_id: country.id,
              country_code: 'default'
            }
          });
        }
      },
      turnOnOrOffCountry: function (country, status) {
        country.status = status;
        axios.put('/chef/api/operation/navigate/navigate', country).then(res => {
          if (status !== STATUS[this.cur_filter_status] && country.id === this.country_id) {
            this.$router.push({
              name: 'operation_destination_nav',
              params: {
                continent_id: this.continent_id,
                continent_code: this.$route.params.continent_code
              }
            });
          }
          this.queryCountries();
        });
      },
      renameCustomArea: function (country) {
        this.update_custom_area = country;
        this.is_name_modal_show = true;
      },
      addCustomArea: function () {
        this.update_custom_area = { title: '', status: STATUS[this.cur_filter_status], type: '1' };
        this.is_name_modal_show = true;
      },
      renameOrAddedCustomArea: function () {
        this.is_name_modal_show = false;
        this.queryCountries();
      },
      isHotCountry: function (country) {
        if (country.recommend === '0') {
          country.recommend = '1';
        } else {
          country.recommend = '0';
        }
        axios.put('/chef/api/operation/navigate/navigate', country).then(res => {
          this.queryCountries();
        });
      },
      sortCountry: function (country, new_index) {
        axios.put('/chef/api/operation/navigate/navigates', {
          pid: this.continent_id,
          id: country.id,
          new_index: new_index
        }).then(res => {
          this.queryCountries();
        });
      },
      setCountriesForMultipleHunter: function (country_codes, countries) {
        this.is_country_multiple_hunter_show = false;
        countries.map(country => {
          country.code = country.country_code;
          country.type = '3';
          country.title = '';
        });
        countries = countries.concat(this.custom_areas);
        axios.patch('/chef/api/operation/navigate/navigate', {
          pid: this.$route.params.continent_id,
          children: countries
        }).then(res => {
          this.queryCountries();
        });
      },
      setCityNum: function (num) {
        for (var i in this.countries) {
          if (this.countries[i].id === this.country_id) {
            this.countries[i].show_title = this.countries[i].title + ' (' + num + ')';
            this.countries[i].cn_name = this.countries[i].title;
          }
        }
      }
    }
  };
</script>
