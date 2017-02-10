<template>
  <paper class="paper-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="false">
    </paper-header>

    <card class="text-center">
      <tab :tabs="group_id=='new'?{ base: '基本信息' }:{ base: '基本信息', products: '包含商品' }"
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

<script>
  export default {
    components: {
      'card-product-group-base': require('../product_group/_components/card_product_group_base'),
      'card-product-group-products': require('../product_group/_components/card_product_group_products')
    },
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      },
      group_id: function () {
        return this.$route.params.group_id;
      }
    },
    methods: {
      switchTab: function (tab_id) {
        this.$router.push({
          name: 'operation_product_group_detail_in_group',
          params: {
            group_id: this.$route.params.group_id,
            tab: tab_id
          }
        });
      }
    }
  };
</script>
