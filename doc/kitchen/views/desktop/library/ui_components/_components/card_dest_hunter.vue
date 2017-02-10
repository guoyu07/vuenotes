<template>
  <card class="card-dest-hunter">

    <card-header slot="card-header" :title="'City / Country / Area hunter'"></card-header>

    <g-row :spacing="1">
      <g-col :span="'1/2'">
        <grid-input :title="'City Multiple Hunter'">
          <span v-for="city in cities">{{ city.cn_name }} | </span>
          <btn :text="'Hunt Cities'" :mood="'emphasis'" @click.native="is_city_multiple_hunter_show = true"></btn>
        </grid-input>
      </g-col>
      <g-col :span="'1/2'">
        <grid-input :title="'City Multiple Hunter (含初始值、限制泰国)'">
          <span v-for="city in cities_with_default">{{ city.cn_name }} | </span>
          <btn :text="'Hunt Cities'" @click.native="is_city_multiple_hunter_with_default_show = true"></btn>
        </grid-input>
      </g-col>
      <g-col :span="'1/2'">
        <grid-input :title="'City Single Hunter'">
          <btn :text="'Coming soon'"></btn>
        </grid-input>
      </g-col>
    </g-row>

    <!-- 城市多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_city_multiple_hunter_show" @close-modal="is_city_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择城市'"></card-header>
      <multiple-hunter :type="'city'"
                       @cancel-hunt="is_city_multiple_hunter_show = false"
                       @do-hunt="setCitiesForMultipleHunter"></multiple-hunter>
    </modal>

    <!-- 城市多选弹窗 含初始值 限制泰国 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_city_multiple_hunter_with_default_show"
           @close-modal="is_city_multiple_hunter_with_default_show = false">
      <card-header slot="modal-header" :title="'选择城市'"></card-header>
      <multiple-hunter :type="'city'" :cur_ids="city_codes_with_default" :in_countries="['TH']"
                       @cancel-hunt="is_city_multiple_hunter_with_default_show = false"
                       @do-hunt="setCitiesForMultipleHunterWithDefault"></multiple-hunter>
    </modal>


    <g-row :spacing="1" :break_row="1">
      <g-col :span="'1/2'">
        <grid-input :title="'Country Multiple Hunter (含初始值, 限制亚洲)'">
          <span v-for="country in countries_with_default">{{ country.cn_name }} | </span>
          <btn :text="'Hunt countries'" @click.native="is_country_multiple_hunter_with_default_show = true"></btn>
        </grid-input>
      </g-col>
      <g-col :span="'1/2'">
        <grid-input :title="'Country Single Hunter'">
          <btn :text="'Coming soon'"></btn>
        </grid-input>
      </g-col>
    </g-row>

    <!-- 国家多选弹窗 含初始值 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_country_multiple_hunter_with_default_show"
           @close-modal="is_country_multiple_hunter_with_default_show = false">
      <card-header slot="modal-header" :title="'选择国家'"></card-header>
      <multiple-hunter :type="'country'" :cur_ids="country_codes_with_default" :in_continents="[1]"
                       @cancel-hunt="is_country_multiple_hunter_with_default_show = false"
                       @do-hunt="setCountriesForMultipleHunterWithDefault"></multiple-hunter>
    </modal>


    <g-row :spacing="1" :break_row="1">
      <g-col :span="'1/2'">
        <grid-input :title="'Continent Multiple Hunter (含初始值, 限制亚洲)'">
          <span v-for="continent in continents">{{ continent.cn_name }} | </span>
          <btn :text="'Hunt continents'" @click.native="is_continent_multiple_hunter_show = true"></btn>
        </grid-input>
      </g-col>
      <g-col :span="'1/2'">
        <grid-input :title="'Continent Single Hunter'">
          <btn :text="'Coming soon'"></btn>
        </grid-input>
      </g-col>
    </g-row>

    <!-- 大洲多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_continent_multiple_hunter_show" @close-modal="is_continent_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择大洲'"></card-header>
      <multiple-hunter :type="'continent'"
                       @cancel-hunt="is_continent_multiple_hunter_show = false"
                       @do-hunt="setContinentsForMultipleHunter"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  export default {
    data () {
      return {
        // 城市
        cities: [],
        is_city_multiple_hunter_show: false,
        //
        cities_with_default: [{ city_code: 'HKT', cn_name: '普吉岛' }],
        city_codes_with_default: ['HKT'],
        is_city_multiple_hunter_with_default_show: false,
        // 国家
        countries: [],
        is_country_multiple_hunter_show: false,
        //
        countries_with_default: [{ city_code: 'JP', cn_name: '日本' }],
        country_codes_with_default: ['JP'],
        is_country_multiple_hunter_with_default_show: false,
        // 大洲
        continents: [],
        is_continent_multiple_hunter_show: false
      };
    },
    methods: {
      setCitiesForMultipleHunter: function (city_codes, cities) {
        this.is_city_multiple_hunter_show = false;
        this.cities = cities;
      },
      setCitiesForMultipleHunterWithDefault: function (city_codes, cities) {
        this.is_city_multiple_hunter_with_default_show = false;
        this.cities_with_default = cities;
      },
      setCountriesForMultipleHunterWithDefault: function (country_codes, countries) {
        this.is_country_multiple_hunter_with_default_show = false;
        this.countries_with_default = countries;
      },
      setContinentsForMultipleHunter: function (continent_ids, continents) {
        this.is_continent_multiple_hunter_show = false;
        this.continents = continents;
      }
    }
  };
</script>
