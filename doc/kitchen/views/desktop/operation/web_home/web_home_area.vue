<template>
  <paper class="web-home-area" :is_root_paper="false">

    <paper-header slot="paper-header">
      <su-selector slot="after_title"
                   v-model="area_id" :in_grid="true" :option_groups="area_selector_group"
                   @select-item="switchArea"></su-selector>
    </paper-header>

    <card class="text-center">
      <tab
        :tabs="area_id==100?{ banners: '头图', recommend: '推荐' }:{ banners: '头图', flight_and_hotel: '机酒自由行', local: '当地玩乐', around: '周边游', recommend: '推荐' }"
        :cur_id="cur_tab"
        @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card-ref-banners v-if="cur_tab === 'banners'" :ref_params="{ type: 1, code: area_id }"></card-ref-banners>
      <!--<card-ref-tags v-if="cur_tab === 'tags'" :ref_params="{ type: 1, code: area_id }"></card-ref-tags>-->
      <card-area-flight-and-hotel-group-list v-if="cur_tab === 'flight_and_hotel'" :pid="area_id" :type="'1'"
                                             :group_tab="'1'"></card-area-flight-and-hotel-group-list>
      <card-area-local-group-list v-if="cur_tab === 'local'" :pid="area_id" :type="'1'"
                                  :group_tab="'2'"></card-area-local-group-list>
      <card-area-around-group-list v-if="cur_tab === 'around'" :pid="area_id" :type="'1'"
                                   :group_tab="'3'"></card-area-around-group-list>
      <card-area-recommend-group-list v-if="cur_tab === 'recommend'" :pid="area_id" :type="'1'"
                                      :group_tab="'4'"></card-area-recommend-group-list>
    </keep-alive>

  </paper>
</template>

<script>
  const AREAS = {
    100: 'PC首页',
    99: 'H5首页 - 全国出发',
    3: 'H5首页 - 华东出发',
    2: 'H5首页 - 华北出发',
    1: 'H5首页 - 华南出发'
  };
  export default {
    data () {
      return {
        area_selector_group: [{
          name: 'PC',
          items: [{ id: 100, name: AREAS[100] }]
        }, {
          name: 'H5',
          items: [
            { id: 99, name: AREAS[99] },
            { id: 3, name: AREAS[3] },
            { id: 2, name: AREAS[2] },
            { id: 1, name: AREAS[1] }
          ]
        }]
      };
    },
    computed: {
      area_id: function () {
        return this.$route.params.area_id;
      },
      cur_tab: function () {
        return this.$route.params.tab;
      }
    },
    components: {
      'card-ref-banners': require('../_components/banner/card_ref_banners'),
//      'card-ref-tags': require('../_components/tag/card_ref_tags'),
      'card-area-flight-and-hotel-group-list': require('../_components/card_ref_groups'),
      'card-area-local-group-list': require('../_components/card_ref_groups'),
      'card-area-around-group-list': require('../_components/card_ref_groups'),
      'card-area-recommend-group-list': require('../_components/card_ref_groups')
    },
    mounted () {
      this.$root.$emit('init-paper', '首页运营');
    },
    methods: {
      switchArea: function (area) {
        this.$router.push({
          name: 'operation_web_home_area',
          params: { area_id: area.id }
        });
        this.$nextTick(() => {
          this.$root.$emit('switch-home-area');
        });
      },
      switchTab: function (cur_tab) {
        this.$router.push({
          name: 'operation_web_home_area',
          params: { area_id: this.area_id, tab: cur_tab }
        });
      }
    }
  };
</script>
