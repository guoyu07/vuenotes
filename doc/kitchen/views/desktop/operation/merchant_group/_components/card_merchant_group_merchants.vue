<template>
  <card class="card-merchant-group-merchants">

    <card-header slot="card-header" :title="'包含商户列表'">
      <btn :icon="'i-plus'" :text="'商户'" :mood="'emphasis'" @click.native="is_merchant_hunter_show = true"></btn>
    </card-header>

    <table-grid-2 :data_source="merchants"
                  :use_sort="true"
                  @do-sort="sortMerchants">
      <table-grid-row v-for="merchant in merchants">
        <table-grid-col :col_title="'ID.'" :span="'50px'">{{ merchant.merchant_id }}</table-grid-col>
        <table-grid-col :col_title="'商户'">{{ merchant.name }}</table-grid-col>
        <table-grid-col :col_title="'快捷买单数'" :span="'90px'">{{ merchant.express_num }}</table-grid-col>
        <table-grid-col :col_title="'商品数'" :span="'90px'">{{ merchant.product_num }}</table-grid-col>
        <table-grid-col :col_title="'操作'" :span="'130px'" :align="'right'">
          <btn :text="'详情'" @click.native="goMerchantGroupDetail(merchant)"></btn>
          <btn :icon="'i-bin'" :text="'解挂'" :mood="'danger'" @click.native="deleteMerchant(merchant)"></btn>
        </table-grid-col>
      </table-grid-row>
    </table-grid-2>

    <!-- 商户多选弹窗 -->
    <!-- ----------------------------------------------------------------------------------------------------- -->
    <modal v-if="is_merchant_hunter_show" @close-modal="is_merchant_hunter_show = false">
      <card-header slot="modal-header" :title="'选择多个商户'"></card-header>
      <multiple-hunter :type="'merchant'" :cur_ids="merchant_ids"
                       :in_cities="$store.state.paper_stack[$store.state.paper_stack.length - 1].data.city_codes"
                       @cancel-hunt="is_merchant_hunter_show = false"
                       @do-hunt="saveMerchantsRef"></multiple-hunter>
    </modal>

  </card>
</template>

<script>
  /* global axios:true */
  export default {
    data () {
      return {
        merchants: [],
        merchant_ids: [],
        is_merchant_hunter_show: false
      };
    },
    beforeMount () {
      this.queryMerchants();
    },
    methods: {
      queryMerchants: function () {
        axios.get('/chef/api/operation/merchantGroup/groupMerchant', {
          params: {
            group_id: this.$route.params.group_id
          }
        }).then(res => {
          this.merchant_ids = this.setMerchantIds(res.data.data);
          this.merchants = res.data.data;
        });
      },
      saveMerchantsRef: function (merchant_ids, merchants) {
        axios.patch('/chef/api/operation/merchantGroup/groupMerchant', {
          group_id: this.$route.params.group_id,
          merchant_ids: merchant_ids
        }).then(res => {
          this.merchants = merchants;
          this.merchant_ids = merchant_ids;
          this.is_merchant_hunter_show = false;
        });
      },
      deleteMerchant: function (merchant) {
        axios.delete('/chef/api/operation/merchantGroup/groupMerchant', {
          params: {
            group_id: this.$route.params.group_id,
            merchant_id: merchant.merchant_id
          }
        }).then(res => {
          this.queryMerchants();
        });
      },
      sortMerchants: function (merchant, new_index) {
        axios.put('/chef/api/operation/merchantGroup/groupMerchant', {
          group_id: this.$route.params.group_id,
          merchant_id: merchant.merchant_id,
          new_index: new_index
        }).then(res => {
          this.queryMerchants();
        });
      },
      setMerchantIds: function (merchants) {
        var merchant_ids = [];
        merchants.map(merchant => {
          merchant_ids.push(merchant.merchant_id);
        });
        return merchant_ids;
      }
    }
  };
</script>
