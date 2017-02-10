<template>
  <paper class="web-home-destination" :is_root_paper="false">

    <paper-header slot="paper-header"></paper-header>

    <card class="text-center">
      <tab :tabs="{ tag_merchant_groups: '标签商户分组', merchant_groups: '商户分组'}"
           :cur_id="cur_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card-area-ref-tag-merchant-groups v-if="cur_tab == 'tag_merchant_groups'"></card-area-ref-tag-merchant-groups>
      <card-area-ref-merchant-groups v-if="cur_tab == 'merchant_groups'" :city_code="city_code"></card-area-ref-merchant-groups>
    </keep-alive>

  </paper>
</template>

<script>
  export default {
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      },
      city_code: function () {
        return this.$route.params.city_code;
      }
    },
    components: {
      'card-area-ref-tag-merchant-groups': require('./_components/card_ref_tag_merchant_groups'),
      'card-area-ref-merchant-groups': require('./_components/card_ref_merchant_groups')
    },
    mounted () {
      this.$root.$emit('init-paper', '城市页 - ' + this.$route.params.cn_name);
    },
    methods: {
      switchTab: function (cur_tab) {
        this.cur_tab = cur_tab;
        this.$router.push({
          name: 'operation_wxapp_bolo_city_detail',
          params: {
            city_code: this.$route.params.city_code,
            cn_name: this.$route.params.cn_name,
            tab: cur_tab
          }
        });
      }
    }
  };
</script>
