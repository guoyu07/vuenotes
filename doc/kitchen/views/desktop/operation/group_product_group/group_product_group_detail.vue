<template>
  <paper class="paper-group-product-group-detail" :is_root_paper="false">

    <paper-header slot="paper-header" :use_delete="true" @do-delete="deleteProductGroup">
      <!--<btn :icon="'i-cog'" :text="'已上线, 挂接管理'"></btn>-->
    </paper-header>

    <card-group-product-group-base ></card-group-product-group-base>

    <card-product-group-list v-if="group_id != 'new'"></card-product-group-list>

  </paper>
</template>

<script>
  /* global axios:true */
  export default {
    computed: {
      group_id: function () {
        return this.$route.params.group_id;
      }
    },
    components: {
      'card-group-product-group-base': require('./_components/card_group_product_group_base'),
      'card-product-group-list': require('./_components/card_product_group_list')
    },
    methods: {
      deleteProductGroup: function () {
        axios.delete('/chef/api/operation/productGroup/Group', {
          params: {
            group_id: this.$route.params.group_id
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$router.push({ name: 'operation_group_product_group' });
          }
        });
      }
    }
  };
</script>
