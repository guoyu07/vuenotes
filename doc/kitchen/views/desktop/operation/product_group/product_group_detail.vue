<template>
  <paper class="paper-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="true" @do-delete="deleteProductGroup">
      <!--<btn :icon="'i-cog'" :text="'已上线, 挂接管理'"></btn>-->
    </paper-header>

    <card class="text-center">
      <tab :tabs="this.$route.params.group_id!='new' ? { base: '基本信息', products: '包含商品' } : { base: '基本信息' }"
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
  /* global axios:true */
  export default {
    computed: {
      cur_tab: function () {
        return this.$route.params.tab;
      }
    },
    components: {
      'card-product-group-base': require('./_components/card_product_group_base'),
      'card-product-group-products': require('./_components/card_product_group_products')
    },
    methods: {
      deleteProductGroup: function () {
        axios.delete('/chef/api/operation/productGroup/Group', {
          params: {
            group_id: this.$route.params.group_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'operation_product_group' });
          }
        });
      },
      switchTab: function (tab_id) {
        this.$router.push({
          name: 'operation_product_group_detail',
          params: { group_id: this.$route.params.group_id, tab: tab_id }
        });
      }
    }
  };
</script>
