<template>
  <card class="card-option-policy">
    <card-header slot="card-header" :title="'价格政策的品类和优惠控制'">
      <btn :icon="'i-plus'" :text="'新增政策'" @click.native="addPolicy"></btn>
    </card-header>

    <table-grid
      :data_source="policy_list"
      :fields="[{ name: '品类名称', field: 'name', col_span: '5/24' },
                { name: '售卖政策', field: 'discount', col_span: '5/24' },
                { name: '分红政策', field: 'commision', col_span: '5/24' },
                { name: '状态', field: 'status', filter: { 1: '已上线', 0: '编辑中' }, col_span: '5/24' }]"
      :actions="[{ icon: 'i-pencil', text: '编辑', event: 'channel—detail' }]"
      :use_delete="true"
      :actions_col_span="'4/24'"
      @channel—detail="policyDetail"
      @do-delete="deletePolicy">
    </table-grid>

  </card>
</template>
<style scoped>
</style>
<script>
  /* global axios:true */
  export default {
    data () {
      return {
        policy_list: []
      };
    },
    mounted () {
      this.getPolicyList();
    },
    methods: {
      getPolicyList: function () {
        axios.get('/chef/api/saleRule/channel/policyList?channel_id=' + this.$route.params.channel_id).then(res => {
          if (res.data.code === 200) {
            this.policy_list = res.data.data;
          }
        });
      },
      deletePolicy: function (policy, index) {
        axios.delete('/chef/api/saleRule/channel/policy?id=' + policy.id).then(res => {
          if (res.data.code === 200) {
            this.policy_list.splice(index, 1);
          }
        });
      },
      addPolicy: function () {
        this.$router.push({
          name: 'sale_rule_channel_policy',
          params: {
            channel_id: this.$route.params.channel_id,
            id: 'new'
          }
        });
      },
      policyDetail: function (policy) {
        this.$router.push({
          name: 'sale_rule_channel_policy',
          params: {
            channel_id: this.$route.params.channel_id,
            id: policy.id
          }
        });
      }
    }
  };
</script>
