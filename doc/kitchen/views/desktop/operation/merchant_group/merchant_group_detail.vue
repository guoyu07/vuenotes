<template>
  <paper class="paper-merchant-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="true" @do-delete="deleteMerchantGroup">
      <!--<btn :icon="'i-cog'" :text="'已上线, 挂接管理'"></btn>-->
    </paper-header>

    <card class="text-center">
      <tab :tabs="this.$route.params.group_id!='new' ? { base: '基本信息', merchants: '包含商户' } : { base: '基本信息' }"
           :cur_id="cur_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card-merchant-group-base v-show="cur_tab == 'base'"></card-merchant-group-base>
    </keep-alive>

    <keep-alive>
      <card-merchant-group-merchants v-if="cur_tab == 'merchants'"></card-merchant-group-merchants>
    </keep-alive>

  </paper>
</template>

<script>
  /* global axios:true */
  export default {
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      }
    },
    components: {
      'card-merchant-group-base': require('./_components/card_merchant_group_base'),
      'card-merchant-group-merchants': require('./_components/card_merchant_group_merchants')
    },
    methods: {
      deleteMerchantGroup: function () {
        axios.delete('/chef/api/operation/merchantGroup/Group', {
          params: {
            group_id: this.$route.params.group_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'operation_merchant_group' });
          }
        });
      },
      switchTab: function (tab_id) {
        this.$router.push({
          name: 'operation_merchant_group_detail',
          params: { group_id: this.$route.params.group_id, tab: tab_id }
        });
      }
    }
  };
</script>
