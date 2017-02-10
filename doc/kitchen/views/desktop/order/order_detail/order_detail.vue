<template>
  <paper class="paper-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header">
      <!--<btn :icon="'i-cog'" :text="'已上线, 挂接管理'"></btn>-->
    </paper-header>

    <card class="text-center">
      <tab :tabs="this.$route.params.group_id!='new' ? { order_baseinfo: '基本信息', order_history: '包含商品' } : { base: '基本信息' }"
           :cur_id="cur_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card-product-group-base v-show="cur_tab == 'order_baseinfo'"></card-product-group-base>
    </keep-alive>

    <keep-alive>
      <card-product-group-products v-if="cur_tab == 'order_history'"></card-product-group-products>
    </keep-alive>

  </paper>
</template>

<script>
  export default {
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      }
    },
    components: {
      'order_baseinfo': require('../_components/order_baseinfo'),
      'order_history': require('../_components/order_history')
    },
    methods: {
      switchTab: function (tab_id) {
        this.$router.push({
          name: 'operation_product_group_detail',
          params: { group_id: this.$route.params.group_id, tab: tab_id }
        });
      }
    }
  };
</script>
