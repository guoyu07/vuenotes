<template>
  <card class="card-navigation-second-level">

    <card-header slot="card-header" :title="'第二级导航'">
      <btn :icon="'i-plus'" :text="'自定义'" :mood="'emphasis'"
           @click.native="addCustomArea()"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ online: '已上线', editing: '编辑中的自定义区域'}"
           :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
    </card-neck>

    <table-grid-2 v-if="second_levels.length > 0" :data_source="second_levels" :use_sort="true" @do-sort="sortSecondLevel">
      <table-grid-row class="table-row" v-for="(second_level, index) in second_levels"
                      :is_highlight="second_level.id == second_level_id" :use_click="true"
                      @click.native="selectSecondLevel(second_level)">
        <table-grid-col class="table-td" :col_title="'名称(目的地数量)'">{{ second_level.show_title }}
        </table-grid-col>
        <table-grid-col class="table-td" :col_title="'操作'" :span="'120px'" :align="'right'">
          <btn v-if="second_level.type == '1'" :icon="'i-pencil'"
               @click.native.stop="renameCustomArea(second_level)"></btn>
          <btn v-if="cur_filter_status == 'online'" :mood="'normal'" :text="'下线'"
               @click.native.stop="turnOnOrOffSecondLevel(second_level, 0)"></btn>
          <btn v-if="cur_filter_status == 'editing'" :mood="'success'" :text="'上线'"
               @click.native.stop="turnOnOrOffSecondLevel(second_level, 1)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>
    <!--新增自定义, 重命名弹窗-->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_name_modal_show" :size="'small'" @close-modal="is_name_modal_show = false">
      <card-custom-nav-info :custom_area="update_custom_area"
                            :pid="first_level_id"
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
        second_levels: [],
        cur_filter_status: 'online',
        is_name_modal_show: false,
        update_custom_area: {}
      };
    },
    components: {
      'card-custom-nav-info': require('./card_custom_nav_info.vue')
    },
    computed: {
      first_level_id: function () {
        return this.$route.params.first_level_id;
      },
      first_level_codes: function () {
        if (this.$route.params.first_level_code === 'default') {
          return [];
        } else {
          return [this.$route.params.first_level_code];
        }
      },
      second_level_id: function () {
        return this.$route.params.second_level_id;
      }
    },
    watch: {
      first_level_id: function () {
        this.cur_filter_status = 'online';
        this.querySecondLevels();
      }
    },
    mounted () {
      this.querySecondLevels();
      this.$root.$on('third-level-num-changed', num => {
        this.setThirdLevelNum(num);
      });
    },
    methods: {
      querySecondLevels: function () {
        axios.get('/chef/api/operation/navigate/navigate', {
          params: {
            id: this.first_level_id,
            category: 3,
            status: STATUS[this.cur_filter_status]
          }
        }).then(res => {
          this.formatName(res.data.data);
          if (this.cur_filter_status === 'online') {
            this.$root.$emit('second-level-num-changed', res.data.data.length);
          }
          this.second_levels = res.data.data;
        });
      },
      formatName: function (data) {
        for (var item in data) {
          data[item].show_title = data[item].title + ' (' + data[item].child_navigate_count + ')';
          data[item].cn_name = data[item].title;
          data[item].second_level_code = data[item].code;
        }
      },
      switchFilterStatus: function (status) {
        if (this.cur_filter_status === status) {
          return;
        }
        this.$router.push({
          name: 'operation_around_tour_nav',
          params: {
            first_level_id: this.first_level_id,
            first_level_code: this.$route.params.first_level_code
          }
        });
        this.second_levels = [];
        this.cur_filter_status = status;
        this.querySecondLevels();
      },
      selectSecondLevel: function (second_level) {
        if (second_level.id === this.second_level_id) return;
        if (second_level.type === '3') {
          this.$router.push({
            name: 'operation_around_tour_nav',
            params: {
              first_level_id: this.$route.params.first_level_id,
              first_level_code: this.$route.params.first_level_code,
              second_level_id: second_level.id,
              second_level_code: second_level.code
            }
          });
        } else {
          this.$router.push({
            name: 'operation_around_tour_nav',
            params: {
              first_level_id: this.$route.params.first_level_id,
              first_level_code: this.$route.params.first_level_code,
              second_level_id: second_level.id,
              second_level_code: 'default'
            }
          });
        }
      },
      turnOnOrOffSecondLevel: function (second_level, status) {
        second_level.status = status;
        axios.put('/chef/api/operation/navigate/navigate', second_level).then(res => {
          if (status !== STATUS[this.cur_filter_status] && second_level.id === this.second_level_id) {
            this.$router.push({
              name: 'operation_around_tour_nav',
              params: {
                first_level_id: this.first_level_id,
                first_level_code: this.$route.params.first_level_code
              }
            });
          }
          this.querySecondLevels();
        });
      },
      renameCustomArea: function (second_level) {
        this.update_custom_area = second_level;
        this.is_name_modal_show = true;
      },
      addCustomArea: function () {
        this.update_custom_area = { title: '', status: STATUS[this.cur_filter_status], type: '1', category: '3' };
        this.is_name_modal_show = true;
      },
      renameOrAddedCustomArea: function () {
        this.is_name_modal_show = false;
        this.querySecondLevels();
      },
      isHotSecondLevel: function (second_level) {
        if (second_level.recommend === '0') {
          second_level.recommend = '1';
        } else {
          second_level.recommend = '0';
        }
        axios.put('/chef/api/operation/navigate/navigate', second_level).then(res => {
          this.querySecondLevels();
        });
      },
      sortSecondLevel: function (second_level, new_index) {
        axios.put('/chef/api/operation/navigate/navigates', {
          pid: this.first_level_id,
          id: second_level.id,
          new_index: new_index
        }).then(res => {
          this.querySecondLevels();
        });
      },
      setThirdLevelNum: function (num) {
        for (var i in this.second_levels) {
          if (this.second_levels[i].id === this.second_level_id) {
            this.second_levels[i].show_title = this.second_levels[i].title + ' (' + num + ')';
            this.second_levels[i].cn_name = this.second_levels[i].title;
          }
        }
      }
    }
  };
</script>
