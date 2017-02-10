<template>
  <card class="card-navigation-continent">

    <card-header slot="card-header" :title="'大洲&自定义组'">
      <btn v-if="cur_filter_status==='online'" :icon="'i-plus'" :text="'大洲'" :mood="'emphasis'"
           @click.native="is_continent_multiple_hunter_show = true"></btn>
      <btn :icon="'i-plus'" :text="'自定义'" :mood="'emphasis'"
           @click.native="addContinent()"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ online: '已上线', editing: '编辑中的自定义区域' }" :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
    </card-neck>

    <table-grid-2 v-if="continents.length > 0" :data_source="continents" :use_sort="true" @do-sort="sortContinent">
      <table-grid-row class="table-row" v-for="(continent, index) in continents"
                      :is_highlight="continent.id == continent_id" :use_click="true"
                      @click.native="selectContinent(continent)">
        <table-grid-col class="table-td" :col_title="'名称(国家数量)'">
          {{ continent.show_title }}
        </table-grid-col>
        <table-grid-col class="table-td" :col_title="'操作'" :span="'90px'" :align="'right'">
          <btn :icon="'i-pencil'"
               @click.native.stop="renameContinent(continent)"></btn>
          <btn v-if="cur_filter_status == 'online'" :mood="'normal'" :text="'下线'"
               @click.native.stop="turnOnOrOffContinent(continent, 0)"></btn>
          <btn v-if="cur_filter_status == 'editing'" :mood="'success'" :text="'上线'"
               @click.native.stop="turnOnOrOffContinent(continent, 1)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!--新增自定义, 重命名弹窗-->
    <modal v-if="is_name_modal_show" size="small" @close-modal="is_name_modal_show = false">
      <card-custom-nav-info :custom_area="update_continent"
                            :pid="'0'"
                            :have_hot_destinations="true"
                            @cancel-rename="is_name_modal_show = false"
                            @rename-or-added="renameOrAddedContinent"></card-custom-nav-info>
    </modal>

    <!-- 大洲多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_continent_multiple_hunter_show" @close-modal="is_continent_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择大洲'"></card-header>
      <multiple-hunter :type="'continent'" :cur_ids="continent_codes"
                       @cancel-hunt="is_continent_multiple_hunter_show = false"
                       @do-hunt="setContinentsForMultipleHunter"></multiple-hunter>
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
        continents: [],
        custom_continents: [],
        continent_codes: [],
        cur_filter_status: 'online',
        is_name_modal_show: false,
        update_continent: {},
        is_continent_multiple_hunter_show: false
      };
    },
    components: {
      'card-custom-nav-info': require('./card_custom_nav_info.vue')
    },
    computed: {
      continent_id: function () {
        return this.$route.params.continent_id;
      },
      country_id: function () {
        return this.$route.params.country_id;
      }
    },
    mounted () {
      this.queryContinents();
      this.$root.$on('country-num-changed', num => {
        this.setCountryNum(num);
      });
    },
    methods: {
      queryContinents: function () {
        axios.get('/chef/api/operation/navigate/navigate', {
          params: {
            status: STATUS[this.cur_filter_status]
          }
        }).then(res => {
          this.formatName(res.data.data);
          this.continent_codes = [];
          this.custom_continents = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].type === '2') {
              this.continent_codes.push(res.data.data[i].code);
            } else {
              this.custom_continents.push(res.data.data[i]);
            }
          }
          this.continents = res.data.data;
        });
      },
      formatName: function (data) {
        for (var item in data) {
          data[item].show_title = data[item].title + ' (' + data[item].child_navigate_count + ')';
          data[item].cn_name = data[item].title;
        }
      },
      switchFilterStatus: function (status) {
        if (this.cur_filter_status === status) {
          return;
        }
        this.$router.push({ name: 'operation_destination_nav' });
        this.continents = [];
        this.cur_filter_status = status;
        this.queryContinents();
      },
      selectContinent: function (continent) {
        if (continent.id === this.$route.params.continent_id) return;
        if (continent.type === '2') {
          this.$router.push({
            name: 'operation_destination_nav',
            params: {
              continent_id: continent.id,
              continent_code: continent.code
            }
          });
        } else {
          this.$router.push({
            name: 'operation_destination_nav',
            params: {
              continent_id: continent.id,
              continent_code: 'default'
            }
          });
        }
      },
      turnOnOrOffContinent: function (continent, status) {
        continent.status = status;
        axios.put('/chef/api/operation/navigate/navigate', continent).then(res => {
          if (status !== STATUS[this.cur_filter_status] && continent.id === this.continent_id) {
            this.$router.push({ name: 'operation_destination_nav' });
          }
          this.queryContinents();
        });
      },
      renameContinent: function (continent) {
        this.update_continent = continent;
        this.is_name_modal_show = true;
      },
      addContinent: function () {
        this.update_continent = { title: '', status: STATUS[this.cur_filter_status], type: '1' };
        this.is_name_modal_show = true;
      },
      renameOrAddedContinent: function () {
        this.is_name_modal_show = false;
        this.queryContinents();
      },
      sortContinent: function (continent, new_index) {
        axios.put('/chef/api/operation/navigate/navigates', {
          pid: 0,
          id: continent.id,
          new_index: new_index
        }).then(res => {
          this.queryProductGroups();
        });
      },
      setContinentsForMultipleHunter: function (continent_ids, continents) {
        this.is_continent_multiple_hunter_show = false;
        for (var i in continents) {
          continents[i].code = continents[i].continent_id;
          continents[i].type = '2';
          continents[i].title = '';
        }
        continents = continents.concat(this.custom_continents);
        axios.patch('/chef/api/operation/navigate/navigate', {
          pid: '0',
          children: continents
        }).then(res => {
          this.queryContinents();
        });
      },
      setCountryNum: function (num) {
        for (var i in this.continents) {
          if (this.continents[i].id === this.continent_id) {
            this.continents[i].show_title = this.continents[i].title + ' (' + num + ')';
            this.continents[i].cn_name = this.continents[i].title;
          }
        }
      }
    }
  };
</script>
