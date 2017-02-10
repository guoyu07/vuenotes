<template>
  <card class="card-navigation-first-level">

    <card-header slot="card-header" :title="'第一级导航'">
      <btn :icon="'i-plus'" :text="'自定义'" :mood="'emphasis'"
           @click.native="addFirstLevel()"></btn>
    </card-header>

    <card-neck slot="card-neck">
      <tab :tabs="{ online: '已上线', editing: '编辑中' }" :cur_id="cur_filter_status"
           @switch-tab="switchFilterStatus"></tab>
    </card-neck>

    <table-grid-2 v-if="first_levels.length > 0" :data_source="first_levels" :use_sort="true" @do-sort="sortFirstLevel">
      <table-grid-row class="table-row" v-for="(first_level, index) in first_levels"
                      :is_highlight="first_level.id == first_level_id" :use_click="true"
                      @click.native="selectFirstLevel(first_level)">
        <table-grid-col class="table-td" :col_title="'名称(第二级导航数量)'">
          {{ first_level.show_title }}
        </table-grid-col>
        <table-grid-col class="table-td" :col_title="'操作'" :span="'90px'" :align="'right'">
          <btn :icon="'i-pencil'"
               @click.native.stop="renameFirstLevel(first_level)"></btn>
          <btn v-if="cur_filter_status == 'online'" :mood="'normal'" :text="'下线'"
               @click.native.stop="turnOnOrOffFirstLevel(first_level, 0)"></btn>
          <btn v-if="cur_filter_status == 'editing'" :mood="'success'" :text="'上线'"
               @click.native.stop="turnOnOrOffFirstLevel(first_level, 1)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!--新增自定义, 重命名弹窗-->
    <modal v-if="is_name_modal_show" size="small" @close-modal="is_name_modal_show = false">
      <card-custom-nav-info :custom_area="update_first_level"
                            :pid="'0'"
                            :have_hot_destinations="true"
                            @cancel-rename="is_name_modal_show = false"
                            @rename-or-added="renameOrAddedFirstLevel"></card-custom-nav-info>
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
        first_levels: [],
        cur_filter_status: 'online',
        is_name_modal_show: false,
        update_first_level: {}
      };
    },
    components: {
      'card-custom-nav-info': require('./card_custom_nav_info.vue')
    },
    computed: {
      first_level_id: function () {
        return this.$route.params.first_level_id;
      },
      second_level_id: function () {
        return this.$route.params.second_level_id;
      }
    },
    mounted () {
      this.queryFirstLevels();
      this.$root.$on('second-level-num-changed', num => {
        this.setSecondLevelNum(num);
      });
    },
    methods: {
      queryFirstLevels: function () {
        axios.get('/chef/api/operation/navigate/navigate', {
          params: {
            category: 3,
            status: STATUS[this.cur_filter_status]
          }
        }).then(res => {
          this.formatName(res.data.data);
          this.first_levels = res.data.data;
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
        this.$router.push({ name: 'operation_around_tour_nav' });
        this.first_levels = [];
        this.cur_filter_status = status;
        this.queryFirstLevels();
      },
      selectFirstLevel: function (first_level) {
        if (first_level.id === this.$route.params.first_level_id) return;
        if (first_level.type === '2') {
          this.$router.push({
            name: 'operation_around_tour_nav',
            params: {
              first_level_id: first_level.id,
              first_level_code: first_level.code
            }
          });
        } else {
          this.$router.push({
            name: 'operation_around_tour_nav',
            params: {
              first_level_id: first_level.id,
              first_level_code: 'default'
            }
          });
        }
      },
      turnOnOrOffFirstLevel: function (first_level, status) {
        first_level.status = status;
        axios.put('/chef/api/operation/navigate/navigate', first_level).then(res => {
          if (status !== STATUS[this.cur_filter_status] && first_level.id === this.first_level_id) {
            this.$router.push({ name: 'operation_around_tour_nav' });
          }
          this.queryFirstLevels();
        });
      },
      renameFirstLevel: function (first_level) {
        this.update_first_level = first_level;
        this.is_name_modal_show = true;
      },
      addFirstLevel: function () {
        this.update_first_level = { title: '', status: STATUS[this.cur_filter_status], type: '1', category: '3' };
        this.is_name_modal_show = true;
      },
      renameOrAddedFirstLevel: function () {
        this.is_name_modal_show = false;
        this.queryFirstLevels();
      },
      sortFirstLevel: function (first_level, new_index) {
        axios.put('/chef/api/operation/navigate/navigates', {
          pid: 0,
          id: first_level.id,
          new_index: new_index
        }).then(res => {
          this.queryProductGroups();
        });
      },
      setSecondLevelNum: function (num) {
        for (var i in this.first_levels) {
          if (this.first_levels[i].id === this.first_level_id) {
            this.first_levels[i].show_title = this.first_levels[i].title + ' (' + num + ')';
            this.first_levels[i].cn_name = this.first_levels[i].title;
          }
        }
      }
    }
  };
</script>
