<template>
  <paper class="paper-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header"></paper-header>

    <card class="text-center">
      <tab :tabs="{ base: '基本信息', products: '包含商品' }"
           :cur_id="cur_tab"
           @switch-tab="switchTab"></tab>
    </card>

    <keep-alive>
      <card-product-group-base v-show="cur_tab == 'base'"></card-product-group-base>
    </keep-alive>
    <keep-alive>
      <card-product-group-products v-if="cur_tab == 'products'"></card-product-group-products>
    </keep-alive>

  </paper>
</template>

<style scoped>
  .group_detail_box { position: relative }
  .group_detail { position: absolute; top: 0; left: 0; z-index: 1; }
  .covered { position: absolute; z-index: 2; top: 0; left: 0; width: 100%; height: 100%; background-color: Black; opacity: 0.5; }
</style>

<script>
  export default {
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      }
    },
    components: {
      'card-product-group-base': require('../product_group/_components/card_product_group_base'),
      'card-product-group-products': require('../product_group/_components/card_product_group_products')
    },
    methods: {
      switchTab: function (tab_id) {
        this.$router.push({
          name: 'operation_web_home_product_group_detail',
          params: { group_id: this.$route.params.group_id, tab: tab_id }
        });
      }
    }
  };
</script>
