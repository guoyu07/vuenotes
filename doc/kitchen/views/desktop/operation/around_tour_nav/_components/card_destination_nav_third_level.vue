<template>
  <card class="card-navigation-third-level">
    <card-header slot="card-header" :title="'目的地'">
      <btn :icon="'i-plus'" :text="'目的地'" :mood="'emphasis'"
           @click.native="is_third_level_multiple_hunter_show = true"></btn>
    </card-header>

    <card-neck v-if="third_levels.length > 0" slot="card-neck">
      <tab :tabs="{ online: '已上线'}"
           :cur_id="'online'"></tab>
    </card-neck>


    <table-grid-2 v-if="third_levels.length > 0" :data_source="third_levels" :use_sort="true" @do-sort="sortThirdLevel">
      <table-grid-row class="table-row" v-for="(third_level, index) in third_levels">
        <table-grid-col class="table-td" :col_title="'名称(local数量,机酒数量)'">{{ third_level.show_title }}
        </table-grid-col>
        <table-grid-col class="table-td" :col_title="'操作'" :span="'90px'" :align="'right'">
          <btn :icon="third_level.recommend=='0'?'i-star-empty':'i-star-full'" @click.native="isHotThirdLevel(third_level)"></btn>
          <btn :mood="'normal'" :text="'下线'" @click.native="turnOffThirdLevel(third_level)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 城市多选弹窗 含初始值 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_third_level_multiple_hunter_show"
           @close-modal="is_third_level_multiple_hunter_show = false">
      <card-header slot="modal-header" :title="'选择目的地'"></card-header>
      <multiple-hunter :type="'destination'"
                       :cur_ids="third_level_codes"
                       :in_countries="second_level_codes"
                       @cancel-hunt="is_third_level_multiple_hunter_show = false"
                       @do-hunt="setThirdLevelsForMultipleHunter"></multiple-hunter>
    </modal>
  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        third_levels: [],
        is_third_level_multiple_hunter_show: false,
        third_level_codes: []
      };
    },
    computed: {
      first_level_id: function () {
        return this.$route.params.first_level_id;
      },
      second_level_id: function () {
        return this.$route.params.second_level_id;
      },
      second_level_codes: function () {
        if (this.$route.params.second_level_code === 'default') {
          return [];
        } else {
          return [this.$route.params.second_level_code];
        }
      }
    },
    watch: {
      second_level_id: function () {
        this.queryThirdLevels();
      }
    },
    mounted () {
      this.queryThirdLevels();
    },
    methods: {
      queryThirdLevels: function () {
        axios.get('/chef/api/operation/navigate/navigate', {
          params: {
            id: this.second_level_id,
            category: 3,
            status: 1
          }
        }).then(res => {
          this.formatName(res.data.data);
          this.$root.$emit('third-level-num-changed', res.data.data.length);
          this.third_level_codes = [];
          for (var i = 0; i < res.data.data.length; i++) {
            this.third_level_codes.push(res.data.data[i].code);
          }
          this.third_levels = res.data.data;
        });
      },
      formatName: function (data) {
        for (var item in data) {
          data[item].show_title = data[item].title + ' (' + data[item].local_product_num + ',' + data[item].flight_product_num + ')';
          data[item].cn_name = data[item].title;
          data[item].third_level_code = data[item].code;
        }
      },
      selectThirdLevel: function (third_level) {
        this.$router.push({
          name: 'operation_destination_nav',
          params: { first_level_id: this.$route.params.first_level_id, third_level_id: third_level.id }
        });
      },
      turnOffThirdLevel: function (third_level) {
        third_level.status = '0';
        axios.put('/chef/api/operation/navigate/navigate', third_level).then(res => {
          this.queryThirdLevels();
        });
      },
      isHotThirdLevel: function (third_level) {
        if (third_level.recommend === '0') {
          third_level.recommend = '1';
        } else {
          third_level.recommend = '0';
        }
        axios.put('/chef/api/operation/navigate/navigate', third_level).then(res => {
          this.queryThirdLevels();
        });
      },
      sortThirdLevel: function (third_level, new_index) {
        axios.put('/chef/api/operation/navigate/navigates', {
          pid: this.second_level_id,
          id: third_level.id,
          new_index: new_index
        }).then(res => {
          this.queryThirdLevels();
        });
      },
      setThirdLevelsForMultipleHunter: function (third_level_codes, third_levels) {
        this.is_third_level_multiple_hunter_show = false;
        third_levels.map(third_level => {
          this.$route.params.second_level_code === 'default' ? third_level.code = third_level.destination_code : third_level.code = third_level.third_level_code;
          this.$route.params.second_level_code === 'default' ? third_level.type = third_level.type : third_level.type = '4';
          third_level.title = '';
          third_level.category = 3;
        });
        axios.patch('/chef/api/operation/navigate/navigate', {
          pid: this.$route.params.second_level_id,
          children: third_levels
        }).then(res => {
          this.queryThirdLevels();
        });
      }
    }
  };
</script>
