<template>
  <paper class="web-home-destination" :is_root_paper="false">

    <paper-header slot="paper-header"></paper-header>

    <card class="text-center">
      <tab
        :tabs="country_code=='CN'?{ flight_and_hotel: '机酒自由行', local: '当地玩乐', around: '周边游' }:{ flight_and_hotel: '机酒自由行', local: '当地玩乐' }"
        :cur_id="cur_tab"
        @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <!--<card-ref-banners v-if="cur_tab === 'banners'"-->
                        <!--:ref_params="{ type: dest_type, code: dest_id }"></card-ref-banners>-->
      <!--<card-ref-tags v-if="cur_tab === 'tags'" :ref_params="{ type: dest_type, code: dest_id }"></card-ref-tags>-->
      <card-area-flight-and-hotel-group-list v-if="cur_tab === 'flight_and_hotel'" :pid="dest_id" :type="dest_type"
                                             :group_tab="'1'"></card-area-flight-and-hotel-group-list>
      <card-area-local-group-list v-if="cur_tab === 'local'" :pid="dest_id" :type="dest_type"
                                  :group_tab="'2'"></card-area-local-group-list>
      <card-area-around-group-list v-if="cur_tab === 'around'" :pid="dest_id" :type="dest_type"
                                   :group_tab="'3'"></card-area-around-group-list>
      <card-area-recommend-group-list v-if="cur_tab === 'recommend'" :pid="dest_id" :type="dest_type"
                                      :group_tab="'4'"></card-area-recommend-group-list>
    </keep-alive>
  </paper>
</template>

<script>
  export default {
    data () {
      return {
        group_tab: '1'
      };
    },
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      },
      dest_id: function () {
        return this.$route.params.dest_id;
      },
      dest_type: function () {
        return this.$route.params.dest_type;
      },
      country_code: function () {
        return this.$route.params.country_code;
      }
    },
    components: {
//      'card-ref-banners': require('../_components/banner/card_ref_banners'),
//      'card-ref-tags': require('../_components/tag/card_ref_tags'),
      'card-area-flight-and-hotel-group-list': require('../_components/card_ref_groups'),
      'card-area-local-group-list': require('../_components/card_ref_groups'),
      'card-area-around-group-list': require('../_components/card_ref_groups'),
      'card-area-recommend-group-list': require('../_components/card_ref_groups')
    },
    mounted () {
      this.$root.$emit('init-paper', '目的地页 - ' + this.$route.params.dest_title);
    },
    methods: {
      switchTab: function (cur_tab) {
        this.cur_tab = cur_tab;
        this.$router.push({
          name: 'operation_web_dest_detail',
          params: {
            dest_id: this.$route.params.dest_id,
            dest_title: this.$route.params.dest_title,
            dest_type: this.$route.params.dest_type,
            tab: cur_tab,
            country_code: this.$route.params.country_code
          }
        });
      }
    }
  };
</script>
